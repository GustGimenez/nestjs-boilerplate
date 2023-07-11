import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {
  SWAGGER_BASE_PATH_PRD,
  SWAGGER_BASE_PATH_QA,
  SWAGGER_DESCRIPTION,
  SWAGGER_TITLE,
  SWAGGER_URL,
} from './swagger.constant';

export const setupSwagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle(SWAGGER_TITLE)
    .setDescription(SWAGGER_DESCRIPTION)
    .addServer(SWAGGER_BASE_PATH_QA, 'Homologação')
    .addServer(SWAGGER_BASE_PATH_PRD, 'Produção')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup(SWAGGER_URL, app, document);
};
