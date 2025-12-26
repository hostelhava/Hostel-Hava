import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AuthService {
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }

    static get parameters() {
        return [PrismaService, JwtService];
    }

    async validateAdmin(email, password) {
        const admin = await this.prisma.admin.findUnique({
            where: { email },
        });

        if (!admin) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(password, admin.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const { password: _, ...adminWithoutPassword } = admin;
        return adminWithoutPassword;
    }

    async login(admin) {
        const payload = {
            sub: admin.id,
            email: admin.email,
        };

        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
