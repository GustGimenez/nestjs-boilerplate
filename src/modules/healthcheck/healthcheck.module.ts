import { Module } from '@nestjs/common';
import { HealthCheckController } from './controller/healthcheck.controller';

@Module({ controllers: [HealthCheckController] })
export class HealthCheckModule {}
