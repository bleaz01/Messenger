import React from 'react';
import {StyleSheet, View, Text, TextInput, Image} from 'react-native';

export default Login = () =>{

    return(
        <View style={styles.background}>
            <Image source={require('../assets/logoMessenger.png')}/>
            <TextInput style={ styles.input}
                placeholder='phone number'
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