// src/modules/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }

    async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
        const user = await this.usersService.findByEmail(loginDto.email);
        if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
            throw new UnauthorizedException('Credenciales inválidas');
        }
        const payload = { email: user.email, sub: user.id, role: user.role };
        return { accessToken: this.jwtService.sign(payload) };
    }

    async changePassword(userId: string, dto: ChangePasswordDto): Promise<void> {
        const user = await this.usersService.findById(userId);
        if (!user || !(await bcrypt.compare(dto.oldPassword, user.password))) {
            throw new UnauthorizedException('Contraseña actual inválida');
        }

        await this.usersService.updatePassword(userId, dto.newPassword);
    }
}