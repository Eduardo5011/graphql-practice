const { ApolloServer, gql, MockList } = require("apollo-server");

const typeDefs = gql`
  scalar Date

"""
an object that describes the characteristics if a ski day
"""
    
    
  type SkiDay {
    "A ski day's unique identifier"
    id: ID
    "the date that a ski day occured"
    date: Date!
    "a location that a sk iday occured"
    mountain: String
    "the shape that the snow was in when this ski day jhappened"
    conditions: Conditions
  }

  enum Conditions {
    POWDER
    HEAVY
    ICE
    THIN
  }

  type Query {
    totalDays: Int!
    allDays: [SkiDay!]!
  }

  input AddDayInput {
    date: Date!
    mountain: String!
    conditions: Conditions
  }

  type RemoveDayPayload {
    day: SkiDay!
    removed: Boolean
    totalBefore: Int
    totalAfter: Int
  }

  type Mutation {
    addDay(input: AddDayInput!): SkiDay
    removeDay(id: ID!): RemoveDayPayload!
  }
  type Subscription {
    newDay: SkiDay!
  }
`;

const mocks = {
  Date: () => "1/2/2025",
  String: () => "Cool Dat",
  Query: () => ({
    allDays: () => new MockList([1,5]),
  }),
};

// const resolvers = {};

const server = new ApolloServer({ typeDefs, mocks });

server.listen().then(({ url }) => console.log(`Server running at ${url}`));
