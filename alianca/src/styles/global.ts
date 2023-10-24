
import { globalCss } from ".";


export const globalStyle = globalCss({
    "*": {
      margin: 0,
      padding: 0,
      border: 0,
      fontSize: "100%",
   
      verticalAlign: "baseline",
    },
    "article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section":
      {
        display: "block",
      },
    body: {
      lineHeight: 1,
      backgroundImage:'$main',
      fontFamily:"'Montserrat', sans-serif",
      color:'white',
      margin:'0 auto',
      maxWidth:'1200px', 

   
    },
    input:{
        color:'white'
    },
    "ol, ul": {
      listStyle: "none",
    },
    "blockquote, q": {
      quotes: "none",
    },
    "blockquote:before, blockquote:after, q:before, q:after": {
      content: "''",
    },
    a:{
      textDecoration:'none',
    },
    table: {
      borderCollapse: "collapse",
      borderSpacing: 0,
    },
    button:{
      cursor:'pointer'
    }
  });