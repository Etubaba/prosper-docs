import { CreateDataDto } from '../dto/docs.dto';
import { UpdateDocDto } from '../dto/updateDoc.dto';
import { PrismaService } from '../../../database/prisma/service/prisma.service';
import { ShareDocumentDto } from '../dto/shareDoc.dto';
export declare class DocumentService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    createDocument(createDocument: CreateDataDto): Promise<{
        data: {
            id: string;
            owner_id: string;
            description: string;
            content: import(".prisma/client").Prisma.JsonValue;
            title: string;
            created_at: Date;
            updated_at: Date;
        };
    }>;
    getSingleDocument(id: string): Promise<{
        data: {
            doc_room: {
                id: string;
                created_at: Date;
                permitted_users: string[];
                owner_id: string;
                documentsId: string;
            };
        } & {
            id: string;
            owner_id: string;
            description: string;
            content: import(".prisma/client").Prisma.JsonValue;
            title: string;
            created_at: Date;
            updated_at: Date;
        };
    }>;
    updateDocument(id: string, updateDocument: UpdateDocDto): Promise<{
        data: {
            id: string;
            owner_id: string;
            description: string;
            content: import(".prisma/client").Prisma.JsonValue;
            title: string;
            created_at: Date;
            updated_at: Date;
        };
    }>;
    shareDocument(shareDto: ShareDocumentDto): Promise<{
        message: string;
    }>;
}
