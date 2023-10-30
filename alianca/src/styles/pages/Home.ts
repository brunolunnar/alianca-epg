import { styled } from "..";

export const HomeContainer = styled("main", {
  ".logo": {
    width: "200px",
    height: "auto",
  },
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  maxWidth: "1200px",
  gap: "2rem",
  padding: "30px",

  fontSize: "1.3rem",

  img: {
    padding: "2rem",
  },
  ".login-btn": {
    width: "150px",
    borderRadius: "34px",
    padding: "10px",
    background: "$main",
    border: "3px solid $branch",
    color: "$white",
    transition: "0.3s",
  
  },
  ".login-btn:hover": {
    background: "$branch",
  },

  ".container": {
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
    lineHeight: 1.2,
  },
  h2: {
    fontWeight: "bolder",
    fontSize: "1.5rem",
  },

  ".presentation-box": {
    display: "flex",
    gap: "2rem",
    alignItems: "center",
    flexDirection: "column-reverse",
  },
  ".profile.box": {
    height: "300px",
    width: "114%",
  },
  ".profile-box img": {
    width: "100%",
    height: "100%",
  },
  ".presentation": {},
  article: {
    fontWeight: "400",
  },

  "@media(min-width:768px)": {
    ".presentation-box": {
      flexDirection: "unset",
    },
    ".presentation": {
      width: "50%",
    },
  },
  "@media(min-width:1024px)": {
    ".logo": {
      width: "350px",
    },
    ".presentation-box": {
      flexDirection: "unset",
      margin: "-4rem 0",
    },
    ".presentation": {
      width: "61%",
    },
    ".profile-box": {
      width: "25%",
      marginTop: "2rem",
    },
    ".login-box": {
      width: "81%",
      display: "flex",
      flexDirection:'row-reverse',
      position:'absolute',
    },
 
  
  },
});
