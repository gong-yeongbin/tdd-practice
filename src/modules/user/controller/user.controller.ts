import { Body, Controller, Patch, Post } from '@nestjs/common';
import { ResponseCreateUserDto, ResponseUpdateUserDto } from '@user/dto/response';
import { CreateUserDto, UpdateUserDto } from '@user/dto/request';
import { CreateUserService, UpdateUserService } from '@user/use-case';

@Controller('user')
export class UserController {
	constructor(
		private readonly createUserService: CreateUserService,
		private readonly updateUserService: UpdateUserService
	) {}

	@Post()
	createUser(@Body() createUserDto: CreateUserDto): ResponseCreateUserDto | null {
		return this.createUserService.execute(createUserDto);
	}

	@Patch()
	updateUser(@Body() updateUserDto: UpdateUserDto): ResponseUpdateUserDto | null {
		return this.updateUserService.execute(updateUserDto);
	}
}
