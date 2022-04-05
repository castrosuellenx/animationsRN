import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from '../screens/Home';
import Header from '../screens/Header';
import Drag from '../screens/Drag';

declare global {
  namespace ReactNavigation {
    interface RootParamList {
      Home: undefined;
      Header: undefined;
      Drag: undefined;
    }
  }
}

const Stack = createNativeStackNavigator();

const Routes = () => {
  return (
    <Stack.Navigator
      initialRouteName="Drag"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Header" component={Header} />
      <Stack.Screen name="Drag" component={Drag} />
    </Stack.Navigator>
  );
};

export default Routes;
