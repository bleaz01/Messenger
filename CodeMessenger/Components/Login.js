import React,{useState} from 'react';
import {StyleSheet, View, Text, TextInput, Image,Button} from 'react-native';
import io from 'socket.io-client';
import { Actions } from 'react-native-router-flux';

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

export default  Login = (props) =>{

    const [user,setUser] = useState('');
     
      const submitUser = (e) => {
        
        this.socket = io('http://192.168.1.53:3000')
        this.socket.emit('newUser', user)
        Actions.Home({username:user})
      }

    return(
        <View style={styles.background}>
            <Image source={require('../assets/logoMessenger.png')}/>
            <View style={ styles.input }>
                <TextInput 
                    placeholder='phone number'
                    value={user}     
                    onChangeText={value => setUser(value)}     
                />
            </View>
            <Button 
                title='send'
                onPress={() =>submitUser()}
            />
        </View>
    )
}