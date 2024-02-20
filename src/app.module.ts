import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { databaseProviders } from './shared/database/ormconfig';
import { ResourcesModule } from './resources/resources.module';

@Module({
  imports: [ConfigModule.forRoot(), ...databaseProviders, ResourcesModule],
})
export class AppModule {}
