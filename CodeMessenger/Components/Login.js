import React,{useState} from 'react';
import {StyleSheet, View, Text, TextInput, Image,Button} from 'react-native';
import { Actions } from 'react-native-router-flux';


export default Login = () =>{

    const [number, setNumber] = useState('')

    

    return(
        <View style={styles.background}>
            <Image source={require('../assets/logoMessenger.png')}/>
                <TextInput style={ styles.input }
                    placeholder='phone number'
                    onChangeText={text => {setNumber(text)}} 
                    value={number}     
                />
            <Button 
                title='send'
                onPress={e => Actions.Home()}
            />
        </View>
    )
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