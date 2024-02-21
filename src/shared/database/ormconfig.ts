import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
export const databaseProviders = [
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
      type: 'mysql',
      host: configService.get('MYSQL_HOST'),
      port: +configService.get<number>('MYSQL_PORT'),
      username: configService.get('MYSQL_USER'),
      password: configService.get('MYSQL_PASSWORD'),
      database: configService.get('MYSQL_DATABASE'),
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: false,
    }),
  }),
];
