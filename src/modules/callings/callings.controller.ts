import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CallingsService } from './callings.service';
import { CreateCallingDto } from './dto/create-calling.dto';
import { UpdateCallingDto } from './dto/update-calling.dto';

@Controller('callings')
export class CallingsController {
    constructor(private readonly callingsService: CallingsService) { }

    @Post()
    create(@Body() createCallingDto: CreateCallingDto) {
        return this.callingsService.create(createCallingDto);
    }

    @Get()
    findAll() {
        return this.callingsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.callingsService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateCallingDto: UpdateCallingDto) {
        return this.callingsService.update(id, updateCallingDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.callingsService.remove(id);
    }
}
