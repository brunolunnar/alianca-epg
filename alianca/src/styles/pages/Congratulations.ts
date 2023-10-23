import { styled } from "..";

export const CongratulationsContainer = styled('main',{
    display: "flex",
   
    flexDirection: "column",
    maxWidth: "1200px",
    gap: '2rem',
    width: '70%',
    fontSize: '1.3rem',
    justifyContent: 'center',
    margin: '0 auto',
    lineHeight: '3rem',
    ".logo": {
        width: "200px",
        height: "auto",
        marginTop:'2rem'
      },
      "@media(min-width:1024px)": {
        ".image-box":{
            width:'100%',
            display: 'flex',
            justifyContent: 'center',
            marginTop:"2rem"
        },
        ".logo": {
          width: "350px",
        },
    h1:{
        fontSize:'2rem',
        marginTop:'2rem'
    }}
      
})