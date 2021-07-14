import { ApolloError } from 'apollo-server-errors';

export class ErrorHelper extends ApolloError {
    constructor(message: string, errorCode) {
        super(message, errorCode);

        Object.defineProperty(this, 'name', { value: message });
    }
}
