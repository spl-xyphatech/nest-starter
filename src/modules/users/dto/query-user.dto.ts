import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, IsUUID } from 'class-validator';
import { Prisma } from 'generated/prisma/client';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { getOrderBy } from 'src/common/utils/sort-order';

export class QueryUserDto extends PartialType(PaginationDto) {
  @ApiPropertyOptional({
    type: 'string',
  })
  @IsOptional()
  @Transform(({ value }) => getOrderBy(value))
  orderby?: Prisma.UserOrderByWithRelationInput;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  roleId?: string;
}
