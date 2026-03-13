import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Response } from 'express';
import { Prisma } from 'generated/prisma/client';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    console.error(exception.message);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const error = exception.meta?.driverAdapterError as any;
    const errorMessage = exception.message.replace(/\n/g, '');

    console.log('exception :>> ', exception);
    console.log('exception.code :>> ', exception.code);
    switch (exception.code) {
      case 'P2002': {
        const fields = error.cause?.constraint?.fields;
        console.log('fields :>> ', fields);
        const fieldName = fields
          ? Array.isArray(fields)
            ? fields.join(', ')
            : fields
          : 'unknown field';
        const message = fieldName
          ? `${fieldName} already exists`
          : 'Unique constraint failed';
        const statusCode = HttpStatus.CONFLICT;
        response.status(statusCode).json({
          statusCode,
          message,
          errorMessage,
        });
        break;
      }
      case 'P2025': {
        const statusCode = HttpStatus.BAD_REQUEST;
        response.status(statusCode).json({
          statusCode,
          message: 'Invalid ID or record not found',
          errorMessage,
        });
        break;
      }

      default:
        // default 500 error code
        super.catch(exception, host);
        break;
    }
  }
}
