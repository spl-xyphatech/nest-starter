import { Injectable } from '@nestjs/common';
import { Coupon } from 'generated/prisma/client';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { QueryCouponDto } from './dto/query-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';

@Injectable()
export class CouponsService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateCouponDto): Promise<Coupon> {
    return this.prisma.coupon.create({ data });
  }

  async findAll(query: QueryCouponDto) {
    const where = { deletedAt: null };

    const total = await this.prisma.coupon.count({ where });
    const data = await this.prisma.coupon.findMany({
      where,
      take: query?.limit,
      skip: query?.offset,
      orderBy: query?.orderby,
    });

    return { data, total };
  }

  async findOne(id: string): Promise<Coupon> {
    return this.prisma.coupon.findUniqueOrThrow({
      where: { id, deletedAt: null },
    });
  }

  async update(id: string, data: UpdateCouponDto) {
    return this.prisma.coupon.update({
      where: { id, deletedAt: null },
      data,
    });
  }

  async remove(id: string): Promise<Coupon> {
    return this.prisma.coupon.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
