import React from 'react'
import { ChatManager, TokenProvider } from '@pusher/chatkit-client'

export default Chat = () =>{

    const chatManager = new ChatManager({
        instanceLocator: 'v1:us1:61048643-373c-47d7-a00c-299bbf386bec',
        userId: 'jeas',
        tokenProvider: new TokenProvider({ url: 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/61048643-373c-47d7-a00c-299bbf386bec/token' })
      })
}