import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';

import { AuthService } from './auth.service.js';
import { SignInDto } from './dto/sign-in.dto.js';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('sign-in')
  async signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(
      signInDto.username,
      signInDto.password,
    );
  }

  @Post('refresh')
  async refreshToken(
    @Body() body: { refreshToken: string },
  ) {

      console.log('BODY:', body);
  console.log('REFRESH TOKEN:', body.refreshToken);


    return this.authService.refreshToken(
      body.refreshToken,
    );
  }
}