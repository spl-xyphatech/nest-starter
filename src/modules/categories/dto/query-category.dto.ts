import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Prisma } from 'generated/prisma/client';
import { getOrderBy } from 'src/common/utils/sort-order';

export class QueryCategoryDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  select?: string;

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
  @Transform(({ value }) => getOrderBy(value))
  orderby?: Prisma.CategoryOrderByWithRelationInput;
}
