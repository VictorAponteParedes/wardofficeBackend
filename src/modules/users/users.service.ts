// src/modules/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) { }

    // 1. Buscar por email (para login)
    async findByEmail(email: string): Promise<User | null> {
        return this.usersRepository.findOne({ where: { email } });
    }

    // 2. Buscar por ID (para change-password y futuros guards)
    async findById(id: string): Promise<User | null> {
        return this.usersRepository.findOne({ where: { id } });
    }

    // 3. Crear usuario (lo vas a usar manualmente o con script)
    async createUser(
        email: string,
        password: string,
        role: string = 'user',
    ): Promise<User> {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = this.usersRepository.create({
            email,
            password: hashedPassword,
            role,
            isActive: true,
        });
        return this.usersRepository.save(user);
    }

    // 4. Actualizar contraseña
    async updatePassword(userId: string, newPassword: string): Promise<void> {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await this.usersRepository.update(userId, { password: hashedPassword });
    }
}