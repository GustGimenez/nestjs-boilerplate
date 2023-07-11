import { ApiProperty } from '@nestjs/swagger';

export class SwaggerError {
  @ApiProperty()
  message: string;
}
