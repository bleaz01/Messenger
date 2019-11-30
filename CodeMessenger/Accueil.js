import React from 'react'
import {View, Text, StyleSheet} from 'react-native';
import { Actions } from 'react-native-router-flux';


export default Accueil = () =>{

        onStart = setTimeout(() => {
            Actions.Login()
        }, 1500);

    return(
        
        <View style={styles.background}>
            <View>
                <Text style={styles.background2}>Accueil Logo Image</Text>
            </View>
            <View style={styles.image}>
                 <Text style={styles.text}>CodeMessenger</Text>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
   
    background: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#8160FF',
    },
    background2: {
        flex: 1,
        backgroundColor: 'black',
    },

    image: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    text: {
        fontSize:25,
    }

});