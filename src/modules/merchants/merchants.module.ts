import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/shared/prisma/prisma.module';
import { MerchantsController } from './merchants.controller';
import { MerchantsService } from './merchants.service';

@Module({
  controllers: [MerchantsController],
  providers: [MerchantsService],
  imports: [PrismaModule],
})
export class MerchantsModule {}
