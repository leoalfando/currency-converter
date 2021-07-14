import {CountryQueries} from './country';
import { UserMutation, UserQueries } from './user';
const rootResolver = {
    Query: {
        ...UserQueries,
        ...CountryQueries
    // Add other queries here
    },
    Mutation: {
        ...UserMutation
    // Add other mutations here
    }
};
export default rootResolver;
