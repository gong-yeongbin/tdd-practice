import { User } from '@user/domain';
import { UserDto } from '@user/dto';

export interface IUser {
	findOneById(id: number): User | null;
	findOneByEmail(email: string): User | null;
	create(user: UserDto): User | null;
	update(user: UserDto): User;
	delete(id: number): boolean;
}
