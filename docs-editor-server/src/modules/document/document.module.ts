import { Module } from '@nestjs/common';
import { DocumentGateway } from './gateway/document.gateway';
import { DocumentService } from './service/document.service';
import { DocumentController } from './controller/document.controller';

@Module({
  controllers: [DocumentController],
  providers: [DocumentGateway, DocumentService],
})
export class DocumentModule {}
