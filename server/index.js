const express = require('express')
const app = express()
const {graphqlHTTP} = require('express-graphql')
const cors = require('cors')
const schema = require('./schema')

const users = [{id: 1, username: 'Maxim', age: 21}] //Pseudo DB

const createUser = (input) => {
    const id = Date.now()
    return {
        id, ...input
    }
}

const root = {
    getAllUsers: () => {
        return users
    },
    getUser: ({id}) => {
        return users.find(user => user.id === id)
    },
    createUser: ({input}) => {
        const user = createUser(input)
        users.push(user)
        return user
    }
}

app.use(cors())
app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema,
    rootValue: root
}))

app.listen(5000, () => console.log('Server starten on port 5000'))