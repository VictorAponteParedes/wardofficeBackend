import { PartialType } from '@nestjs/mapped-types';
import { CreateCallingDto } from './create-calling.dto';

export class UpdateCallingDto extends PartialType(CreateCallingDto) { }
