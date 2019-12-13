import React,{useState, useEffect} from 'react'
import {TouchableOpacity, View} from 'react-native'
import {Camera} from 'expo-camera'

export default ViewCamera = () =>{

    //demander la permission pour activé les fonctionnalité de la camera de l 'appareil
    //type.back == a la camera arriére

    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back)

    useEffect(() => {
        
        (async () => {
            const {status} = await Camera.requestPermissionsAsync()
            setHasPermission(status === 'granted')
        })();
 
        
    }, [])

    if(hasPermission === null){
        return(<View/>)
    }
    if(hasPermission === false){
        return(<Text> Vous n 'avez pas access a la camera</Text>)
    }
  
    return(
      <View style={{ flex: 1 }}>
        <Camera style={{ flex: 1 }} type={type}>
          <View
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              style={{
                flex: 0.1,
                alignSelf: 'flex-end',
                alignItems: 'center',
              }}
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}>
              <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
            </TouchableOpacity>
          </View>
        </Camera>
      </View>
    );
  }
    
