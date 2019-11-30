import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Router,Stack, Scene} from 'react-native-router-flux'
import Home from './Home';
import Accueil from './Accueil';
import Login from './Login';

export default function App() {
  return (
    <Router>
        <Stack key='root'>
          <Scene key='Accueil' component={Accueil} title='Accueil'/>
          <Scene key='Login' component={Login} title='Login'/>
          <Scene key='Home' component={Home} title='Home'/>
          <Scene/>
        </Stack>
    </Router>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
