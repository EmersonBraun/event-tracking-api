/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException, HttpStatus, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import { UserService } from '../../user/service/user.service';

@Injectable()
export class AuthService {
  private logger = new Logger('HTTP')
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const userData = await this.usersService.findByEmail(email);

    if (!userData) {
      throw new NotFoundException('User not found');    
    }
    
    const areEqual = await bcrypt.compare(pass, userData.password);
    if (!areEqual) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);    
    }

    const { password, ...user } = userData;
    return user

  }

  private _createToken(user: any): any {
    try {
      return this.jwtService.sign(user); 
    } catch (error) {
      this.logger.verbose(error)
      return error
    }
  } 

  async login({email, password}) {
    const user = await this.validateUser(email, password)
    const token = this._createToken(user)
    return { token, user }
  }

}