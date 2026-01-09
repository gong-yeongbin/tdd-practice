import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { IUser, User } from '@user/domain';
import { UserDto } from '@user/dto';

@Injectable()
export class UserRepository implements IUser {
	private readonly users: User[] = [];

	findOneByEmail(email: string): User | null {
		const findUser = this.users.find((u) => u.email === email);
		if (!findUser) {
			return null;
		}
		return findUser;
	}

	update(user: UserDto): User {
		const findIndex = this.users.findIndex((u) => u.email === user.email);
		if (findIndex === -1) {
			throw new NotFoundException();
		} else {
			this.users[findIndex].email = user.email;
			this.users[findIndex].password = user.password;
			return this.users[findIndex];
		}
	}

	delete(id: number): boolean {
		const findIndex: number = this.users.findIndex((u) => u.id === id);
		if (findIndex === -1) {
			throw new NotFoundException();
		} else {
			this.users.splice(findIndex, 1);
		}
		return true;
	}

	create(user: UserDto): User | null {
		const findUser = this.users.find((u) => u.email === user.email);
		if (!findUser) {
			const createUser: User = { id: this.users.length + 1, ...user, created_date: new Date() };
			this.users.push(createUser);
			return createUser;
		}

		return null;
	}
}
