import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Prisma } from 'generated/prisma/client';

export class QueryTestDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  search: string;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  limit: number = 10;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  offset: number;

  @IsOptional()
  @ApiPropertyOptional()
  @Transform((params) => JSON.parse(params.value))
  orderby?: Prisma.TestOrderByWithRelationInput;
}
