import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import CostsManagerDB from "../db/CostsManagerDB.js";

const createToken = (user, SECRET_KEY, expiresIn) => {
  const { id, username, email } = user;
  const payload = {
    id,
    username,
    email,
  };

  return jwt.sign(payload, SECRET_KEY, { expiresIn });
};

const register = async (input) => {
  input.id = uuidv4();
  const { id, email, username, password } = input;

  let foundEmail = await CostsManagerDB.users.findFirst({
    where: {
      email,
    },
  });

  if (foundEmail)
    throw new Error("The email is already been used by another account");

  let foundUsername = await CostsManagerDB.users.findFirst({
    where: {
      username,
    },
  });

  if (foundUsername)
    throw new Error("The username is already been used by another accoount");

  let salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(password, salt);

  await CostsManagerDB.users.create({
    data: { id, email, username, password },
  });

  return input;
};

const login = async (input) => {
  const { email, password } = input;
  const user = await CostsManagerDB.users.findFirst({
    where: {
      email,
    },
  });

  if (!user) throw new Error("Wrong credentials");

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) throw new Error("Wrong credentials");

  return { token: createToken(user, process.env.SECRET_KEY, "24h") };
};

export { register, login };
