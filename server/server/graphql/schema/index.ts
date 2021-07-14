import { gql } from 'apollo-server-express';
import { ApolloServerExpressConfig } from 'apollo-server-express';
import resolvers from '../resolvers/index';

const typeDefs = gql`
  type Query {
    countryList(name: String!): [Country!]!
    country(name: String!): [Country!]!
    login(email: String!, password: String!): AuthData!
  }
  type Mutation {
    createUser(userInput: UserInput): AuthData!
  }
  type Country {
    name: String!
    population: Int!
    currencies: [Currency]!
  }
  type Currency {
    code: String!,
    name: String!,
    symbol: String!,
    exchangeRate: Float,
  }
  type AuthData {
    userId: ID!
    token: String!
  }
  input UserInput {
    email: String!
    name: String!
    password: String!
  }
  input UpdateUser {
    email: String
    name: String
    password: String
  }
`;

const schema: ApolloServerExpressConfig = {
    typeDefs,
    resolvers,
    introspection: true,
    context: async ({ req, connection, payload }: any) => {
        if (connection) {
            return { isAuth: payload.authToken };
        }
        return { isAuth: req.isAuth };
    },
    formatError: (err) => {
        process.env.NODE_ENV = 'development';
        // Show full error with stacktrace
        if (process.env.NODE_ENV && process.env.NODE_ENV === 'development' ||
            process.env.NODE_ENV && process.env.NODE_ENV === 'staging') {
            return err;
        }
        // Otherwise return the original error. The error can also
        // Don't give the specific errors to the client.
        return new Error(err.message);
    },
};

export default schema;
