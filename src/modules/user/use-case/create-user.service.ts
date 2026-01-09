import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { IUser, USER_REPOSITORY } from '@src/modules/user/domain';
import { UserDto } from '@src/modules/user/dto';

@Injectable()
export class CreateUserService {
	constructor(@Inject(USER_REPOSITORY) private readonly userRepository: IUser) {}

	execute(userDto: UserDto): void {
		const user = this.userRepository.findOneByEmail(userDto.email);
		if (user) {
			throw new ConflictException();
		}
	}
}
