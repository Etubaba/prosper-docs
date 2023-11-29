import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import config from '../config';
import { ConfigService } from '@nestjs/config';
import { json, urlencoded } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const port = configService.get<number>('app.port');
  app.setGlobalPrefix(configService.get('app.global_url_prefix'));

  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ limit: '50mb', extended: true }));
  app.enableCors({
    origin: '*',
    methods: 'POST,GET,PATCH',
  });

  // app.useWebSocketAdapter(new IoAdapter(app));

  await app.listen(port, '0.0.0.0', () => {
    console.log(`Listening at port ${port}`);
  });
}
bootstrap();
