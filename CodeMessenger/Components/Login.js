import React,{useState} from 'react';
import {StyleSheet, View, Text, TextInput, Image,Button} from 'react-native';
import io from 'socket.io-client';
import { Actions } from 'react-native-router-flux';


export default class Login extends React.Component{

    constructor(props){
        super(props);{
            this.state ={
                user:'',
               
            };
    
        }
        console.log(this.state.user)
      }
    
    
      submitUser(){
        this.socket = io('http://10.20.0.165:3000')
        this.socket.emit('newUser', this.state.user)
    
          this.setState({user:''})
          Actions.Home()
      }


    render(){

    return(
        <View style={styles.background}>
            <Image source={require('../assets/logoMessenger.png')}/>
            <View style={ styles.input }>
                <TextInput 
                    placeholder='phone number'
                    value={this.state.user}     
                    onChangeText={user =>{
                        this.setState({user})
                    }}     
                />
            </View>
            <Button 
                title='send'
                onPress={() =>this.submitUser()}
            />
        </View>
    )
    }
}

const styles = StyleSheet.create({

    background: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: 'auto'
    },

    input: {
        borderRadius: 4,
        borderWidth: 0.5,
        marginTop: 10,
        height: 30,
        width: '80%',

    }


})