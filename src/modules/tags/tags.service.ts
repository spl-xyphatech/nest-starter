import { BadRequestException, Injectable } from '@nestjs/common';
import { Tag } from 'generated/prisma/client';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { QueryTagDto } from './dto/query-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';

@Injectable()
export class TagsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateTagDto): Promise<Tag> {
    if (data?.code) {
      const existingTag = await this.prisma.tag.findUnique({
        where: { code: data?.code },
      });
      if (existingTag) {
        throw new BadRequestException('Tag with this code already exists');
      }
    }
    return this.prisma.tag.create({ data });
  }

  async findAll(query: QueryTagDto) {
    const where = { deletedAt: null };

    const total = await this.prisma.tag.count({ where });
    const data = await this.prisma.tag.findMany({
      where,
      take: query?.limit,
      skip: query?.offset,
      orderBy: query?.orderby,
    });

    return { data, total };
  }

  async findOne(id: number): Promise<Tag> {
    const tag = await this.prisma.tag.findUnique({
      where: { id, deletedAt: null },
    });
    if (!tag) throw new BadRequestException('Tag not found');
    return tag;
  }

  async update(id: number, data: UpdateTagDto) {
    await this.findOne(id);
    return this.prisma.tag.update({
      where: { id, deletedAt: null },
      data,
    });
  }

  async remove(id: number): Promise<Tag> {
    await this.findOne(id);
    return this.prisma.tag.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
