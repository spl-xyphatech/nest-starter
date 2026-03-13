import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { IsPassword } from 'src/common/validators/is-password.validator';

export class ChangePasswordDto {
  @IsString()
  @ApiProperty({
    description: 'password',
  })
  password: string;

  @IsPassword()
  @ApiProperty({
    description: 'New password',
  })
  newPassword: string;
}
