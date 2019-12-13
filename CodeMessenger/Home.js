import React,{Component} from 'react';
import { ScrollView ,StyleSheet, View, Text, TextInput, Button, ImagePickerIOS,Image} from 'react-native';
import io from 'socket.io-client';
import {Entypo, Feather, FontAwesome, AntDesign} from '@expo/vector-icons';
import Markdown from 'react-native-markdown-package';
import ViewCamera from './Components/ViewCamera';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import{md5} from 'MD5';
import { Actions } from 'react-native-router-flux';




export default class Home extends Component{
    constructor(props){
        super(props)
        this.state ={
            user:this.props.username,
            image: null,
            chatMessenger:'', 
            chatMessengers:[],
            myMessengers:[]
            
        };
         console.log(this.state.myMessengers)
        
        this.socket = io('http://10.20.0.165:3000', {jsonp:false})

        this.socket.on("message", msg =>{
            // msg.avatar = 'https://gravatar.com/avatar/' + md5(me.id) + '?s =50';
            this.setState({chatMessengers: [...this.state.chatMessengers,{user:msg.user,message:msg.message}]})
            
        })
        this.socket.on('newUser', user =>{
            this.setState({users:user})
        })
        
    
    }
    componentDidMount() {
        this.getPermissionAsync();
        
        console.log('hi');
    }
    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    }
    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1
        });
    
        console.log(result);
    
        if (!result.cancelled) {
            this.setState({ image: result.uri });
        }
       
      };
   
      submitMessage(){

        if(this.state.chatMessenger === ''){
         this.setState({image:null})
        }
        else{
        this.setState({chatMessenger:""})
        let data ={user: this.state.user,message: this.state.chatMessenger}
        this.setState({myMessengers: [...this.state.myMessengers,{user:data.user,message:data.message}]})
        this.socket.emit('message', JSON.stringify(data))
        
    
        }
      }
     
    
      render(){
        let image = this.state.image;
            const meMessages = this.state.myMessengers.map((meMessage,i)=> {
                return(    
                <View style={styles.boxMsg1}>
                    <Text style={styles.boxMsgTextUser}>{meMessage.user}</Text>
                {image &&
                    <Image source={{ uri: image }} style={styles.image} />} 
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
                <AntDesign style={styles.button} name="checkcircle" size={45} color="white" 
                    onPress={() => this.submitMessage()}
                    title='send'
                />
            </View>
            <View style={styles.icons}>
                <Entypo style={{ marginRight:10 }} name="camera" size={50} color="white" 
                    onPress={() => <ViewCamera/>}
                />
                <Entypo name="image" size={50} color='white'
                    onPress={this._pickImage}
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
        right:0,
        borderRadius: 20,
        borderWidth: 0.5,
        borderColor: 'white',
        margin: 10,
        marginTop: 5,
        height: 45,
        width: '60%',
        color: 'white'
    },

    button: {
        flex: 1,
        position:'absolute',
        alignSelf:'flex-end',
        height:45,
        bottom:0,
    },

    screen: {
        flex:1,
        flexDirection: "column-reverse",
        maxHeight:'87%',
        margin:10
    },
    icons: {
        flex:1,
        flexDirection:"row",
        position:'absolute',
        bottom: 0,
        left: 0,
        marginBottom:4,
        marginLeft:8,
       

    },
    image:{
        justifyContent:'center',
        width: 200,
        height: 200,
        marginLeft:6,
        marginTop: 6,
        borderRadius:20
    },

    boxMsg: {
        flex: 1,
        marginTop: 5,
        borderStyle: 'solid',
        borderRadius: 5,
        backgroundColor: 'white',
        width: '60%',   
    },
    boxMsg1: {
        flex: 1,
        flexDirection:"column",
        marginTop: 5,
        borderStyle: 'solid',
        borderRadius: 5,
        backgroundColor: 'blue',
        width: '60%',  
        paddingLeft:6, 
        paddingTop:3
    },
    boxMsgTextUser: {
        margin:1,
        color:'red'
    },
    boxMsgText: {
        margin:1,
        
    }
    
})