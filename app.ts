import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { createServer } from 'http';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { makeExecutableSchema } from '@graphql-tools/schema';
import rootSchema from "./schemas/rootSchema";
import { resolvers } from "./resolvers/resolvers";
import rateLimit from "express-rate-limit";
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { graphqlUploadExpress } from "graphql-upload-ts";
import dotenv from 'dotenv';

dotenv.config();


async function startServer() {
    const app = express();
    const httpServer = createServer(app);

    app.use(helmet({
        contentSecurityPolicy: process.env.NODE_ENV === 'production' ? undefined : false,
    }));

    app.use(cors({
        origin: process.env.CLIENT_URL,
        credentials: true
    }));

    app.use(cookieParser());
    app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }));

    const limiter = rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 100,
        standardHeaders: true,
        legacyHeaders: false,
    });
    app.use('/graphql', limiter);

    const schema = makeExecutableSchema({
        typeDefs: rootSchema,
        resolvers: resolvers,
    });

    const server = new ApolloServer({
        schema,
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer }),
            process.env.NODE_ENV === 'production'
                ? ApolloServerPluginLandingPageGraphQLPlayground()
                : ApolloServerPluginLandingPageGraphQLPlayground({
                    settings: {
                        'request.credentials': 'include',
                    },
                }),
        ],
        formatError: (error) => {
            console.error(error);
            return {
                message: error.message,
                locations: error.locations,
                path: error.path,
                extensions: error.extensions,
            };
        },
    });

    await server.start();

    server.applyMiddleware({
        app,
        cors: false,
        bodyParserConfig: {
            limit: '1mb',
        },
    });

    const PORT = process.env.PORT || 4000;
    const isProduction = process.env.NODE_ENV === 'production';
    const httpProtocol = isProduction ? 'https' : 'http';
    const host = isProduction ? process.env.HOST || '0.0.0.0' : 'localhost';

    httpServer.listen(PORT, () => {
        console.log(`Server is running on ${httpProtocol}://${host}:${PORT}${server.graphqlPath}`);
        if (isProduction) {
            console.log('Running in production mode');
        } else {
            console.log('Running in development mode');
        }
    });
}

startServer().catch((error) => {
    console.error('Failed to start server:', error);
    process.exit(1);
});

