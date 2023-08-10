import { Test } from '@nestjs/testing';
import { DocumentController } from './document.controller';
import { DocumentService } from '../service/document.service';
import { PrismaService } from '../../../database/prisma/service/prisma.service';
import { UpdateDocDto } from '../dto/updateDoc.dto';
import { ShareDocumentDto } from '../dto/shareDoc.dto';
import { CreateDataDto } from '../dto/docs.dto';

describe('DocumentController', () => {
  let documentController: DocumentController;
  let documentService: DocumentService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [DocumentController],
      providers: [DocumentService, PrismaService],
    }).compile();

    documentController = moduleRef.get<DocumentController>(DocumentController);
    documentService = moduleRef.get<DocumentService>(DocumentService);
  });

  describe('Create Document ', () => {
    it(`Should create a document `, async () => {
      const documentDto: CreateDataDto = {
        user_id: 'user_id',
      };

      documentService.createDocument = jest
        .fn()
        .mockResolvedValueOnce('Document created');
      const result = await documentController.createDocument(documentDto);

      expect(documentService.createDocument).toHaveBeenCalledWith(documentDto);
      expect(result).toBe('Document created');
    });

    it('should throw an error if user is not found', async () => {
      const documentDto: CreateDataDto = {
        user_id: 'user_id',
      };

      jest
        .spyOn(documentService, 'createDocument')
        .mockRejectedValue(new Error('User not found'));

      await expect(
        documentController.createDocument(documentDto),
      ).rejects.toThrow();
    });
  });

  describe('singleDocument', () => {
    it('should fetch a single document', async () => {
      const documentId = 'document_id';

      const expectedResult = {
        data: {
          id: 'doc_id',
          owner_id: 'user_id',
          description: 'cool stuff',
          content: [{ ops: {} }],
          title: 'rerer',
          updated_at: new Date(),
          created_at: new Date(),
          doc_room: {
            id: 'document_id',
            created_at: new Date(),
            permitted_users: [''],
            owner_id: 'user_id',
            documentsId: 'doc_id',
          },
        },
      };
      jest
        .spyOn(documentService, 'getSingleDocument')
        .mockResolvedValue(expectedResult);

      const result = await documentController.singleDocument(documentId);

      expect(result).toEqual(expectedResult);
    });

    it('should throw an error if document is not found', async () => {
      const documentId = 'non_existent_document_id';

      jest
        .spyOn(documentService, 'getSingleDocument')
        .mockRejectedValue(new Error('Document not found'));

      await expect(
        documentController.singleDocument(documentId),
      ).rejects.toThrow();
    });
  });

  describe('updateDocument', () => {
    it('should update a document', async () => {
      const documentId = 'document_id';
      const updateDocDto: UpdateDocDto = {
        title: 'New Title',
        content: [{ ops: {} }],
      };
      const expectedResult = {
        data: {
          id: 'doc_id',
          owner_id: 'user_id',
          description: 'user doc',
          content: [{ ops: {} }],
          title: 'New Title',
          created_at: new Date(),
          updated_at: new Date(),
        },
      };

      jest
        .spyOn(documentService, 'updateDocument')
        .mockResolvedValue(expectedResult);

      const result = await documentController.updateDocument(
        updateDocDto,
        documentId,
      );

      expect(result).toEqual(expectedResult);
    });

    it('should throw an error if document update fails', async () => {
      const documentId = 'document_id';
      const updateDocDto: UpdateDocDto = {
        title: 'New Title',
        content: [{ ops: {} }],
      };

      jest
        .spyOn(documentService, 'updateDocument')
        .mockRejectedValue(new Error('Update error'));

      await expect(
        documentController.updateDocument(updateDocDto, documentId),
      ).rejects.toThrow();
    });
  });

  describe('shareDocument', () => {
    it('should share a document and return success message', async () => {
      const shareDocDto: ShareDocumentDto = {
        email: 'user@example.com',
        documentId: 'document_id',
      };
      const expectedResult = { message: 'Email shared Successdully' };

      jest
        .spyOn(documentService, 'shareDocument')
        .mockResolvedValue(expectedResult);

      const result = await documentController.shareDocument(shareDocDto);

      expect(result).toEqual(expectedResult);
    });

    it('should throw an error if sharing document fails', async () => {
      const shareDocDto: ShareDocumentDto = {
        email: 'user@example.com',
        documentId: 'document_id',
      };

      jest
        .spyOn(documentService, 'shareDocument')
        .mockRejectedValue(new Error('Share error'));

      await expect(
        documentController.shareDocument(shareDocDto),
      ).rejects.toThrow();
    });
  });
});
