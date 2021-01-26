import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { mainConfig } from './config/main.config';
import { EventsModule } from './events/events.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(mainConfig),
    EventsModule,
    UserModule
  ],
})
export class AppModule {}
