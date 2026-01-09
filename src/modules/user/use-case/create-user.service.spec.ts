import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException } from '@nestjs/common';
import { CreateUserService } from '@src/modules/user/use-case';
import { IUser, USER_REPOSITORY } from '@src/modules/user/domain';
import { User } from '@src/modules/user/domain';
import { CreateUserDto } from '@src/modules/user/dto/request';

describe('CreateUserService', () => {
	let service: CreateUserService;
	let repository: IUser;

	beforeEach(async () => {
		const mockRepository: IUser = {
			findOneByEmail: jest.fn(),
			create: jest.fn(),
			update: jest.fn(),
			delete: jest.fn(),
		};

		const module: TestingModule = await Test.createTestingModule({
			providers: [
				CreateUserService,
				{
					provide: USER_REPOSITORY,
					useValue: mockRepository,
				},
			],
		}).compile();

		service = module.get<CreateUserService>(CreateUserService);
		repository = module.get<IUser>(USER_REPOSITORY);
	});

	it('UserRepository의 findOne 메서드를 호출하여 유저를 조회 한다, 존재한다면 예외 발생', () => {
		const userDto: CreateUserDto = {
			email: 'existing@example.com',
			password: 'password123',
		};

		const existingUser: User = {
			id: 1,
			email: 'existing@example.com',
			password: 'existingPassword',
			created_date: new Date(),
		};

		(repository.findOneByEmail as jest.Mock).mockReturnValue(existingUser);

		expect(() => (service as any).execute(userDto)).toThrow(ConflictException);
		expect(repository.findOneByEmail).toHaveBeenCalledTimes(1);
		expect(repository.findOneByEmail).toHaveBeenCalledWith(userDto.email);
	});

	it('UserRepository의 create 메서드를 호출하여 유저를 생성 한다', () => {
		const userDto: CreateUserDto = {
			email: 'new@example.com',
			password: 'password123',
		};

		const createdUser: User = {
			id: 1,
			email: 'new@example.com',
			password: 'password123',
			created_date: new Date(),
		};

		(repository.findOneByEmail as jest.Mock).mockReturnValue(null);
		(repository.create as jest.Mock).mockReturnValue(createdUser);

		const result = (service as any).execute(userDto);

		expect(repository.findOneByEmail).toHaveBeenCalledTimes(1);
		expect(repository.findOneByEmail).toHaveBeenCalledWith(userDto.email);

		expect(repository.create).toHaveBeenCalledTimes(1);
		expect(repository.create).toHaveBeenCalledWith(userDto);
		expect(result).toEqual(createdUser);
	});
});

// UserRepository는 mock으로 주입하고 "실패하는 Jest 테스트 코드"만 작성해줘.테스트가 지금은 실패해도 괜찮고, 구현을 만들면 통과할 수 있도록 의도를 명확히 드러내 줘.
