import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { ValueObject } from '@/core/entities/value-object';

export interface CommentWithAuthorProps {
  commentId: UniqueEntityID;
  content: string;
  authorId: UniqueEntityID;
  author: string;
  createdAt: Date;
  updatedAt?: Date | null;
}

export class CommentWithAuthor extends ValueObject<CommentWithAuthorProps> {
  public static create(props: CommentWithAuthorProps) {
    return new CommentWithAuthor(props);
  }

  public get commentId() {
    return this.props.commentId;
  }

  public get content() {
    return this.props.content;
  }

  public get authorId() {
    return this.props.authorId;
  }

  public get author() {
    return this.props.author;
  }

  public get createdAt() {
    return this.props.createdAt;
  }

  public get updatedAt() {
    return this.props.updatedAt;
  }
}
