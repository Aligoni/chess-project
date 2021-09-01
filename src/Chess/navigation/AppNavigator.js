import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import Play from '../components/Play'
import Home from '../components/Home'
import HowToPlay from '../components/HowToPlay'
import Settings from '../components/Settings'
import Loading from '../components/Loading'

const Stack = createStackNavigator()

export default function AppNavigator() {
    return (
      <NavigationContainer>
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Play" component={Play} />
          <Stack.Screen name='HowToPlay' component={HowToPlay} />
          <Stack.Screen name="Loading" component={Loading} />
          <Stack.Screen name="Settings" component={Settings} />
        </Stack.Navigator>
      </NavigationContainer>
    );
}