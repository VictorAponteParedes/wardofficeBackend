import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Topic } from './entities/topic.entity';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';

@Injectable()
export class TopicsService {
    constructor(
        @InjectRepository(Topic)
        private topicsRepository: Repository<Topic>,
    ) { }

    create(createTopicDto: CreateTopicDto) {
        const topic = this.topicsRepository.create(createTopicDto);
        return this.topicsRepository.save(topic);
    }

    findAll() {
        return this.topicsRepository.find();
    }

    async findOne(id: string) {
        const topic = await this.topicsRepository.findOneBy({ id });
        if (!topic) {
            throw new NotFoundException(`Topic with ID ${id} not found`);
        }
        return topic;
    }

    async update(id: string, updateTopicDto: UpdateTopicDto) {
        const topic = await this.findOne(id);
        const updatedTopic = Object.assign(topic, updateTopicDto);
        return this.topicsRepository.save(updatedTopic);
    }

    async remove(id: string) {
        const topic = await this.findOne(id);
        return this.topicsRepository.remove(topic);
    }
}
