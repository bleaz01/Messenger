import React,{Component} from 'react';
import { ScrollView ,StyleSheet, View, Text, TextInput, Button} from 'react-native';
import io from 'socket.io-client'
import {Entypo, FontAwesome} from '@expo/vector-icons'


export default class Home extends Component{
    constructor(props){
        super(props)
        this.state ={
            users:[],
            chatMessenger:'', 
            chatMessengers:[],
            
        };
            console.log(this.state.chatMessengers)
        this.socket = io('http://10.20.0.165:3000', {jsonp:false})

        this.socket.on("message", msg =>{
            this.setState({chatMessengers: [...this.state.chatMessengers,{user:msg.user,message:msg.message}]})
            console.log(this.state.chatMessengers)
        })
        this.socket.on('newUser', user =>{
            this.setState({users:user})
        })
        
    
    }
    
    componentDidMount(){ 
        let time = new Date()
        let hours = time.getHours()
        let min = time.getMinutes()
        let sec = time.getSeconds()
        let date = `${hours}:${min}:${sec}` 

       
      }
      submitMessage(){

        if(this.state.chatMessenger === ''){
            console.log(user)
        }
        else{
        this.setState({chatMessenger:""})
        let data ={user: this.state.users,message: this.state.chatMessenger}
        this.socket.emit('message', JSON.stringify(data))
        
        }
      }
    
      render(){
            // const myMessages= this.state.myMessages.map(myMessage => 
            //     <View style={styles.boxMsg1}>
            //         <Text style={styles.boxMsgText}>{this.state.user + ' ' + this.state.sendTime}</Text>
            //         <Text style={styles.boxMsgText} key={myMessage}>{myMessages}</Text>
            //     </View>)

            const idemMessage = this.state.chatMessengers.map(chatMessenger => 
                <View style={styles.boxMsg}>
                    <Text style={styles.boxMsgText}>{chatMessenger.user}</Text>
                    <Text style={styles.boxMsgText} key={chatMessenger}>{chatMessenger.message}</Text>
                </View>)
            
    return(
        <View style={styles.background}>
            <View style={styles.screen}>
                <ScrollView>
                {idemMessage}
              {/* {idemMessage} */}
                </ScrollView>
            </View>
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

    screen: {

        maxHeight:'90%'
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