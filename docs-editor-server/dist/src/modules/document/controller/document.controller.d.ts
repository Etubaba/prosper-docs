import { DocumentService } from '../service/document.service';
import { CreateDataDto } from '../dto/docs.dto';
import { UpdateDocDto } from '../dto/updateDoc.dto';
import { ShareDocumentDto } from '../dto/shareDoc.dto';
export declare class DocumentController {
    private documentService;
    constructor(documentService: DocumentService);
    createDocument(dto: CreateDataDto): Promise<{
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
    singleDocument(id: string): Promise<{
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
    updateDocument(updateDocDto: UpdateDocDto, id: string): Promise<{
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
    shareDocument(shareDocDto: ShareDocumentDto): Promise<{
        message: string;
    }>;
}
