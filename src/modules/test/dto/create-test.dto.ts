import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateTestDto {
  @ApiProperty({
    example: 'Test Name',
    description: 'The name of the Test',
    minLength: 1,
    maxLength: 255,
  })
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  name: string;

  @ApiProperty({
    example: 'T0001',
    description: 'Test code',
    minLength: 3,
    maxLength: 20,
  })
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  code: string;

  @ApiProperty({
    example: 'A detailed description of the Test',
    description: 'The description of the Test',
    minLength: 1,
    maxLength: 1000,
  })
  @IsString()
  @IsOptional()
  @MinLength(1)
  @MaxLength(1000)
  description?: string;
}
