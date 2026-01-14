import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ResponseCreateUserDto, ResponseGetUserDto, ResponseUpdateUserDto } from '@user/dto/response';
import { CreateUserDto, UpdateUserDto } from '@user/dto/request';
import { CreateUserService, GetUserService, UpdateUserService } from '@user/use-case';

@Controller('user')
export class UserController {
	constructor(
		private readonly createUserService: CreateUserService,
		private readonly updateUserService: UpdateUserService,
		private readonly getUserService: GetUserService
	) {}

	@Post()
	createUser(@Body() createUserDto: CreateUserDto): ResponseCreateUserDto | null {
		return this.createUserService.execute(createUserDto);
	}

	@Patch()
	updateUser(@Body() updateUserDto: UpdateUserDto): ResponseUpdateUserDto | null {
		return this.updateUserService.execute(updateUserDto);
	}

	@Get()
	getUser(@Param('id') id: number): ResponseGetUserDto {
		return this.getUserService.execute(id);
	}
}
