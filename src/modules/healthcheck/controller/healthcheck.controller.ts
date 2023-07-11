import { Controller, Get } from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';
import { GET_HEALTH, PATH_ACTUATOR } from './../constants/routes.constant';

@Controller(PATH_ACTUATOR)
export class HealthCheckController {
  @Get(GET_HEALTH)
  @ApiExcludeEndpoint()
  async healthCheck() {
    return { status: 'UP' };
  }
}
