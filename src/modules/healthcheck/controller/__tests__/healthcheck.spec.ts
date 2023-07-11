import { Test, TestingModule } from '@nestjs/testing';
import { HealthCheckController } from './../../controller/healthcheck.controller';

describe('HealthCheckController | UnitTest', () => {
  let healthCheckController: HealthCheckController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [HealthCheckController],
    }).compile();

    healthCheckController = app.get<HealthCheckController>(
      HealthCheckController,
    );
  });

  describe('when checking application health', () => {
    it('returns healthy response', async () => {
      const mockedResponse = { status: 'UP' };
      const response = await healthCheckController.healthCheck();

      expect(response).toStrictEqual(mockedResponse);
    });
  });
});
