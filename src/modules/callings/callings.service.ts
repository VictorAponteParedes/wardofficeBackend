import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCallingDto } from './dto/create-calling.dto';
import { UpdateCallingDto } from './dto/update-calling.dto';
import { Calling } from './entities/calling.entity';

@Injectable()
export class CallingsService {
    constructor(
        @InjectRepository(Calling)
        private readonly callingRepository: Repository<Calling>,
    ) { }

    async create(createCallingDto: CreateCallingDto): Promise<Calling> {
        const calling = this.callingRepository.create(createCallingDto);
        return await this.callingRepository.save(calling);
    }

    async findAll(): Promise<Calling[]> {
        return await this.callingRepository.find({ relations: ['user'] });
    }

    async findOne(id: string): Promise<Calling> {
        const calling = await this.callingRepository.findOne({
            where: { id },
            relations: ['user'],
        });
        if (!calling) {
            throw new NotFoundException(`Calling with ID ${id} not found`);
        }
        return calling;
    }

    async update(id: string, updateCallingDto: UpdateCallingDto): Promise<Calling> {
        const calling = await this.findOne(id);
        this.callingRepository.merge(calling, updateCallingDto);
        return await this.callingRepository.save(calling);
    }

    async remove(id: string): Promise<void> {
        const calling = await this.findOne(id);
        await this.callingRepository.remove(calling);
    }
}
