import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from '@user/dto/request';
import { ResponseUpdateUserDto } from '@user/dto/response';
import { IUser, USER_REPOSITORY } from '@user/domain';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UpdateUserService {
	constructor(@Inject(USER_REPOSITORY) private readonly userRepository: IUser) {}

	execute(updateUserDto: UpdateUserDto): ResponseUpdateUserDto {
		const findUser = this.userRepository.findOneById(updateUserDto.id);
		if (!findUser) {
			throw new NotFoundException();
		}

		findUser.email = updateUserDto.email;
		findUser.password = updateUserDto.password;

		const updatedUser = this.userRepository.update(findUser);
		return plainToInstance(ResponseUpdateUserDto, updatedUser);
	}
}
