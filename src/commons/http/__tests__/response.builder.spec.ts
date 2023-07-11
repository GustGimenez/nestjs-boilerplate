import { getMockRes } from '@jest-mock/express';
import { HttpStatus } from '@nestjs/common';
import {
  createdResponse,
  emptyOrSuccessResponse,
  emptyResponse,
  successResponse,
} from '../response.builder';

const { res: response } = getMockRes();

const mockResult = {
  id: 'abc-123',
  name: 'mocked name',
};

describe('ResponseBuilder | UnitTest', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('when building successful response', () => {
    beforeEach(() => successResponse(response, mockResult));

    it('returns http status 200', () => {
      expect(response.status).toHaveBeenCalled();
      expect(response.status).toHaveBeenCalledWith(HttpStatus.OK);
    });

    it('returns sends result as json', () => {
      expect(response.json).toHaveBeenCalled();
      expect(response.json).toHaveBeenCalledWith(mockResult);
    });
  });

  describe('when building no content response', () => {
    beforeEach(() => emptyResponse(response));

    it('returns http status 204', () => {
      expect(response.status).toHaveBeenCalled();
      expect(response.status).toHaveBeenCalledWith(HttpStatus.NO_CONTENT);
    });

    it('does not send any result', () => {
      expect(response.json).not.toHaveBeenCalled();
    });
  });

  describe('when building created response', () => {
    describe('and there is data to be returned', () => {
      const data = { mock: 'mock' };

      beforeEach(() => createdResponse(response, data));

      it('returns http status 201', () => {
        expect(response.status).toHaveBeenCalled();
        expect(response.status).toHaveBeenCalledWith(HttpStatus.CREATED);
      });

      it('sends the data', () => {
        expect(response.json).toHaveBeenCalledWith(data);
      });
    });

    describe('and there is no data to be returned', () => {
      beforeEach(() => createdResponse(response));

      it('returns http status 201', () => {
        expect(response.status).toHaveBeenCalled();
        expect(response.status).toHaveBeenCalledWith(HttpStatus.CREATED);
      });

      it('does not send any result', () => {
        expect(response.json).not.toHaveBeenCalled();
      });
    });
  });

  describe('when building empty or success response', () => {
    describe('and the response is empty', () => {
      beforeEach(() => emptyOrSuccessResponse(response, null));

      it('returns http status 204', () => {
        expect(response.status).toHaveBeenCalled();
        expect(response.status).toHaveBeenCalledWith(HttpStatus.NO_CONTENT);
      });

      it('does not send any result', () => {
        expect(response.json).not.toHaveBeenCalled();
      });
    });

    describe('and the response is not empty', () => {
      beforeEach(() => emptyOrSuccessResponse(response, mockResult));

      it('returns http status 200', () => {
        expect(response.status).toHaveBeenCalled();
        expect(response.status).toHaveBeenCalledWith(HttpStatus.OK);
      });

      it('returns sends result as json', () => {
        expect(response.json).toHaveBeenCalled();
        expect(response.json).toHaveBeenCalledWith(mockResult);
      });
    });
  });
});
