import { Controller, Post, Request, UnauthorizedException, Bind, Dependencies } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
@Dependencies(AuthService)
export class AuthController {
    constructor(authService) {
        this.authService = authService;
    }

    @Post('login')
    @Bind(Request())
    async login(req) {
        const loginDto = req.body;

        if (!loginDto || !loginDto.email || !loginDto.password) {
            throw new UnauthorizedException('Email and password are required');
        }

        const admin = await this.authService.validateAdmin(
            loginDto.email,
            loginDto.password,
        );

        if (!admin) {
            throw new UnauthorizedException('Invalid credentials');
        }

        return this.authService.login(admin);
    }
}
