import { styled } from "@stitches/react";


export const LeadsContainer = styled('main',{
    display:'flex',
    flexDirection:'column',
  

    gap:'2rem',
    ul:{
        display:'flex',
        flexDirection:'column',
        gap:'1rem'
    },
    '.title':{
        background:'$branch',
        display:'flex',
        justifyContent:'space-between',
        padding:'10px',
        borderRadius:"15px",

    },
    li:{
     
        display:'flex',
        justifyContent:'space-between',
        padding:'10px',
        alignItems:'center',
        borderBottom:"2px solid gray"

    },
    '.fature-box':{
        display:'flex',
        alignItems:'center',
        gap:'10px'

    },
    input:{
        background:'$main',
        border:'3px solid $branch',
        borderRadius: '32px',
        padding:'13px'
    },
    'input:placeholder':{
        color:'$white'
    },
    button:{
        background:'$branch',
        color:'$white',
        padding:3,
        fontWeight:'900',
        borderRadius:'8px',
        display:'felx',
        width:'1.9rem',
        transition:'0.3s'
    },
    'button:hover':{
        background:'$main',
        border:'1px solid white'
    }
    ,
    '.box':{
        display:'flex',
        alignItems:'center',
        flexDirection:'column'

    },
    '.logo':{
        marginTop:'2rem',
    },
    "@media(min-width:1024px)": {
        ".logo": {
            width: "350px",
            height:'174px',
            marginBottom:'2rem'
          },
          h2:{
            fontSize:'2.3rem'
          }

}})