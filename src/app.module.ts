import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
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
import { MailerModule } from './modules/mailer/mailer.module';
import { ShoppingCartModule } from './modules/shopping-cart/shopping-cart.module';
import { CategoryModule } from './modules/category/category.module';
import { AccountActivatedGuard } from './common/guards/account-activated.guard';
import { PaymentModule } from './modules/payment/payment.module';
import { PaymentToken } from './modules/payment/interfaces/payment-options.interface';

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
  OrderModule,
  MailerModule.forRoot({
    transport : {
      host : process.env.EMAIL_HOST,
      port : Number(process.env.EMAIL_PORT),
      auth : {
        user : process.env.EMAIL_USERNAME,
        pass : process.env.EMAIL_PASSWORD,
      }
    }
  }),
  PaymentModule.forRootAsync({
      imports : [ConfigModule],
      useFactory : async (configService : ConfigService) => ({
        receiverWalletId : configService.get<string>("KONNECT_WALLET_KEY"),
        apiKey : configService.get<string>("KONNECT_API_KEY"),
        options : {
          token : PaymentToken.TND,
          silentWebhook : true,
          webhook : configService.get<string>("BACKEND_URL") + "order/payment-success",
          addPaymentFeesToAmount : true,
          theme : 'dark',
        }
      }),
      inject:[ConfigService],
  }),
  ShoppingCartModule,
  CategoryModule
],
  controllers: [AppController],
  providers: [
    AppService,
    JwtAuthGuard,
    RolesGuard,
    PoliciesGuard,
    AccountActivatedGuard,
    {
      provide : APP_GUARD,
      useClass : AuthCompositeGuard,
    }
  ],
})
export class AppModule {}
