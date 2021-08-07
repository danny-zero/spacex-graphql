const axios = require('axios');

const { 
    GraphQLObjectType, 
    GraphQLInt, 
    GraphQLString, 
    GraphQLBoolean, 
    GraphQLList, 
    GraphQLSchema,
} = require('graphql');


//Launch Type
const LaunchType = new GraphQLObjectType({
  name: 'Launch',
  fields: () => ({
    id: { type: GraphQLString }, 
    flight_number: { type: GraphQLInt },
    name: { type: GraphQLString },
    date_local: { type: GraphQLString },
    success: { type: GraphQLBoolean },
    rocket: { type: GraphQLString },
    details: { type: GraphQLString }
  })
});


// Rocket Type
const RocketType = new GraphQLObjectType({
    name: 'Rocket',
    fields: () => ({
        id: { type: GraphQLString }, 
        name: { type: GraphQLString }, 
        type: { type: GraphQLString },
        description: { type: GraphQLString },
        flickr_images: { type: new GraphQLList(GraphQLString) }
    })
});

// Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        launches: {
            type: new GraphQLList(LaunchType),
            resolve: async (parent, args) => {
                const { data } = await axios.get('https://api.spacexdata.com/v4/launches/');
                return data
            }
        },
        launch : {
            type: LaunchType,
            args: {
                id: { type: GraphQLString },
            },
            resolve: async (parent, args) => {
                const { data } = await axios.get(`https://api.spacexdata.com/v4/launches/${args.id}`);
                return data
            }
        },
        rocket: {
            type: RocketType,
            args: {
                id: { type: GraphQLString },
            },
            resolve: async (parent, args) => {
                const { data } = await axios.get(`https://api.spacexdata.com/v4/rockets/${args.id}`);
                return data;
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
});
