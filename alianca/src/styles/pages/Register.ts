import { styled } from "..";

export const RegisterContainer = styled("main", {
    display:'flex',
    justifyContent:'center',
    flexDirection:'column',
    alignItems:'center',
    color:'$white',
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    width: "67%",
    color:'$white',
},
  input: {
    background: "$main",
    border: "solid 3px $branch",
    padding: "18px",
    borderRadius: "30px",
    color:'$white',
  },
  'input::placeholder': {
    color: '$white'
  },
  select: {
    background: "$main",
    border: "solid 3px $branch",
    padding: "17px",
    borderRadius: "30px",
    width:'30%',
    color:'$white',
  },
  'select::placeholder':{
    color:'$white'
  },
'.op':{
    color:'$white',
    background:"$main"
  },
  '.select-box':{
    display:'flex',
    justifyContent:"space-between"
  }

});
