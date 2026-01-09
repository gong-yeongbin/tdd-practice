import { Body, Controller, Post } from '@nestjs/common';
import { ResponseCreateUserDto } from '../dto/response';
import { CreateUserDto } from '../dto/request';
import { CreateUserService } from '../use-case';

@Controller('user')
export class UserController {
	constructor(private readonly createUserService: CreateUserService) {}

	@Post()
	createUser(@Body() createUserDto: CreateUserDto): ResponseCreateUserDto | null {
		return this.createUserService.execute(createUserDto);
	}
}
