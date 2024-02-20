import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { databaseProviders } from './shared/database/ormconfig';
import { ResourcesModule } from './resources/resources.module';

@Module({
  imports: [ConfigModule.forRoot(), ...databaseProviders, ResourcesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
