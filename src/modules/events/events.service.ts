import { Injectable } from '@nestjs/common';
import { Event } from 'generated/prisma/client';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { CreateEventDto } from './dto/create-event.dto';
import { QueryEventDto } from './dto/query-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateEventDto): Promise<Event> {
    return this.prisma.event.create({ data });
  }

  async findAll(query: QueryEventDto) {
    const where = { deletedAt: null };

    const total = await this.prisma.event.count({ where });
    const data = await this.prisma.event.findMany({
      where,
      take: query?.limit,
      skip: query?.offset,
      orderBy: query?.orderby,
    });

    return { data, total };
  }

  async findOne(id: string): Promise<Event> {
    return this.prisma.event.findUniqueOrThrow({
      where: { id, deletedAt: null },
    });
  }

  async update(id: string, data: UpdateEventDto) {
    return this.prisma.event.update({
      where: { id, deletedAt: null },
      data,
    });
  }

  async remove(id: string): Promise<Event> {
    return this.prisma.event.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
