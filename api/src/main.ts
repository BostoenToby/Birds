import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const port: number = +process.env.PORT|| 3003

  await app.listen(port)
  console.info(`🖐️\nWelcome to the server.\nVisit http://localhost:${port}/graphql`)
}
bootstrap()
