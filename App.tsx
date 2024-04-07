import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Task1, Task2, Task3 } from './src/pages';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>

        <Tab.Screen name="Task1" component={Task1} />
        <Tab.Screen name="Task2" component={Task2} />
        <Tab.Screen name="Task3" component={Task3} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
