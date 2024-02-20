import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiTags,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  IApiUnauthorizedResponse,
  UserExamples,
  UserProfileResponse,
} from 'src/shared/interfaces/swagger-schemas';

@Controller()
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOkResponse({
    schema: {
      example: {
        access_token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJvdGljYXJpbyIsInN1YiI6MSwiaWF0IjoxNzA4Mzg4MjYxLCJleHAiOjE3MDg5OTMwNjF9.aYS6ynKW97bH-BaoFC25Lgiu7iPo_RLBcvWfTjne1J0',
      },
    },
  })
  @ApiUnauthorizedResponse(IApiUnauthorizedResponse)
  @ApiBody(UserExamples)
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @ApiOkResponse(UserProfileResponse)
  @ApiUnauthorizedResponse(IApiUnauthorizedResponse)
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
