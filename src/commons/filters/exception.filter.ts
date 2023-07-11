import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  ForbiddenException,
  HttpStatus,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Response } from 'express';
import { DefaultError } from '../errors';
import {
  FORBIDDEN_MESSAGE,
  MESSAGE_FIELD,
  NOT_FOUND_MESSAGE,
  UNAUTHORIZED_MESSAGE,
} from './exception.constant';

interface ErrorResponse {
  status: number;
  message: string;
}

@Catch()
export class AppExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const res = context.getResponse<Response>();

    const errorResponse = this.buildErrorResponse(exception);

    res.status(errorResponse.status);
    res.json({ message: errorResponse.message });
  }

  private buildErrorResponse(exception: Error): ErrorResponse {
    if (exception instanceof DefaultError) {
      return {
        status: exception.getStatus(),
        message: exception.message,
      };
    }

    if (exception instanceof UnprocessableEntityException) {
      return {
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        message: exception.getResponse()[MESSAGE_FIELD][0],
      };
    }

    if (exception instanceof UnauthorizedException) {
      return {
        status: exception.getStatus(),
        message: UNAUTHORIZED_MESSAGE,
      };
    }

    if (exception instanceof ForbiddenException) {
      return {
        status: exception.getStatus(),
        message: FORBIDDEN_MESSAGE,
      };
    }

    if (exception instanceof NotFoundException) {
      return {
        status: exception.getStatus(),
        message: NOT_FOUND_MESSAGE,
      };
    }

    return {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: exception.message,
    };
  }
}
