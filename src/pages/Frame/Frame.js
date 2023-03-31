import React, { useState,useEffect } from 'react'
import { HeaderInner, HeaderWrapper,MessageInput,Button,FooterWrapper,MainWrapper } from '../../utils/style/defaultStyles'
import {randomName,randomColor,clientID} from "../../utils/helpers"
import Messages from '../../components/Messages/Messages'
import Loader from '../../components/Loader/Loader'

const Frame = () => {
  const [member, setMember] = useState([]);
  const [messages, setMessages] = useState(null);
  const [drone, setDrone] = useState(null);
  const [room, setRoom] = useState(false);

  useEffect(() => {
    if (member.username !== "") {
      const drone = new window.Scaledrone(clientID, {
        data: member,
      });
      setDrone(drone);
    }
  }, [member]);
  
  useEffect(() => {
    const droneEvents = () => {
      drone.on("open", (error) => {
        if (error) {
          return console.error(error);
        }
        member.username = randomName();
        member.color = randomColor() ;
        setMember(member);
        roomEvents();
      });

      drone.on("error", (error) => console.error(error));
      drone.on("disconnect", () => {
        console.log(
          "Disconnected, Scaledrone reconnect"
        );
      });
      drone.on("reconnect", () => {
        console.log("Reconnected");
      });
    }; 
    const roomEvents = () => {
      const room = drone.subscribe(`observable-room`);
      room.on("open", (error) => {
        if (error) {
          console.error(error);
        } else {
          console.log("InDa room Frejm");
          setRoom(true);
        }
      });
      room.on("message", (message) => {
        receiveMsg(message);
      });
    };

    const receiveMsg = (message) => {
      let otherMessages="";
      //document.querySelector(".DefaultMessage").style.display="none";
      if(document.getElementsByClassName('Message')!==null){
        otherMessages=document.querySelector(".Message").outerHTML;
      }
        setMessages(message);
        if(otherMessages!==""){
        document.querySelector(".Messages").insertAdjacentHTML("beforeend",otherMessages);}
    };

    if (drone && !member.username) {
      droneEvents();
    }

  }, [drone, member,room,messages]);

  const handleSend = (e) => {
    e.preventDefault();
    let messText=document.querySelector("input").value;
    let msg ={message: messText, name: member.username,color:member.color}
    drone.publish({
      room: 'observable-room',
      message: msg
    });
    document.querySelector("input").value="";
  }

  return !room ? <Loader /> : (
    <>
    <HeaderWrapper isSecondary>
        <HeaderInner>
            Chat app for: {member.username}
        </HeaderInner>
    </HeaderWrapper>
    <MainWrapper isSecondary  className='Messages'>
    <Messages
       messages={messages}
       currentMember={member}
    />
     </MainWrapper>
    <FooterWrapper isSecondary>
      <MessageInput type="text" placeholder="Type message here.."></MessageInput>
      <Button onClick={handleSend}>Send</Button>
    </FooterWrapper>
    </>
  )
}

export default Frame