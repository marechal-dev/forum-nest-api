import { Injectable } from '@nestjs/common';

import { StudentsRepository } from '@/domain/forum/application/repositories/students-repository';
import { Student } from '@/domain/forum/enterprise/entities/student';

import { PrismaService } from '../prisma.service';
import { PrismaStudentMapper } from '../mappers/prisma-student-mapper';

@Injectable()
export class PrismaStudentsRepository extends StudentsRepository {
  public constructor(private readonly prisma: PrismaService) {
    super();
  }

  public async create(student: Student): Promise<void> {
    const data = PrismaStudentMapper.toPrisma(student);

    await this.prisma.user.create({
      data,
    });
  }

  public async findByEmail(email: string): Promise<Student | null> {
    const student = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!student) {
      return null;
    }

    return PrismaStudentMapper.toDomain(student);
  }
}
