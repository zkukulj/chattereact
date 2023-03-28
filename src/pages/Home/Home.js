import React from 'react'
import {AppWrapper,HeaderWrapper, HeaderInner, HomeWrapper, FooterWrapper,MessageInput, Button, MainWrapper} from "../../utils/style/defaultStyles"
import Iframe from 'react-iframe'

const Home = () => {
  return (
    <AppWrapper>
        <HomeWrapper>
            <HeaderWrapper>
                <HeaderInner>Chat app</HeaderInner>
            </HeaderWrapper>
            <MainWrapper>Home content</MainWrapper>
            <FooterWrapper>
                <MessageInput placeholder="Type message here.."></MessageInput>
                <Button>Send</Button>
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