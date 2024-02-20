import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { AddressModule } from './address/address.module';

@Module({ imports: [AuthModule, CategoryModule, UsersModule, AddressModule] })

export class ResourcesModule {}
