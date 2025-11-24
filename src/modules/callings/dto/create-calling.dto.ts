import { IsBoolean, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateCallingDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    organization: string;

    @IsUUID()
    @IsNotEmpty()
    userId: string;

    @IsBoolean()
    @IsOptional()
    isActive?: boolean;
}
