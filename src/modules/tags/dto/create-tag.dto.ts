import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateTagDto {
  @ApiProperty({
    example: 'TAG001',
    description: 'The code of the Tag',
    minLength: 1,
    maxLength: 64,
  })
  @IsString()
  @MinLength(1)
  @MaxLength(64)
  code: string;

  @ApiProperty({
    example: 'Premium',
    description: 'The name of the Tag',
    minLength: 1,
    maxLength: 128,
  })
  @IsString()
  @MinLength(1)
  @MaxLength(128)
  name: string;

  @ApiProperty({
    example: 'A tag for premium products',
    description: 'The description of the Tag',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    example: true,
    description: 'Whether the tag is active',
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
