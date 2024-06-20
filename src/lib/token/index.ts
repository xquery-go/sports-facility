import UserInterface from "../../model/user/userInterface";
import jwt, { JwtPayload } from "jsonwebtoken";

type paylode = {
  role: string;
};
const generateToken = (paylode: paylode) => {
  const token = jwt.sign({ paylode }, process.env.JWT_HASH as string);
  return token;
};

const validateToken = async (token: string) => {
  try {
    const decodedData = jwt.verify(token, process.env.JWT_HASH as string);
    return decodedData as JwtPayload;
  } catch (err) {
    console.log(err);
  }
};

export { generateToken, validateToken };
