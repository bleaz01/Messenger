import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Router,Stack,Scene} from 'react-native-router-flux'
import Home from './Home';
import Accueil from './Accueil';
import Login from './Components/Login';
import Image from './Components/Image';
import ViewCamera from './Components/ViewCamera';


export default class App extends React.Component{

 
  render(){
    return (
      <Router>
          <Stack key='root'>
            <Scene key='Accueil' component={Accueil}/>
            <Scene key='Login' component={Login} title='Login'/>
            <Scene key='Home' component={Home} title='Home'/>
            {/* <Scene Key='ViewCamera' component={ViewCamera}/> */}
          </Stack>
      </Router>
    );
  }
}
