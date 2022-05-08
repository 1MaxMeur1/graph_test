const {buildSchema} = require('graphql')

const schema = buildSchema(`
    type User {
        id: ID
        username: String
        age: Int
        posts: [Post]
    }
    type Post {
        id: ID
        title: String
        content: String
    }
    input UserInput {
        id: ID
        username: String!
        age: Int!
        posts: [PostInput]
    }

    input PostInput {
        id: ID
        title: String!
        content: String!
    }
    type Query {
        getAllUsers: [User]
        getUser(id: ID): User
    }

    type Mutation {
        createUser(input: UserInput): User
    }
`)

// To get data =>
// query {
//     getAllUsers {
//         id,username, age
//     }
// }

// to put data =>
// mutation {
//     createUser(input: {
//         username: 'Name'
//         age: 12
//     }) {
//         id, username
//     }
// }

module.exports = schema