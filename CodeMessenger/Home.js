import React from 'react';
import { StyleSheet, View, Text, TextInput, Button} from 'react-native';




export default Home = () =>{
    return(
        <View style={styles.background}>
            <Text>
                Home Messenger
            </Text>
            <View  style={styles.input}>
                <TextInput 
                    
                    title='send Message'
                 />
            </View>
            <View style={styles.button}>
                <Button
                    title='send'
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    background: {
        flex: 1,
        backgroundColor: '#262925',
       
    },

    input: {
        flex: 1,
        position:'absolute',
        bottom: 0,
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: 'white',
        marginTop: 10,
        height: 50,
        width: '85%',
        color: 'white'

    },

    button: {
        flex: 1,
        position:'absolute',
        alignSelf:'flex-end',
        borderColor:'white',
        borderWidth:1,
        height:50,
        bottom:0,
    },
})