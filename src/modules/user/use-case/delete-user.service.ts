import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IUser, USER_REPOSITORY } from '@user/domain';

@Injectable()
export class DeleteUserService {
	constructor(@Inject(USER_REPOSITORY) private readonly userRepository: IUser) {}

	execute(id: number): void {
		const user = this.userRepository.findOneById(id);
		if (!user) {
			throw new NotFoundException('User not found');
		}
		this.userRepository.delete(id);
	}
}
