"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const prisma_service_1 = require("../../../database/prisma/service/prisma.service");
const savedocument_dto_1 = require("../dto/savedocument.dto");
let DocumentGateway = class DocumentGateway {
    constructor(Prisma) {
        this.Prisma = Prisma;
        this.rooms = new Map();
    }
    handleConnection(socket) {
        const documentId = socket.handshake.query.documentId;
        if (documentId) {
            if (!this.rooms.has(documentId)) {
                this.rooms.set(documentId, new Set());
            }
            this.rooms.get(documentId).add(socket);
            socket.join(documentId);
            console.log(socket.rooms);
        }
        this.emitUsersInRoom(documentId);
    }
    handleDisconnect(socket) {
        const documentId = socket.handshake.query.documentId;
        if (documentId && this.rooms.has(documentId)) {
            this.rooms.get(documentId).delete(socket);
            if (this.rooms.get(documentId).size === 0) {
                this.rooms.delete(documentId);
            }
        }
    }
    emitUsersInRoom(documentId) {
        const usersArr = Array.from(this.rooms.get(documentId) || []).map((socket) => {
            return {
                user_name: socket.handshake.query.user,
                socketId: socket.id,
            };
        });
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
    async handleDocumentEdit(data) {
        const { documentId, delta, senderSocketId } = data;
        console.log('delta', delta);
        const sockets = await this.server.in(documentId).fetchSockets();
        for (const socket of sockets) {
            if (socket.id !== senderSocketId) {
                this.server.to(socket.id).emit('update-document', delta);
            }
        }
    }
    handleCursorUpdate(data) {
        const { documentId, cursorPosition, user_name, user_color, senderSocketId, } = data;
        this.server.to(documentId).emit('cursor-position', {
            cursorPosition,
            user_name,
            user_color,
            senderSocketId,
        });
    }
    async handleDocumentSave({ data, documentId }) {
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
    async loadDocument(documentId) {
        const document = await this.Prisma.documents.findUnique({
            where: {
                id: documentId,
            },
        });
        this.server.to(documentId).emit('document-result', document.content);
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], DocumentGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('document-change'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DocumentGateway.prototype, "handleDocumentEdit", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('cursor-update'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DocumentGateway.prototype, "handleCursorUpdate", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('save-document'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [savedocument_dto_1.SaveDocumentDto]),
    __metadata("design:returntype", Promise)
], DocumentGateway.prototype, "handleDocumentSave", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('load-document'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DocumentGateway.prototype, "loadDocument", null);
DocumentGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        namespace: 'document',
        cors: {
            origin: ['https://prosper-docs-one.vercel.app', 'http://localhost'],
            methods: ['GET', 'POST'],
            allowedHeaders: '*',
            credentials: true,
        },
    }),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DocumentGateway);
exports.DocumentGateway = DocumentGateway;
//# sourceMappingURL=document.gateway.js.map