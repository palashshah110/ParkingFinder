import React, { Component } from 'react'
import { ActivityIndicator, Button, FlatList, ImageBackground, Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import withRouter from './WithRouter';
import { deallocateParking, setParkingLot } from '../Redux/Action/SpaceAction';

interface PropsTypes {
  navigation:{goBack: () => void};
  dispatch: any;
  Space: number;
  ParkingLot: [
    {
      carid: number;
      RegistrationNo: string;
      CarParkTime: number;
    }
  ];
}
interface StateTypes {
  DialogOpen: boolean;
  RegistrationNo: string;
  deallocateOpen: boolean;
  deallocateid: number;
  Loading: boolean;
}  
class ParkingSpace extends Component <PropsTypes, StateTypes>{
  constructor(props: any) {
    super(props);
    this.state = {
      DialogOpen: false,
      RegistrationNo: "",
      deallocateOpen: false,
      deallocateid: -1,
      Loading:false
    };
  }
  handleChange = (text:string) => {
    if (/^[a-zA-Z0-9 ]*$/.test(text)) {
      this.setState({ ...this.state, RegistrationNo: text });
  }  
  };

  handleSubmit = () => {
    let carid: number;
    do {
      carid = Math.floor(1 + Math.random() * this.props.Space);
    } while (this.checkOccupiedId(carid));

    const CarStartTime = new Date().getTime();
    const data: any = {
      carid: carid,
      RegistrationNo: this.state.RegistrationNo,
      CarParkTime: CarStartTime,
    };

    this.props.dispatch(setParkingLot(data));
    this.setState({
      RegistrationNo: "",
      DialogOpen: false,
    });
  };
  checkOccupiedId = (id: number) => {
    const check = this.props.ParkingLot.some((item: any) => item.carid === id);
    return check;
  };
  DeallocateSpace = async () => {
    this.setState({Loading:true})
    const registrationID:any = this.props.ParkingLot.find(
      (item) => item.carid === this.state.deallocateid
    );
    const charge = this.calculateParkingFee(registrationID.CarParkTime);
    const res = await fetch("https://httpstat.us/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "car-registration": registrationID.RegistrationNo,
        charge: charge,
      }),
    });
    console.log(res);
    const updatedParking:any = this.props.ParkingLot.filter(
      (car: any) => car.carid !== this.state.deallocateid
    );

    this.props.dispatch(deallocateParking(updatedParking));
    this.setState({
      deallocateOpen: false,
      deallocateid: -1,
      Loading:false
    });
  };
  calculateParkingFee = (startTime: number): number => {
    const endTime = new Date().getTime();
    const miliSeconds: number = endTime - startTime;
    const Hours: number = miliSeconds / (1000 * 60 * 60);
    let parkingRate: number;
    if (Hours <= 2) {
      parkingRate = 10;
    } else {
      parkingRate = 10 + (Hours - 2) * 10;
    }
    return Math.floor(parkingRate);
  };

  calculateParkingTime = (startTime: number): number => {
    const endTime = new Date().getTime();
    const miliSeconds: number = endTime - startTime;
    const Min: number = miliSeconds / (1000 * 60);
    return Math.floor(Min);
  };
  render() {
    console.log(this.props.Space);
    console.log(this.props.ParkingLot);
    return (
      <ImageBackground 
      source={{uri: 'https://img.freepik.com/free-photo/graphic-2d-colorful-wallpaper-with-grainy-gradients_23-2151001621.jpg'}} 
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <View style={styles.btncontainer}>
        <Button
          title="Go Back" 
          onPress={() => this.props.navigation.goBack()} 
          />        
          <Button
          title="New Registration" 
          onPress={() => this.setState({ DialogOpen: true })} 
          disabled={(this.props.ParkingLot.length >= this.props.Space)} 
          color="#6200EE"
          />
          </View>
        <FlatList
          data={Array.from({ length: this.props.Space }, (v, index) => (this.props.Space))}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={this.checkOccupiedId(index + 1) ? styles.allocatespace : styles.space}>
              <Text style={styles.spaceText}>Space {index + 1}</Text>
              {this.checkOccupiedId(index+1) && <Button title='Occupied' onPress={() => this.setState({ deallocateOpen: true,deallocateid: index + 1, })}/>}
            </View>
          )}
        />
        <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.DialogOpen}
            testID='RegistrationModal'
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Pressable
                  style={styles.closeButton}
                  onPress={() => this.setState({ DialogOpen: false })}
                  testID='RegClosebtn'
                >
                  <Text style={{fontSize:15}}>X</Text>
                </Pressable>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Registration Number"
                  value={this.state.RegistrationNo}
                  onChangeText={this.handleChange}
                />
                <View style={styles.btn}>
                <Button title="Add Car" disabled={this.state.RegistrationNo === ''} onPress={this.handleSubmit} color="#6200EE"/>
                </View>
              </View>
            </View>
          </Modal>



          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.deallocateOpen}
            testID='OccuipedModel'
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Pressable
                  style={styles.closeButton}
                  onPress={() => this.setState({ deallocateOpen: false })}
                  testID='closeBtn'
                >
                  <Text>X</Text>
                </Pressable>

                <View>
                {this.props.ParkingLot.map((car) => {
                  return (
                    <View key={car.carid}>
                      {car.carid === this.state.deallocateid && (
                        <View>
                        <Text style={styles.modalText}>Registration No: {car.RegistrationNo}</Text>
                        <Text style={styles.modalText}>Your Parking Time: {this.calculateParkingTime(car.CarParkTime)} min</Text>                        
                        <Text style={styles.modalText}>Your Parking Fee: $
                        {this.calculateParkingFee(car.CarParkTime)}</Text>
                        </View>
                      )}
                    </View>
                  );
                })}
              </View>
                <View style={styles.btn}>
                  {this.state.Loading ? <ActivityIndicator size={'large'} />  :
                <Button title="Payment Taken" onPress={this.DeallocateSpace} color="#6200EE"/>
                  }
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    fontSize: 16,
    width: '100%',
  },
  space: {
    padding: 20,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  allocatespace: {
    padding: 20,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: 'pink',
    alignItems: 'center',
    flexDirection:'row',
    justifyContent:'space-between'
  },
  spaceText: {
    fontSize: 20,
    color: '#333',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%', 
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    // backgroundColor: 'black',
    borderRadius: 20,
    padding: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 10,
    width: '100%',
  },
  buttonClose: {
    backgroundColor: '#000',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  btn:{
    width:'90%'
  },
  btncontainer:{
    flexDirection:'row',
    width:'100%',
    justifyContent:'space-between',
    marginBottom:20
  },
  modalText: {
    marginBottom: 20,
    fontWeight:'bold',
    fontSize:18,
    textAlign: 'left',
  },
});
export default withRouter(ParkingSpace)