import { Prisma, User as PrismaUser } from '@prisma/client';

import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Student } from '@/domain/forum/enterprise/entities/student';

export class PrismaStudentMapper {
  public static toDomain(raw: PrismaUser): Student {
    return Student.create(
      {
        name: raw.name,
        email: raw.email,
        password: raw.password,
      },
      new UniqueEntityID(raw.id),
    );
  }

  public static toPrisma(student: Student): Prisma.UserUncheckedCreateInput {
    return {
      id: student.id.toString(),
      name: student.name,
      email: student.email,
      password: student.password,
    };
  }
}
