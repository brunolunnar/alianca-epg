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