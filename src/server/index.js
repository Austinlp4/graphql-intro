const express = require('express');
const cors = require('cors');
const graphqlHTTP = require('express-graphql');
const gql = require('graphql-tag');
const { buildASTSchema } = require('graphql');

// mock data
const POSTS = [
    { author: "Austin Pendergrast", body: "Hello World" },
    { author: "Sydney Silva", body: "Hi There" },
]
// parses the string and converts it to GraphQL AST
const schema = buildASTSchema(gql`
    type Query {
        posts: [Post]
        post(id: ID!): Post
    }

    type Post {
        id: ID
        author: String
        body: String
    }

    type mutation {
        submitPost(input: PostInput!): Post
    }

    input PostInput {
        id: ID
        author: String!
        body: String!
    }
`);

// resolvers that tell graphql how to query the data
const mapPost = (post, id) => post && ({ id, ...post });

const root = {
    posts: () => POSTS.map(mapPost),
    post: ({ id }) => mapPost(POSTS[id], id),
    submitPost: ({ input: { id, author, body } }) => {
        const post = { author, body };
        let index = POSTS.length;

        if (id != null && id >= 0 && id < POSTS.length ) {
            if(POSTS[id].authorId !== authorId) return null;

            POSTS.splice(id, 1, post);
            index = id;
        } else {
            POSTS.push(post)
        }

        return mapPost(post, index)
    }
};

const app = express();
app.use(cors());
//The graphqlHTTP function creates an Express server running GraphQL,
// which expects the resolvers as rootValue
app.use('/graphql', graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
}));

const port = process.env.PORT || 4000
app.listen(port);
console.log(`Running at localhost:${port}/graphql`);