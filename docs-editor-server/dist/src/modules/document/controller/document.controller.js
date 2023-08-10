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
exports.DocumentController = void 0;
const common_1 = require("@nestjs/common");
const document_service_1 = require("../service/document.service");
const docs_dto_1 = require("../dto/docs.dto");
const jwt_guard_1 = require("../../auth/guard/jwt.guard");
const updateDoc_dto_1 = require("../dto/updateDoc.dto");
const shareDoc_dto_1 = require("../dto/shareDoc.dto");
let DocumentController = class DocumentController {
    constructor(documentService) {
        this.documentService = documentService;
    }
    async createDocument(dto) {
        return await this.documentService.createDocument(dto);
    }
    async singleDocument(id) {
        return await this.documentService.getSingleDocument(id);
    }
    async updateDocument(updateDocDto, id) {
        return await this.documentService.updateDocument(id, updateDocDto);
    }
    async shareDocument(shareDocDto) {
        return await this.documentService.shareDocument(shareDocDto);
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [docs_dto_1.CreateDataDto]),
    __metadata("design:returntype", Promise)
], DocumentController.prototype, "createDocument", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DocumentController.prototype, "singleDocument", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Patch)('/update/:id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updateDoc_dto_1.UpdateDocDto, String]),
    __metadata("design:returntype", Promise)
], DocumentController.prototype, "updateDocument", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Post)('/share'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [shareDoc_dto_1.ShareDocumentDto]),
    __metadata("design:returntype", Promise)
], DocumentController.prototype, "shareDocument", null);
DocumentController = __decorate([
    (0, common_1.Controller)('document'),
    __metadata("design:paramtypes", [document_service_1.DocumentService])
], DocumentController);
exports.DocumentController = DocumentController;
//# sourceMappingURL=document.controller.js.map