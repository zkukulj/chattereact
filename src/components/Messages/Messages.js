import React from 'react'
import {MessageDiv,MessageDivContent} from "../../utils/style/defaultStyles"

const Messages = ({messages,currentMember}) => {

  // console.log(messages.data.name+ " / "+messages.data.message) console.log( JSON.stringify(messages))
  return (
    <>
    {messages ? 
      (messages.data.name===currentMember.username) ? 
        <MessageDiv className='Message'>
        <MessageDivContent usersMessage color={messages.data.color}><div>User: {messages.data.name}</div><div>Message: {messages.data.message}</div></MessageDivContent>
        </MessageDiv>
      : <MessageDiv className='Message'>
      <MessageDivContent color={messages.data.color}><div>User: {messages.data.name}</div><div>Message: {messages.data.message}</div></MessageDivContent>
      </MessageDiv>

      : <MessageDiv className='Message' color={currentMember.color}>{"NO message currently for: "+currentMember.username}</MessageDiv>
    }
    </>
  )
}


export default Messages