import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { IUser, USER_REPOSITORY } from '@user/domain';
import { ResponseCreateUserDto } from '@user/dto/response';
import { CreateUserDto } from '@user/dto/request';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class CreateUserService {
	constructor(@Inject(USER_REPOSITORY) private readonly userRepository: IUser) {}

	execute(userDto: CreateUserDto): ResponseCreateUserDto {
		const user = this.userRepository.findOneByEmail(userDto.email);
		if (user) {
			throw new ConflictException();
		}

		const createUser = this.userRepository.create(userDto);
		return plainToInstance(ResponseCreateUserDto, createUser);
	}
}
