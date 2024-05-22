import React, { Component } from 'react'
import { Button, ImageBackground, StyleSheet, Text, TextInput, View } from 'react-native'
import { setSpace } from '../Redux/Action/SpaceAction';
import withRouter from './WithRouter';

interface stateType {
  space: number;
}

interface propsType {
  navigation:{navigate:(path:String)=>void}
  dispatch:any;
}

class ParkingForm extends Component<propsType, stateType> {
    constructor(props: any) {
      super(props);
      this.state = {
        space: 0,
      };
    }
    handleChange = (text:string) => {
      if (+text >= 0) {
        this.setState({ space: +text });
      }
    };
    handleSubmit = () => {
      this.props.dispatch(setSpace(this.state.space))
      this.props.navigation.navigate("ParkingSpace");
    };
  render() {
    return (
      <ImageBackground 
      source={{uri: 'https://img.freepik.com/free-photo/graphic-2d-colorful-wallpaper-with-grainy-gradients_23-2151001621.jpg'}} 
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.label}>Enter Number of Spaces</Text>
        <TextInput
          style={styles.input}
          placeholder="Space"
          value={this.state.space === 0 ? '' : '' + this.state.space}
          onChangeText={this.handleChange}
          keyboardType="numeric"
        />
        <Button title="Add Space" onPress={this.handleSubmit} color="#6200EE" />
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
overlay: {
  flex: 1,
  padding: 20,
  justifyContent: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.2)'
},
label: {
  fontSize: 18,
  marginBottom: 10,
  color: 'black',
  textAlign: 'center',
},
input: {
  borderWidth: 1,
  borderColor: '#ddd',
  backgroundColor: '#fff',
  padding: 15,
  borderRadius: 5,
  marginBottom: 20,
  fontSize: 16,
},
});
export default withRouter(ParkingForm);