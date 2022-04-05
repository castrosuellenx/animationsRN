import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from '../screens/Home';
import Header from '../screens/Header';
import ListHeaderAnimated from '../screens/ListHeaderAnimated';
import Drag from '../screens/Drag';

declare global {
  namespace ReactNavigation {
    interface RootParamList {
      Home: undefined;
      Header: undefined;
      ListHeaderAnimated: undefined;
      Drag: undefined;
    }
  }
}

const Stack = createNativeStackNavigator();

const Routes = () => {
  return (
    <Stack.Navigator
      initialRouteName="ListHeaderAnimated"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Header" component={Header} />
      <Stack.Screen name="ListHeaderAnimated" component={ListHeaderAnimated} />
      <Stack.Screen name="Drag" component={Drag} />
    </Stack.Navigator>
  );
};

export default Routes;
