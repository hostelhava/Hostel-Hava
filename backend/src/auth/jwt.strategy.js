import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Dependencies } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma.service';

@Injectable()
@Dependencies(ConfigService, PrismaService)
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(configService, prisma) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('JWT_SECRET'),
        });
        this.prisma = prisma;
    }

    async validate(payload) {
        const admin = await this.prisma.admin.findUnique({
            where: { id: payload.sub },
        });

        if (!admin) return null;

        const { password, ...result } = admin;
        return result;
    }
}
