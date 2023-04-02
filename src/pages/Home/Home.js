import React, { useEffect, useState } from 'react'
import {AppWrapper,HeaderWrapper, HeaderInner, HomeWrapper, FooterWrapper,MessageInput, Button, MainWrapper} from "../../utils/style/defaultStyles"
import Iframe from 'react-iframe'
import {randomName,randomColor,clientID} from "../../utils/helpers"
import Messages from '../../components/Messages/Messages'
import Loader from '../../components/Loader/Loader'


const Home = () => {
  const [member, setMember] = useState([]);
  const [messages, setMessages] = useState([]);
  const [drone, setDrone] = useState(null);
  const [room, setRoom] = useState(false);
  // const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    if (member.username !== "") {
      const drone = new window.Scaledrone(clientID, {
        data: member,
      });
      setDrone(drone);
    }
  }, [member]);
  
  useEffect(() => {
    // DEFAULT SCALEDRONE ACTIONS
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
      // SCALEDRONE HAS ROOMS WHICH HAVE SOME ACTIONS
      const roomEvents = () => {
        const room = drone.subscribe(`observable-room`);
        room.on("open", (error) => {
          if (error) {
            console.error(error);
          } else {
            console.log("InDa room");
            setRoom(true);
          }
        });
        room.on("message", (message) => {
          receiveMsg(message);
        });
      };
      // RECEIVING MESSAGES FROM SCALEDRONE
      const receiveMsg = (message) => {
        setMessages(messages =>[...messages,message]);
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
    <AppWrapper>
        <HomeWrapper>
            <HeaderWrapper>
                <HeaderInner>Chat app for: {member.username}</HeaderInner>
            </HeaderWrapper>
            <MainWrapper className='Messages'>
              {
              messages ?
              messages.map((message) => (
                <Messages
                  messages={message}
                  currentMember={member}
                />
              ))
              :""
            }
            </MainWrapper>
            <FooterWrapper>
                <MessageInput 
                type="text" 
                placeholder="Type message here..">
                </MessageInput>
                <Button onClick={handleSend}>Send</Button>
            </FooterWrapper>
        </HomeWrapper>
        <Iframe url="http://localhost:3000/frame"
        width="100%"
        height="100%"
        display="block"
        position="relative"/>
    </AppWrapper>
  )
}

export default Home