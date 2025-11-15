import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit(): Promise<void> {
    await this.$connect();
    console.log('Prisma connected to MongoDB Atlas');
  }

  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
    console.log('Prisma disconnected from MongoDB Atlas');
  }
}
