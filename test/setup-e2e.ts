import 'dotenv/config';

import { randomUUID } from 'node:crypto';
import { execSync } from 'node:child_process';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

if (!process.env.DATABASE_URL) {
  throw new Error('Please provide a DATABASE_URL environment variable');
}

function generateUniqueDatabaseUrl(schemaId: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('Please provide a DATABASE_URL environment variable');
  }

  const url = new URL(process.env.DATABASE_URL);

  url.searchParams.set('schema', schemaId);

  return url.toString();
}

const schemaId = randomUUID();

beforeAll(async () => {
  const databaseUrl = generateUniqueDatabaseUrl(schemaId);

  process.env.DATABASE_URL = databaseUrl;

  execSync('npx prisma migrate deploy');
});

afterAll(async () => {
  await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schemaId}" CASCADE`);
  await prisma.$disconnect();
});
