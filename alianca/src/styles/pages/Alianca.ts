import { styled } from "..";

export const AliancaContainer = styled("main", {
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
  h1: {
    fontWeight: "400",
  },
  h3: {
    fontWeight: "400",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    // width: "80%",
    alignItems: "center",
  },
  ".container": {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: "2rem",
  },
  ".video": {
    height: "200px",
    width: "100%",
    border: "3px solid $branch",
    borderRadius: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  ".video-box": {
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
  },
  textarea: {
    background: "$main",
    border: "3px solid $branch",
    borderRadius: "12px",
    minHeight: "102px",
    color:'white'
  },
  button: {
    background: "radial-gradient(at center center, #E8BA98 0%, #D67D3F 100%);",
    color: "black",
    width: "308px",
    borderRadius: "37px",
    padding: "9px",
    fontWeight: 900,
  },
  ".button-box": {
    width: "100%",
    display: "flex",
    flexDirection: "row-reverse",
  },
  "@media(min-width:768px)": {
    ".video": {
      height: "300px",
    },
  },
  "@media(min-width:1024px)": {
    ".video": {
      height: "600px",
    },
  },
});
