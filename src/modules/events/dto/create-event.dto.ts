import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { EventStatus } from 'generated/prisma/client';

export class CreateEventDto {
  @ApiProperty({
    example: 'Weekend Sale',
    description: 'The title of the Event',
    minLength: 1,
    maxLength: 256,
  })
  @IsString()
  @MinLength(1)
  @MaxLength(256)
  title: string;

  @ApiPropertyOptional({
    example: 'Special discounts for weekend customers',
    description: 'The description of the Event',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    example: 100,
    description: 'The total quantity for the Event',
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  totalQty: number;

  @ApiPropertyOptional({
    example: 0,
    description: 'The claimed quantity for the Event',
  })
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @IsOptional()
  claimedQty?: number;

  @ApiPropertyOptional({
    example: 1,
    description: 'The per-user claim limit for the Event',
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  perUserLimit?: number;

  @ApiProperty({
    example: '2026-03-01T00:00:00.000Z',
    description: 'The start date/time of the Event',
  })
  @IsDateString()
  startAt: string;

  @ApiProperty({
    example: '2026-03-31T23:59:59.000Z',
    description: 'The expiration date/time of the Event',
  })
  @IsDateString()
  expiredAt: string;

  @ApiPropertyOptional({
    example: 'ACTIVE',
    description: 'The status of the Event',
    enum: EventStatus,
  })
  @IsEnum(EventStatus)
  @IsOptional()
  status?: EventStatus;

  @ApiPropertyOptional({
    example: false,
    description: 'Whether the event is created by admin',
  })
  @IsBoolean()
  @IsOptional()
  isAdminEvent?: boolean;
}
