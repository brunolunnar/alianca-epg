import { styled } from "@stitches/react";

export const LeadIdContainer = styled('main',{
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    maxWidth: "1200px",
    gap: "2rem",
    padding: "30px",
    marginTop: "3rem",
    fontSize: "1.3rem",
    section:{
        display:'flex',
        flexDirection:'column',
        gap:'2rem'
    },
    ".logo": {
        width: "200px",
        height: "auto",
      },
      '.questions-box':{
        display:'flex',
        flexDirection:'column',
        gap:'1rem',
      },
      '.title-question':{
          marginTop:'2rem',
          fontSize:'2rem',
      },
      span:{
        fontSize:'1.5rem',
        fontWeight:'600'
      },
      p:{
        lineHeight:'2rem'
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

}
})