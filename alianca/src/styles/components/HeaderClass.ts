import { styled } from "..";

export const HeaderContainer = styled('header',{
    ".logo": {
        width: "200px",
        height: "auto",
      },
      display: "flex",
      flexDirection: "column",
      maxWidth: "1200px",
      gap: "2rem",
      padding: "30px",
      fontSize: "1.3rem",
      '.number':{
        background:'$branch',
        color:'black',
        width:'20px',
        height:'20px',
        borderRadius:'50%',
        padding:'10px',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        fontWeight:'900',
      },
      '.img-locked':{
        background:'white',
        color:'black',
        width:'15px',
        height:'15px',
        borderRadius:'50%',
        padding:'10px',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        fontWeight:'900',
      
      },
      '.img-locked svg':{
        color:'$branch'
      },
      
})