import { styled } from "..";

export const LoginContainer = styled("main", {
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  maxWidth: "1200px",
  gap: "2rem",
  padding: "30px",
  marginTop: "3rem",
  fontSize: "1.3rem",
  form: {
    marginTop: "3rem",
    color: "$white",
  },
  input: {
    background: "$main",
    border: "solid 3px $branch",
    width: "93%",
    padding: "18px",
    borderRadius: "30px",
    color: "$white",
  },
  "input::placeholder": {
    color: "$white",
  },
  ".logo": {
    width: "200px",
    height: "auto",
  },
  "@media(min-width:768px)": {
    form: {
      width: "80%",
    },
    "@media(min-width:1024px)": {
      input: {
        width: "95%",
      },
      ".logo": {
        width: "350px",
      },
    },
  },
});
