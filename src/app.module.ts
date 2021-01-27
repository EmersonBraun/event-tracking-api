import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { mainConfig } from './config/main.config';
import { AuthModule } from './modules/auth/auth.module';
import { EventsModule } from './modules/events/events.module';
import { UsersModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(mainConfig),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_CONNECTION'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: true,
      }),
      inject: [ConfigService],
    }),
    EventsModule,
    UsersModule,
    AuthModule
  ],
})
export class AppModule {}
