import { styled } from "..";

export const ButtonStyled = styled('button',{
    backgroundImage:'radial-gradient(at center center, #E8BA98 0%, #D67D3F 100%);',
    padding:'15px',
    borderRadius:'30px',
    fontWeight:'bolder',
    marginTop:'2rem',
    '@media(min-width:768px)':{
        width:'100%'
    },
    '@media(min-width:1024px)':{
        fontSize:'2rem',
        width:'100%',
        marginTop:'2rem',
        marginBottom:'2rem',
    }
})