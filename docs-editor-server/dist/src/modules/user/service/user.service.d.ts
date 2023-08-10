import { PrismaService } from '../../../database/prisma/service/prisma.service';
export declare class UserService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    userDetails(id: string): Promise<object>;
}
