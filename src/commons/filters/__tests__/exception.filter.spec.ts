import {
  ForbiddenException,
  HttpStatus,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import {
  FORBIDDEN_MESSAGE,
  NOT_FOUND_MESSAGE,
  UNAUTHORIZED_MESSAGE,
} from '../exception.constant';
import { AppExceptionFilter } from '../exception.filter';
import {
  MockException,
  mockArgumentsHost,
  mockResponse,
} from './__mocks__/excepiont.filter.mock';

const exceptionFilter = new AppExceptionFilter();
describe('AppExceptionFilter | UnitTest', () => {
  describe.each([
    {
      errorType: 'DefaultError',
      error: new MockException(),
      expectedStatus: HttpStatus.BAD_REQUEST,
      expectedMessage: 'mock error message',
    },
    {
      errorType: 'UnprocessableEntityException',
      error: new UnprocessableEntityException({
        message: ['mock validation error'],
      }),
      expectedStatus: HttpStatus.UNPROCESSABLE_ENTITY,
      expectedMessage: 'mock validation error',
    },
    {
      errorType: 'UnauthorizedException',
      error: new UnauthorizedException(),
      expectedStatus: HttpStatus.UNAUTHORIZED,
      expectedMessage: UNAUTHORIZED_MESSAGE,
    },
    {
      errorType: 'ForbiddenException',
      error: new ForbiddenException(),
      expectedStatus: HttpStatus.FORBIDDEN,
      expectedMessage: FORBIDDEN_MESSAGE,
    },
    {
      errorType: 'NotFoundException',
      error: new NotFoundException(),
      expectedStatus: HttpStatus.NOT_FOUND,
      expectedMessage: NOT_FOUND_MESSAGE,
    },
    {
      errorType: 'Error',
      error: new Error('unmapped error'),
      expectedStatus: HttpStatus.INTERNAL_SERVER_ERROR,
      expectedMessage: 'unmapped error',
    },
  ])(
    'when error is $errorType',
    ({ error, expectedStatus, expectedMessage }) => {
      beforeEach(() => {
        exceptionFilter.catch(error, mockArgumentsHost);
      });

      it(`returns http status ${expectedStatus}`, () => {
        expect(mockResponse.status).toHaveBeenCalled();
        expect(mockResponse.status).toHaveBeenCalledWith(expectedStatus);
      });

      it(`returns message '${expectedMessage}'`, () => {
        expect(mockResponse.json).toHaveBeenCalled();
        expect(mockResponse.json).toHaveBeenCalledWith({
          message: expectedMessage,
        });
      });
    },
  );
});
