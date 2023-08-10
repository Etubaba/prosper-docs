import {
  Body,
  Controller,
  Post,
  Get,
  UseGuards,
  Param,
  Patch,
} from '@nestjs/common';
import { DocumentService } from '../service/document.service';
import { CreateDataDto } from '../dto/docs.dto';
import { JwtGuard } from '../../auth/guard/jwt.guard';
import { UpdateDocDto } from '../dto/updateDoc.dto';
import { ShareDocumentDto } from '../dto/shareDoc.dto';

@Controller('document')
export class DocumentController {
  constructor(private documentService: DocumentService) {}

  @UseGuards(JwtGuard)
  @Post('create')
  async createDocument(@Body() dto: CreateDataDto) {
    return await this.documentService.createDocument(dto);
  }
  @UseGuards(JwtGuard)
  @Get('/:id')
  async singleDocument(@Param('id') id: string) {
    return await this.documentService.getSingleDocument(id);
  }
  @UseGuards(JwtGuard)
  @Patch('/update/:id')
  async updateDocument(
    @Body() updateDocDto: UpdateDocDto,
    @Param('id') id: string,
  ) {
    return await this.documentService.updateDocument(id, updateDocDto);
  }

  @UseGuards(JwtGuard)
  @Post('/share')
  async shareDocument(@Body() shareDocDto: ShareDocumentDto) {
    return await this.documentService.shareDocument(shareDocDto);
  }
}
