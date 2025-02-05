import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule, JwtService } from "@nestjs/jwt";

@Module({
  imports : [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRATION', '1d') },
      }),
      inject: [ConfigService],
    }),
  ],
  providers : [{
    provide : "jwtAccessService",
    useExisting : JwtService,
  }],
  exports : ["jwtAccessService"]
})
export class JwtAccessModule{}