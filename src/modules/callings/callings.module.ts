import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CallingsService } from './callings.service';
import { CallingsController } from './callings.controller';
import { Calling } from './entities/calling.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Calling])],
    controllers: [CallingsController],
    providers: [CallingsService],
})
export class CallingsModule { }
