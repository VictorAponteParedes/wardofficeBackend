// src/config/env.config.ts
import { plainToInstance } from 'class-transformer';
import {
    IsString,
    IsNumber,
    IsPort,
    validateSync,
    IsNotEmpty,
} from 'class-validator';

class EnvironmentVariables {
    @IsString()
    @IsNotEmpty()
    DB_HOST: string;

    @IsPort()
    DB_PORT: string;

    @IsString()
    @IsNotEmpty()
    DB_USERNAME: string;

    @IsString()
    @IsNotEmpty()
    DB_PASSWORD: string;

    @IsString()
    @IsNotEmpty()
    DB_NAME: string;

    @IsNumber()
    APP_PORT: number;

    @IsString()
    @IsNotEmpty()
    APP_PREFIX: string;

    @IsString()
    @IsNotEmpty()
    JWT_SECRET: string;

    @IsString()
    @IsNotEmpty()
    JWT_EXPIRES_IN: string;
}

export function validate(config: Record<string, any>) {
    const finalConfig = plainToInstance(EnvironmentVariables, config, {
        enableImplicitConversion: true,
    });

    const errors = validateSync(finalConfig, { skipMissingProperties: false });

    if (errors.length > 0) {
        throw new Error(`Validación de .env falló: ${errors.toString()}`);
    }

    return finalConfig;
}