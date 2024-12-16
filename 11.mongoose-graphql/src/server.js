require('dotenv').config()
const {ApolloServer} = require('@apollo/server');
const {startStandaloneServer} = require('@apollo/server/standalone');
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');
const connectToDB = require('./Database/db');




async function startServer() {
    const server = new ApolloServer({
        typeDefs,
        resolvers
    })

const {url} = await startStandaloneServer(server, {
    listen : {port : process.env.PORT||3000}
}
); 

console.log(`Server ready at: ${url}`);

}

startServer();
connectToDB();