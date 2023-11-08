import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { CommentWithAuthor } from '@/domain/forum/enterprise/entities/value-objects/comment-with-author';
import { Comment as PrismaComment, User as PrismaUser } from '@prisma/client';

type PrismaCommentWithAuthor = PrismaComment & {
  author: PrismaUser;
};

export class PrismaCommentWithAuthorMapper {
  public static toDomain(raw: PrismaCommentWithAuthor): CommentWithAuthor {
    return CommentWithAuthor.create({
      content: raw.content,
      authorId: new UniqueEntityID(raw.authorId),
      author: raw.author.name,
      commentId: new UniqueEntityID(raw.id),
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    });
  }
}
