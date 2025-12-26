import { Controller, Post, Req, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(authService) {
        this.authService = authService;
    }

    static get parameters() {
        return [AuthService];
    }

    @Post('login')
    async login(@Req() req) {
        const loginDto = req.body;
        const admin = await this.authService.validateAdmin(
            loginDto.email,
            loginDto.password,
        );
        if (!admin) {
            throw new UnauthorizedException();
        }
        return this.authService.login(admin);
    }
}
