import { Module } from '@nestjs/common';
import { HealthCheckModule } from './modules/healthcheck/healthcheck.module';

@Module({
  imports: [HealthCheckModule],
})
export class AppModule {}
