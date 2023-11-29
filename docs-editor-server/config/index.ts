import * as dotenv from 'dotenv';
dotenv.config();

export default () => ({
  app: {
    environment:
      process.env.APP_ENV === 'production' ? 'production' : process.env.APP_ENV,
    port: parseInt(process.env.PORT, 10),
    host: 'localhost',
    name: process.env.APP_NAME || 'prosper-docs',
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
    methods: process.env.CORS_METHODS || 'POST,GET,HEAD,PATCH',
    headers: process.env.CORS_HEADERS || '*',
  },
});
