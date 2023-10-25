import jwt from "jsonwebtoken";

export const verifyToken = () => {
  const token = localStorage.getItem("@TOKEN"); 

  if (!token) {
    return null; 
  }

  try {
    const decoded = jwt.verify(token, "@TOKEN"); 
    return decoded;
  } catch (err) {
    return null;
  }
};
