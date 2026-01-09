import { User } from '@user/domain';
import { UserDto } from '@user/dto';

export interface IUser {
	findOneByEmail(email: string): User | null;
	create(user: UserDto): User | null;
	update(user: UserDto): User;
	delete(id: number): boolean;
}
