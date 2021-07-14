/* eslint-disable no-useless-catch */
import * as jwt from 'jsonwebtoken';
import config from '../../../config';

/**
 * User Queries
 */
const UserQueries = {
    login: async (parent, { email, password }) => {
        try {
            const user: any = { id: 100 };
            if (!user) {
                throw new Error('User does not Exists');
            }
            const token = jwt.sign({ userId: user.id }, config.jwtSecret, {
                expiresIn: '1h'
            });
            return {
                userId: user.id,
                token
            };
        } catch (err) {
            throw err;
        }
    }
};

/**
 * User Mutations
 */
const UserMutation = {

};

export { UserQueries, UserMutation };
