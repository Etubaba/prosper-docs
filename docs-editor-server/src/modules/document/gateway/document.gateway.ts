import {
  SubscribeMessage,
  WebSocketGateway,
  MessageBody,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import config from '../../../../config';
import { PrismaService } from '../../../database/prisma/service/prisma.service';
import { SaveDocumentDto } from '../dto/savedocument.dto';

@WebSocketGateway({
  namespace: 'document',
  cors: {
    // origin: config().cors.origin,
    origin: '*',
    allowedHeaders: config().cors.headers,
    methods: config().cors.methods,
  },
})
export class DocumentGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  private readonly rooms: Map<string, Set<Socket>> = new Map<
    string,
    Set<Socket>
  >();
  constructor(private readonly Prisma: PrismaService) {}

  @WebSocketServer() server: Server;

  handleConnection(socket: Socket) {
    const documentId = socket.handshake.query.documentId as string;

    if (documentId) {
      if (!this.rooms.has(documentId)) {
        this.rooms.set(documentId, new Set<Socket>());
      }
      this.rooms.get(documentId).add(socket);
      socket.join(documentId);
      console.log(socket.rooms);
    }
    this.emitUsersInRoom(documentId);
  }

  handleDisconnect(socket: Socket) {
    const documentId = socket.handshake.query.documentId as string;
    if (documentId && this.rooms.has(documentId)) {
      this.rooms.get(documentId).delete(socket);
      if (this.rooms.get(documentId).size === 0) {
        this.rooms.delete(documentId);
      }
    }
  }
  //all users in room
  private emitUsersInRoom(documentId: string) {
    const usersArr = Array.from(this.rooms.get(documentId) || []).map(
      (socket) => {
        return {
          user_name: socket.handshake.query.user as string,
          socketId: socket.id,
        };
      },
    );

    //remove duplicate users
    const uniqueNames = {};
    const usersInRoom = usersArr.filter((item) => {
      if (!uniqueNames[item.user_name]) {
        uniqueNames[item.user_name] = true;
        return true;
      }
      return false;
    });

    this.server.to(documentId).emit('connected-users', usersInRoom);
  }

  //listen for document change
  @SubscribeMessage('document-change')
  async handleDocumentEdit(@MessageBody() data: any) {
    // const socketId = socket.id;
    const { documentId, delta, senderSocketId } = data;
    console.log('delta', delta);
    const sockets = await this.server.in(documentId).fetchSockets();

    for (const socket of sockets) {
      if (socket.id !== senderSocketId) {
        this.server.to(socket.id).emit('update-document', delta);
      }
    }
  }

  //listen to for cursor update
  @SubscribeMessage('cursor-update')
  handleCursorUpdate(@MessageBody() data: any) {
    const {
      documentId,
      cursorPosition,
      user_name,
      user_color,
      senderSocketId,
    } = data;
    this.server.to(documentId).emit('cursor-position', {
      cursorPosition,
      user_name,
      user_color,
      senderSocketId,
    });
  }

  //save document
  @SubscribeMessage('save-document')
  async handleDocumentSave(
    @MessageBody() { data, documentId }: SaveDocumentDto,
  ) {
    console.log('save doc');
    await this.Prisma.documents.update({
      where: {
        id: documentId,
      },
      data: {
        content: data,
      },
    });
  }

  //load document
  @SubscribeMessage('load-document')
  async loadDocument(@MessageBody() documentId: string) {
    const document = await this.Prisma.documents.findUnique({
      where: {
        id: documentId,
      },
    });
    this.server.to(documentId).emit('document-result', document.content);
  }
}
