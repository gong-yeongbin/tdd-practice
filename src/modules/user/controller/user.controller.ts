import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ResponseCreateUserDto, ResponseGetUserDto, ResponseUpdateUserDto } from '@user/dto/response';
import { CreateUserDto, UpdateUserDto } from '@user/dto/request';
import { CreateUserService, DeleteUserService, GetUserService, UpdateUserService } from '@user/use-case';

@Controller('user')
export class UserController {
	constructor(
		private readonly createUserService: CreateUserService,
		private readonly updateUserService: UpdateUserService,
		private readonly getUserService: GetUserService,
		private readonly deleteUserService: DeleteUserService
	) {}

	@Post()
	createUser(@Body() createUserDto: CreateUserDto): ResponseCreateUserDto {
		return this.createUserService.execute(createUserDto);
	}

	@Patch()
	updateUser(@Body() updateUserDto: UpdateUserDto): ResponseUpdateUserDto {
		return this.updateUserService.execute(updateUserDto);
	}

	@Get(':id')
	getUser(@Param('id') id: number): ResponseGetUserDto {
		return this.getUserService.execute(id);
	}

	@Delete(':id')
	deleteUser(@Param('id') id: number): void {
		return this.deleteUserService.execute(id);
	}
}
