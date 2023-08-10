import { CreateDataDto } from '../dto/docs.dto';
import { HttpException, Injectable } from '@nestjs/common';
import { UpdateDocDto } from '../dto/updateDoc.dto';
import { PrismaService } from '../../../database/prisma/service/prisma.service';
import { ShareDocumentDto } from '../dto/shareDoc.dto';
import { sendEmail } from '../../../utils/email/sendEmail';
import { htmlTemplate } from '../../../utils/email/emailTemplate';
import config from '../../../../config';

@Injectable()
export class DocumentService {
  constructor(private readonly prismaService: PrismaService) {}
  async createDocument(createDocument: CreateDataDto) {
    const { user_id } = createDocument;
    try {
      const user = await this.prismaService.users.findUnique({
        where: {
          id: user_id,
        },
      });
      if (!user) throw new HttpException('User not found', 404);

      const document = await this.prismaService.documents.create({
        data: {
          owner_id: user_id,
          title: 'untitled document',
        },
      });

      //create room for the doc created
      await this.prismaService.rooms.create({
        data: {
          documentsId: document.id,
          owner_id: user_id,
        },
      });

      return { data: document };
    } catch (err) {
      console.log(err);
      throw new HttpException('Error creating a document!', 501);
    }
  }

  async getSingleDocument(id: string) {
    try {
      const document = await this.prismaService.documents.findUnique({
        where: {
          id,
        },
        include: {
          doc_room: true,
        },
      });
      if (!document) throw new HttpException(`Document not found`, 404);

      return { data: document };
    } catch (err) {
      console.log(err.message);
      throw new HttpException(`Error fetching document ${err.message}`, 500);
    }
  }

  async updateDocument(id: string, updateDocument: UpdateDocDto) {
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
    } catch (err) {
      throw new HttpException('Error updating your document!', 500);
    }
  }

  async shareDocument(shareDto: ShareDocumentDto) {
    const { email, documentId } = shareDto;
    try {
      //check if user exist
      const user = await this.prismaService.users.findUnique({
        where: {
          email,
        },
      });

      if (!user)
        throw new HttpException(`User doesn't exist on this system`, 404);

      const room = await this.prismaService.rooms.findUnique({
        where: {
          documentsId: documentId,
        },
      });

      // add user id to permission

      await this.prismaService.rooms.update({
        where: {
          id: room?.id,
        },
        data: {
          permitted_users: [...room.permitted_users, user.id],
        },
      });

      //send email to invited user
      const link = `${config().app.client_url}/share_doc?doc_id=${documentId}`;
      const html = htmlTemplate(user.user_name, link);
      const emailDetails = {
        email,
        html,
      };

      await sendEmail(emailDetails);

      return { message: 'Email shared Successdully' };
    } catch (err) {
      throw new HttpException(`${err.message}`, 500);
    }
  }
}
