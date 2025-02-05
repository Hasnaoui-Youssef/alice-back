import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule, JwtService } from "@nestjs/jwt";

@Module({
  imports : [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_REFRESH_SECRET'),
        signOptions: { expiresIn: configService.get<string>('JWT_REFRESH_EXPIRATION', '1d') },
      }),
      inject: [ConfigService],
    }),
  ],
  providers : [{
    provide : "jwtRefreshService",
    useExisting : JwtService,
  }],
  exports : ["jwtRefreshService"]
})
export class JwtRefreshModule{}