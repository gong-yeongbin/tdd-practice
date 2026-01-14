import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IUser, USER_REPOSITORY } from '@user/domain';
import { ResponseGetUserDto } from '@user/dto/response';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class GetUserService {
	constructor(@Inject(USER_REPOSITORY) private readonly userRepository: IUser) {}

	execute(id: number): ResponseGetUserDto {
		const user = this.userRepository.findOneById(id);
		if (!user) {
			throw new NotFoundException('User not found');
		}
		return plainToInstance(ResponseGetUserDto, user);
	}
}
