/* eslint-disable @typescript-eslint/no-var-requires */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './controller/user.controller';
import { User, UserSchema } from './schema/user.schema';
import { UserService } from './service/user.service';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      { 
        name: User.name, 
        useFactory: () => {
          const schema = UserSchema;
          schema.plugin(require('mongoose-autopopulate'));
          return schema;
        },
      }
    ])],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService]
})
export class UsersModule {}
