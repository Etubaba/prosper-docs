"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
dotenv.config();
exports.default = () => ({
    app: {
        environment: process.env.APP_ENV === 'production' ? 'production' : process.env.APP_ENV,
        port: parseInt(process.env.APP_PORT, 10) || 3010,
        host: 'localhost',
        name: process.env.APP_NAME || 'veegil-media',
        url: process.env.APP_URL,
        global_url_prefix: process.env.GLOBAL_URL_PREFIX || 'api/v1',
        client_url: process.env.CLIENT_URL,
        full_url: `${process.env.APP_URL}/${process.env.GLOBAL_URL_PREFIX}`,
    },
    jwt: {
        access: {
            secret: process.env.JWT_SECRET,
            signInOptions: {
                expiresIn: process.env.JWT_ACCEESS_EXPIRES_IN,
            },
        },
        refresh: {
            secret: process.env.JWT_SECRET,
            signInOptions: {
                expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
            },
        },
    },
    mail: {
        pass: process.env.MAIL_ETHEREAL,
        user: process.env.MAIL_USER,
    },
    cors: {
        origin: process.env.CORS_ORIGIN || '*',
        methods: process.env.CORS_METHODS || 'GET,HEAD,PUT,PATCH,POST,DELETE',
        headers: process.env.CORS_HEADERS || '*',
    },
});
//# sourceMappingURL=index.js.map