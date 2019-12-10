import React,{Component} from 'react';
import { ScrollView ,StyleSheet, View, Text, TextInput, Button} from 'react-native';
import io from 'socket.io-client'
import {Entypo, FontAwesome} from '@expo/vector-icons'


export default class Home extends Component{
    constructor(props){
        super(props);{
            this.state ={
                user:'',
                chatMessenger:'',
                myMessages:[],
                chatMessengers:[],
                
            };
            console.log(this.state.chatMessengers)
    
        }
      }
    
      componentDidMount(){
        this.socket = io('http://192.168.1.53:3000', {jsonp:false})
        this.socket.on("message",msg =>{
            this.setState({chatMessengers: [...this.state.chatMessengers, msg]})
        })
       
        this.socket.on('user', user =>{
            this.setState({user: user})
        })
      }
      submitMessage(){

        if(this.state.chatMessenger === ''){
            console.log('salue')
        }
        else{
        this.socket.emit('message', this.state.chatMessenger)
        this.setState({myMessage: [...this.state.myMessages,this.state.chatMessenger]})
        this.setState({chatMessenger:""})
        let hours = new Date().getHours()
        let min = new Date().getMinutes()
        let date = hours + ':' + min 
        this.setState({ sendTime: hours + ':' + min })  
        }
      }

      myMsg(){
          <View>
            <Text>{this.state.chatMessenger}</Text>
          </View>
      }
    
      render(){
            const myMessages= this.state.myMessages.map(myMessage => 
                <View style={styles.boxMsg1}>
                    <Text style={styles.boxMsgText}>{this.state.user + ' ' + this.state.sendTime}</Text>
                    <Text style={styles.boxMsgText} key={myMessage}>{myMessages}</Text>
                </View>)

            const idemMessage = this.state.chatMessengers.map(chatMessenger => 
                <View style={styles.boxMsg}>
                    <Text style={styles.boxMsgText}>{this.state.user + ' ' + this.state.sendTime}</Text>
                    <Text style={styles.boxMsgText} key={chatMessenger}>{chatMessenger}</Text>
                </View>)
            
    return(
        <View style={styles.background}>
            <ScrollView>
                {idemMessage}
                {myMessages}
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
            <View style={styles.icons}>
                <Entypo name="camera" size={45} color="white" />
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
        right:50,
        borderRadius: 20,
        borderWidth: 0.5,
        borderColor: 'white',
        margin: 10,
        height: 45,
        width: '50%',
        color: 'white'
    },

    button: {
        flex: 1,
        position:'absolute',
        alignSelf:'flex-end',
        borderRadius: 50,
        borderColor:'white',
        borderWidth:1,
        margin:10,
        height:45,
        bottom:0,
    },
    icons: {
        flex:1,
        position:'absolute',
        bottom: 0,
        left: 0,
        margin:10,

    },

    boxMsg: {
        flex: 1,
        marginTop: 5,
        borderStyle: 'solid',
        borderRadius: 20,
        backgroundColor: 'white',
        width: '60%',   
    },
    boxMsg1: {
        flex: 1,
        marginTop: 5,
        borderStyle: 'solid',
        borderRadius: 20,
        backgroundColor: 'blue',
        width: '60%',   
    },
    boxMsgText: {
        margin:5,

    }
})