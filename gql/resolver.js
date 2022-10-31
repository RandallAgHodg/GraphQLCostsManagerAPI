import { login, register } from "../controllers/user.js";

export default {
  Mutation: {
    // User
    register: (_, { input }) => register(input),
    login: (_, { input }) => login(input),
  },
};
