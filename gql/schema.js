import { gql } from "apollo-server";

export default gql`
  type User {
    id: ID
    username: String
    email: String
    password: String
  }

  type Group {
    id: ID
    name: String
    createdAt: String
  }

  type Cost {
    id: ID
    name: String
    description: String
    amount: Float
  }

  type Token {
    token: String
  }

  input UserInput {
    username: String
    email: String
    password: String
  }

  input LoginInput {
    email: String
    password: String
  }

  input RegisterInput {
    username: String
    email: String
    password: String
  }

  input CostInput {
    name: String
    description: String
    amount: String
  }

  input GroupInput {
    name: String
  }

  type Query {
    # User
    getUser(id: ID, username: String): User
    searchCost(username: String): [User]

    # Cost
    getCost(id: ID): Cost
    searchGroup(name: String): [Cost]

    # Group
    getGroups: [Group]
    getGroupById(id: ID): Group
  }

  type Mutation {
    # User
    register(input: RegisterInput): User
    login(input: LoginInput): Token
    updateUser(input: UserInput): User

    # Costs
    createCost(input: CostInput): Cost
    updateCost(input: CostInput): Cost
    deleteCost(id: ID): Boolean
    getCostById(id: ID): Cost
    # Groups
    createGroup(input: GroupInput): Group
    updateGroup(input: GroupInput): Group
    deleteGroup(id: ID): Boolean
    getGroupById(id: ID): Group
  }
`;
