import { styled } from "..";

export const RegisterContainer = styled("main", {
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "center",
  color: "$white",
  ".logo": {
    width: "200px",
    height: "auto",
  },
  h1: {
    marginBottom: "1rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    width: "100%",
    color: "$white",
  },
  input: {
    background: "$main",
    border: "solid 3px $branch",
    padding: "18px",
    borderRadius: "30px",
    color: "$white",
  },
  "input::placeholder": {
    color: "$white",
  },
  select: {
    background: "$main",
    border: "solid 3px $branch",
    padding: "17px",
    borderRadius: "30px",
    width: "30%",
    color: "$white",
  },
  "select::placeholder": {
    color: "$white",
  },
  ".op": {
    color: "$white",
    background: "$main",
  },
  ".select-box": {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    gap: "1rem",
  },
  ".form-container": {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  "@media(min-width:768px)": {
    ".form-container": {
      width: "80%",
    },
  },
  "@media(min-width:1024px)": {
    marginTop: "3rem",
    ".select-box": {
      flexDirection: "unset",
    },
    ".form-container": {
      gap: "3rem",
    },
    h1: {
      marginTop: "3rem",
    },
    ".logo": {
      width: "350px",
    },
  },
});
