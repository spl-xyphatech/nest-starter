import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    example: 'CAT001',
    description: 'The code of the Category',
    minLength: 1,
    maxLength: 64,
  })
  @IsString()
  @MinLength(1)
  @MaxLength(64)
  code: string;

  @ApiProperty({
    example: 'Food Type',
    description: 'The name of the Category',
    minLength: 1,
    maxLength: 128,
  })
  @IsString()
  @MinLength(1)
  @MaxLength(128)
  name: string;

  @ApiProperty({
    example: 'A category for food types',
    description: 'The description of the Category',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    example: true,
    description: 'Whether the category is active',
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
