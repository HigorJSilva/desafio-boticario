import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { AddressModule } from './address/address.module';
import { ClientModule } from './client/client.module';
import { OrderModule } from './order/order.module';

@Module({ imports: [AuthModule, CategoryModule, UsersModule, AddressModule, ClientModule, OrderModule] })

export class ResourcesModule {}
