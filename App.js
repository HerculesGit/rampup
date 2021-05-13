
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './src/Pages/Home';
import CameraScreen from './src/Pages/Camera';

import React from 'react';
import { CAMERA_SCREEN, HOME_SCREEN } from './src/Routers';

const Stack = createStackNavigator();

function AppRouterStack() {
  return (
    // all routes
    <Stack.Navigator>
      <Stack.Screen name={HOME_SCREEN} component={HomeScreen} />
      <Stack.Screen name={CAMERA_SCREEN} component={CameraScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <AppRouterStack />
    </NavigationContainer>
  );
}