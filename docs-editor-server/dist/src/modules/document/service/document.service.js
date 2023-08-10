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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../database/prisma/service/prisma.service");
const sendEmail_1 = require("../../../utils/email/sendEmail");
const emailTemplate_1 = require("../../../utils/email/emailTemplate");
const config_1 = require("../../../../config");
let DocumentService = class DocumentService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async createDocument(createDocument) {
        const { user_id } = createDocument;
        try {
            const user = await this.prismaService.users.findUnique({
                where: {
                    id: user_id,
                },
            });
            if (!user)
                throw new common_1.HttpException('User not found', 404);
            const document = await this.prismaService.documents.create({
                data: {
                    owner_id: user_id,
                    title: 'untitled document',
                },
            });
            await this.prismaService.rooms.create({
                data: {
                    documentsId: document.id,
                    owner_id: user_id,
                },
            });
            return { data: document };
        }
        catch (err) {
            console.log(err);
            throw new common_1.HttpException('Error creating a document!', 501);
        }
    }
    async getSingleDocument(id) {
        try {
            const document = await this.prismaService.documents.findUnique({
                where: {
                    id,
                },
                include: {
                    doc_room: true,
                },
            });
            if (!document)
                throw new common_1.HttpException(`Document not found`, 404);
            return { data: document };
        }
        catch (err) {
            console.log(err.message);
            throw new common_1.HttpException(`Error fetching document ${err.message}`, 500);
        }
    }
    async updateDocument(id, updateDocument) {
        const { title, content } = updateDocument;
        try {
            const document = await this.prismaService.documents.update({
                where: {
                    id,
                },
                data: {
                    content,
                    title,
                },
            });
            return { data: document };
        }
        catch (err) {
            throw new common_1.HttpException('Error updating your document!', 500);
        }
    }
    async shareDocument(shareDto) {
        const { email, documentId } = shareDto;
        try {
            const user = await this.prismaService.users.findUnique({
                where: {
                    email,
                },
            });
            if (!user)
                throw new common_1.HttpException(`User doesn't exist on this system`, 404);
            const room = await this.prismaService.rooms.findUnique({
                where: {
                    documentsId: documentId,
                },
            });
            await this.prismaService.rooms.update({
                where: {
                    id: room === null || room === void 0 ? void 0 : room.id,
                },
                data: {
                    permitted_users: [...room.permitted_users, user.id],
                },
            });
            const link = `${(0, config_1.default)().app.client_url}/share_doc?doc_id=${documentId}`;
            const html = (0, emailTemplate_1.htmlTemplate)(user.user_name, link);
            const emailDetails = {
                email,
                html,
            };
            await (0, sendEmail_1.sendEmail)(emailDetails);
            return { message: 'Email shared Successdully' };
        }
        catch (err) {
            throw new common_1.HttpException(`${err.message}`, 500);
        }
    }
};
DocumentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DocumentService);
exports.DocumentService = DocumentService;
//# sourceMappingURL=document.service.js.map