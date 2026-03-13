import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsUUID } from 'class-validator';
import { CouponStatus } from 'generated/prisma/client';

export class CreateCouponDto {
  @ApiProperty({
    example: 'de305d54-75b4-431b-adb2-eb6b9e546014',
    description: 'The event ID associated with the coupon',
  })
  @IsUUID()
  eventId: string;

  @ApiPropertyOptional({
    example: 'AVAILABLE',
    description: 'The status of the Coupon',
    enum: CouponStatus,
  })
  @IsEnum(CouponStatus)
  @IsOptional()
  status?: CouponStatus;
}
