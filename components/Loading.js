import React from 'react'
import styled from 'styled-components'
import Logo from './Logo'
import { useStore } from '../utils/store/StoreProvider'
import Image from 'next/image'

const LoadWrapper = styled.div`
width: 100%;
height:100vh;
display: ${props => props.display === 'false' ? 'none' : 'grid'};
justify-content:center;
align-items:center;
position:fixed;
z-index:5000000;

transition:all .3 ease-in;

& img{
filter: contrast(120%);
mix-blend-mode:multiply;}

}`

const Loading = (props) => {
    const {loading} = useStore().store
  return (
    <LoadWrapper display={loading.toString()} className='specialBG'>
 
            <Image src="/loading animation.gif" width={300} height={300}/>

        
    </LoadWrapper>
  )
}

export default Loading