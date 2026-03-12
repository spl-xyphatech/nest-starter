import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/shared/prisma/prisma.module';
import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';

@Module({
  controllers: [TagsController],
  providers: [TagsService],
  imports: [PrismaModule],
})
export class TagsModule {}
