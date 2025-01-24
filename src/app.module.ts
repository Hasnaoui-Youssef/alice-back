import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { AuthCompositeGuard } from './common/guards/auth_composite.guard';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CaslModule } from './modules/casl/casl.module';
import { ProductModule } from './modules/product/product.module';
import { OrderModule } from './modules/order/order.module';
import { RolesGuard } from './common/guards/roles.guard';
import { PoliciesGuard } from './common/guards/check_policy.guard';

@Module({
  imports: [
  ConfigModule.forRoot({
    isGlobal : true,
  }),
  MongooseModule.forRoot(process.env.MONGO_URI),
  AuthModule,
  UsersModule,
  CaslModule,
  ProductModule,
  OrderModule
],
  controllers: [AppController],
  providers: [
    AppService,
    JwtAuthGuard,
    RolesGuard,
    PoliciesGuard,
    {
      provide : APP_GUARD,
      useClass : AuthCompositeGuard,
    }
  ],
})
export class AppModule {}
