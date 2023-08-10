import { DocumentService } from './document.service';
import { PrismaService } from '../../../database/prisma/service/prisma.service';
import { Test, TestingModule } from '@nestjs/testing';
import { sendEmail } from '../../../utils/email/sendEmail';

describe('DocumentService', () => {
  let documentService: DocumentService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [DocumentService, PrismaService],
    }).compile();
    documentService = moduleRef.get<DocumentService>(DocumentService);
    prismaService = moduleRef.get<PrismaService>(PrismaService);
  });

  const mockDoc = {
    id: 'document_id',
    owner_id: 'erestring',
    description: 'hew;wllee',
    content: [{}],
    title: 'test',
    created_at: new Date(),
    updated_at: new Date(),
  };

  it('should be defined', () => {
    expect(DocumentService).toBeDefined();
    expect(PrismaService).toBeDefined();
  });

  describe('createDocument', () => {
    const mockUser = {
      id: '12345',
      user_name: 'example',
      email: 'we@gmail.com',
      password: 'password',
    };
    const mockRoom = {
      id: 'wewewe',
      created_at: new Date(),
      permitted_users: ['wewewew'],
      owner_id: 'rererere',
      documentsId: 'ererere',
    };

    it('should create a document', async () => {
      const usersFindUniqueMock = jest.spyOn(prismaService.users, 'findUnique');
      usersFindUniqueMock.mockResolvedValue(mockUser);

      const documentsCreateMock = jest.spyOn(prismaService.documents, 'create');
      documentsCreateMock.mockResolvedValue(mockDoc);

      const roomsCreateMock = jest.spyOn(prismaService.rooms, 'create');
      roomsCreateMock.mockResolvedValue(mockRoom);

      const result = await documentService.createDocument({
        user_id: 'user_id',
      });

      expect(result.data.id).toBe('document_id');
    });

    it('should throw an error if user is not found', async () => {
      const usersFindUniqueMock = jest.spyOn(prismaService.users, 'findUnique');
      usersFindUniqueMock.mockResolvedValue(null);

      await expect(
        documentService.createDocument({ user_id: 'user_id2' }),
      ).rejects.toThrow();
    });
  });

  describe('getSingleDocument', () => {
    it('should fetch a single document', async () => {
      const documentsFindUniqueMock = jest.spyOn(
        prismaService.documents,
        'findUnique',
      );
      documentsFindUniqueMock.mockResolvedValue(mockDoc);

      const result = await documentService.getSingleDocument('document_id');

      expect(result.data.id).toBe('document_id');
    });

    it('should throw an error if document is not found', async () => {
      const documentsFindUniqueMock = jest.spyOn(
        prismaService.documents,
        'findUnique',
      );
      documentsFindUniqueMock.mockResolvedValue(null);

      await expect(
        documentService.getSingleDocument('document_id'),
      ).rejects.toThrow();
    });
  });

  describe('updateDocument', () => {
    it('should update a document', async () => {
      const documentsUpdateMock = jest.spyOn(prismaService.documents, 'update');
      documentsUpdateMock.mockResolvedValue(mockDoc);

      const result = await documentService.updateDocument('document_id', {
        title: 'new_title',
        content: [{ ops: {} }],
      });

      expect(result.data.id).toBe('document_id');
      expect(result.data.title).toBe('test');
    });

    it('should throw an error if document update fails', async () => {
      const documentsUpdateMock = jest.spyOn(prismaService.documents, 'update');
      documentsUpdateMock.mockRejectedValue(new Error('Update error'));

      await expect(
        documentService.updateDocument('document_id', {
          title: 'new_title',
          content: [{ ops: {} }],
        }),
      ).rejects.toThrow();
    });
  });

  describe('shareDocument', () => {
    const mockUser = {
      id: 'user_id',
      email: 'user@gmail.com',
      user_name: 'ogogo',
      password: '12345',
    };
    const mockRoom = {
      id: 'room_id',
      created_at: new Date(),
      permitted_users: ['user_id1'],
      owner_id: 'user_id',
      documentsId: 'doc_id',
    };
    it('should share a document and send email', async () => {
      const usersFindUniqueMock = jest.spyOn(prismaService.users, 'findUnique');

      usersFindUniqueMock.mockResolvedValue(mockUser);

      const roomsFindUniqueMock = jest.spyOn(prismaService.rooms, 'findUnique');
      roomsFindUniqueMock.mockResolvedValue(mockRoom);

      const roomsUpdateMock = jest.spyOn(prismaService.rooms, 'update');
      roomsUpdateMock.mockResolvedValue(mockRoom);

      const result = await documentService.shareDocument({
        email: 'user@example.com',
        documentId: 'document_id',
      });

      expect(result.message).toBe('Email shared Successdully');
    });

    it('should throw an error if user not found', async () => {
      const usersFindUniqueMock = jest.spyOn(prismaService.users, 'findUnique');
      usersFindUniqueMock.mockResolvedValue(null);

      await expect(
        documentService.shareDocument({
          email: 'user@example.com',
          documentId: 'document_id',
        }),
      ).rejects.toThrow();
    });

    it('should throw an error if document room not found', async () => {
      const usersFindUniqueMock = jest.spyOn(prismaService.users, 'findUnique');
      usersFindUniqueMock.mockResolvedValue(mockUser);

      const roomsFindUniqueMock = jest.spyOn(prismaService.rooms, 'findUnique');
      roomsFindUniqueMock.mockResolvedValue(null);

      await expect(
        documentService.shareDocument({
          email: 'user@example.com',
          documentId: 'document_id',
        }),
      ).rejects.toThrow();
    });

    it('should throw an error if updating room fails', async () => {
      const usersFindUniqueMock = jest.spyOn(prismaService.users, 'findUnique');
      usersFindUniqueMock.mockResolvedValue(mockUser);

      const roomsFindUniqueMock = jest.spyOn(prismaService.rooms, 'findUnique');
      roomsFindUniqueMock.mockResolvedValue(mockRoom);

      const roomsUpdateMock = jest.spyOn(prismaService.rooms, 'update');
      roomsUpdateMock.mockRejectedValue(new Error('Update error'));

      await expect(
        documentService.shareDocument({
          email: 'user@example.com',
          documentId: 'document_id',
        }),
      ).rejects.toThrow();
    });
  });
});
