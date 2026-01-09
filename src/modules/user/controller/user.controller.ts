import { Body, Controller, Post } from '@nestjs/common';
import { ResponseCreateUserDto } from '@user/dto/response';
import { CreateUserDto } from '@user/dto/request';
import { CreateUserService } from '@user/use-case';

@Controller('user')
export class UserController {
	constructor(private readonly createUserService: CreateUserService) {}

	@Post()
	createUser(@Body() createUserDto: CreateUserDto): ResponseCreateUserDto | null {
		return this.createUserService.execute(createUserDto);
	}
}
