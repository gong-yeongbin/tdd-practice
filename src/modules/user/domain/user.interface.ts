import { User } from '@src/modules/user/domain';
import { UserDto } from '@src/modules/user/dto';

export interface IUser {
	findOneByEmail(email: string): User | null;
	create(user: UserDto): User;
	update(user: UserDto): User;
	delete(id: number): boolean;
}
