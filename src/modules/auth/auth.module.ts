import { Logger, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/shared/prisma/prisma.module';
import { RolesModule } from '../roles/roles.module';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [Logger, AuthService],
  imports: [
    // HttpModule,
    JwtModule.register({
      global: true,
    }),
    PrismaModule,
    RolesModule,
    UsersModule,
  ],
})
export class AuthModule {}
