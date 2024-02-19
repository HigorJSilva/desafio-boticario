import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { databaseProviders } from './shared/database/ormconfig';

@Module({
  imports: [ConfigModule.forRoot(), ...databaseProviders],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
