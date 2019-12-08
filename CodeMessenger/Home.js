import React,{useState} from 'react';
import { ScrollView ,StyleSheet, View, Text, TextInput, Button} from 'react-native';
import io from 'socket.io-client'

export default class Home extends React.Component{

    constructor(props){
        super(props);{
            this.state ={
                chatMessenger:'',
                chatMessengers:[]
            };
    
        }
      }
    
      componentDidMount(){
        this.socket = io('http://192.168.1.53:3000')
        this.socket.on("message",msg =>{
            this.setState({chatMessengers: [...this.state.chatMessengers, msg]})
        })
      }
      submitMessage(){
          this.socket.emit('message', this.state.chatMessenger)
          this.setState({chatMessenger:""})
      }

      

    // const sendMessages = {
    //    setMessage(sendMessage);
    // }
      render(){
          const idemMessage =this.state.chatMessengers.map(chatMessenger => 
          <Text style={styles.boxMsg} key={chatMessenger}>{chatMessenger}</Text>)
    return(
        <View style={styles.background}>
            <ScrollView>
                {idemMessage}
            </ScrollView>
            <View  style={styles.input}>
                <TextInput 
                    style={{color: 'white'}}
                    value={this.state.chatMessenger}
                    onChangeText={chatMessenger =>{
                        this.setState({chatMessenger})
                    }}
                   
                 />
            </View>
            <View style={styles.button}>
                <Button
                     onPress={() => this.submitMessage()}
                    title='send'
                />
            </View>
        </View>
    )
}
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

    boxMsg: {
        flex: 1,
        margin: 5,
        borderStyle: 'solid',
        borderRadius: 20,
        backgroundColor: 'white',
        width: '60%',




        
    }
})