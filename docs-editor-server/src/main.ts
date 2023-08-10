import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import config from '../config';
import { ConfigService } from '@nestjs/config';
import { json, urlencoded } from 'express';
import { IoAdapter } from '@nestjs/platform-socket.io';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const port = configService.get<number>('app.port');
  // app.setGlobalPrefix(configService.get('app.global_url_prefix'));

  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ limit: '50mb', extended: true }));
  app.enableCors({
    origin: configService.get('cors.origin'),
    methods: configService.get('cors.methods'),
  });

  // app.useWebSocketAdapter(new IoAdapter(app));

  await app.listen(port, () => {
    console.log(`Listening at port ${port}`);
  });
}
bootstrap();
