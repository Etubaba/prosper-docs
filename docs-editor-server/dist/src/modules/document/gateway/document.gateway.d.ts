import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PrismaService } from '../../../database/prisma/service/prisma.service';
import { SaveDocumentDto } from '../dto/savedocument.dto';
export declare class DocumentGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly Prisma;
    private readonly rooms;
    constructor(Prisma: PrismaService);
    server: Server;
    handleConnection(socket: Socket): void;
    handleDisconnect(socket: Socket): void;
    private emitUsersInRoom;
    handleDocumentEdit(data: any): Promise<void>;
    handleCursorUpdate(data: any): void;
    handleDocumentSave({ data, documentId }: SaveDocumentDto): Promise<void>;
    loadDocument(documentId: string): Promise<void>;
}
