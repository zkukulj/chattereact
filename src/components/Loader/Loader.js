import React from 'react'
import { colors } from '../../utils/style/theme'
import {} from './LoaderStyles'
import { LoaderWrapper } from './LoaderStyles'
import { ThreeDots } from "react-loader-spinner";

const Loader = () => {
  return (
    <LoaderWrapper>
        <ThreeDots 
            height="80" 
            width="80" 
            radius="9"
            color={colors.bgSecondary}
            ariaLabel="three-dots-loading"
            visible={true}
            />
    </LoaderWrapper>
  )
}

export default Loader