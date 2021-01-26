import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { mainConfig } from './config/main.config';
import { EventsModule } from './events/events.module';
import { UsersModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(mainConfig),
    EventsModule,
    UsersModule,
    AuthModule
  ],
})
export class AppModule {}
