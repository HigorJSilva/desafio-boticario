import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';

@Module({ imports: [AuthModule, CategoryModule, UsersModule] })

export class ResourcesModule {}
