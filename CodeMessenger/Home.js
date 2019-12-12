import React,{Component} from 'react';
import { ScrollView ,StyleSheet, View, Text, TextInput, Button} from 'react-native';
import io from 'socket.io-client';
import {Entypo, FontAwesome} from '@expo/vector-icons';
import Markdown from 'react-native-markdown-package';
import{md5} from 'MD5';



export default class Home extends Component{
    constructor(props){
        super(props)
        this.state ={
            user:this.props.username,
            chatMessenger:'', 
            chatMessengers:[],
            myMessengers:[]
            
        };
         console.log(this.state.myMessengers)
        
        this.socket = io('http://192.168.1.53:3000', {jsonp:false})

        this.socket.on("message", msg =>{
            // msg.avatar = 'https://gravatar.com/avatar/' + md5(me.id) + '?s =50';
            this.setState({chatMessengers: [...this.state.chatMessengers,{user:msg.user,message:msg.message}]})
        })
        this.socket.on('newUser', user =>{
            this.setState({users:user})
        })
        
    
    }
   
      submitMessage(){

        if(this.state.chatMessenger === ''){
            console.log(user)
        }
        else{
        this.setState({chatMessenger:""})
        let data ={user: this.state.user,message: this.state.chatMessenger}
        this.setState({myMessengers: [...this.state.myMessengers,{user:data.user,message:data.message}]})
        this.socket.emit('message', JSON.stringify(data))
        
        
        }
      }
    
      render(){
            const meMessages = this.state.myMessengers.map((meMessage,i)=> {
                return(    
                <View style={styles.boxMsg1}>
                    <Text style={styles.boxMsgText}>{meMessage.user}</Text>
                    <Markdown style={styles.boxMsgText} key={i}>{meMessage.message}</Markdown>
                </View>)})
          
            const idemMessage = this.state.chatMessengers.map((chatMessenger,i) => { 
                return (
                <View style={styles.boxMsg}>
                    <Text style={styles.boxMsgText}>{chatMessenger.user}</Text> 
                    <Markdown style={styles.boxMsgText} key={i}>{chatMessenger.message}</Markdown>
                    
                </View>)})
            
    return(
        <View style={styles.background}>
            <ScrollView style={styles.screen}>
                {idemMessage}
                {meMessages}
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

    screen: {
        flex:1,
        flexDirection: "column-reverse",
        maxHeight:'90%',
        margin:10
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