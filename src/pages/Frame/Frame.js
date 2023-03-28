import React from 'react'
import { HeaderInner, HeaderWrapper,MessageInput,Button,FooterWrapper,MainWrapper } from '../../utils/style/defaultStyles'

const Frame = () => {
  return (
    <>
    <HeaderWrapper isSecondary>
        <HeaderInner>
            Another user
        </HeaderInner>
    </HeaderWrapper>
    <MainWrapper isSecondary>Frame content</MainWrapper>
    <FooterWrapper isSecondary>
        <MessageInput placeholder="Type message here.."></MessageInput>
        <Button>Send</Button>
    </FooterWrapper>
    </>
  )
}

export default Frame