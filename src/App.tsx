import React from 'react';
import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import ParkingForm from './screen/ParkingForm.tsx';
import ParkingSpace from './screen/ParkingSpace.tsx';
import { Provider } from 'react-redux';
import Store from './Redux/Store/Store.tsx';

const Stack = createStackNavigator();
function App(): React.JSX.Element {
  return (
    <Provider store={Store}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={ParkingForm}
          options={{headerShown: false}}
          />
        <Stack.Screen
          name="ParkingSpace"
          component={ParkingSpace}
          options={{headerShown: false}}
          />
      </Stack.Navigator>
    </NavigationContainer>
          </Provider>
  );
}

export default App;
