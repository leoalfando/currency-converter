import { ApolloServer } from 'apollo-server-express';
import * as cors from 'cors';
import * as express from 'express';
import * as rateLimiter from 'express-rate-limit';
import * as http from 'http';
import schema from '../server/graphql/schema/index';
import auth from '../server/middleware/auth';
import config from './index';

class Express {
  public express: express.Application;
  public server: ApolloServer = new ApolloServer(schema);
  public httpServer: http.Server;
  public init = (): void => {
      /**
     * Creating an express application
     */
      this.express = express();
      /**
     * Middlerware for using CORS
     */
      this.express.use(cors({
          origin(origin, callback) {
              /**
         * Allow requests with no origin
         * Like mobile apps or curl requests
         */
              if (!origin) { return callback(null, true); }
              if (config.allowedOrigins.indexOf(origin) === -1) {
                  const msg = `The CORS policy for this site does not
          allow access from the specified Origin.`;
                  return callback(new Error(msg), false);
              }
              return callback(null, true);
          }
      }));

      const limiter = rateLimiter({
          windowMs: 60 * 1000, // 1 minutes
          max: 30 // limit each IP to 30 requests per windowMs
      });

      //  apply to all requests
      this.express.use(limiter);

      /**
     *  Middlerware for extracting authToken
     */
      this.express.use(auth);
      this.server.applyMiddleware({ app: this.express });
      this.httpServer = http.createServer(this.express);
      /**
     * Installing subscription handlers
     */
      this.server.installSubscriptionHandlers(this.httpServer);
  }
}

export default Express;
