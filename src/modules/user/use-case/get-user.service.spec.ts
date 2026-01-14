import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { GetUserService } from './get-user.service';
import { IUser, USER_REPOSITORY } from '@user/domain';
import { ResponseGetUserDto } from '@user/dto/response';
import { User } from '@user/domain';

describe('GetUserService', () => {
	let service: GetUserService;
	let repository: IUser;

	beforeEach(async () => {
		const mockRepository: IUser = {
			findOneById: jest.fn(),
			findOneByEmail: jest.fn(),
			create: jest.fn(),
			update: jest.fn(),
			delete: jest.fn(),
		};

		const module: TestingModule = await Test.createTestingModule({
			providers: [
				GetUserService,
				{
					provide: USER_REPOSITORY,
					useValue: mockRepository,
				},
			],
		}).compile();

		service = module.get<GetUserService>(GetUserService);
		repository = module.get<IUser>(USER_REPOSITORY);
	});

	it('UserRepository의 findOneById 메서드를 id로 호출한다. 유저가 존재 하지 않는다면 exception을 던진다.', () => {
		const userId = 999;

		(repository.findOneById as jest.Mock).mockReturnValue(null);

		expect(() => (service as any).execute(userId)).toThrow(NotFoundException);

		expect(repository.findOneById).toHaveBeenCalledTimes(1);
		expect(repository.findOneById).toHaveBeenCalledWith(userId);
	});

	it('유저가 존재 한다면 ResponseGetUserDto로 역직열화 하여 반환한다.', () => {
		const userId = 1;
		const existingUser: User = {
			id: 1,
			email: 'test@example.com',
			password: 'password123',
			created_date: new Date(),
		};

		(repository.findOneById as jest.Mock).mockReturnValue(existingUser);

		const result = (service as any).execute(userId);

		expect(repository.findOneById).toHaveBeenCalledTimes(1);
		expect(repository.findOneById).toHaveBeenCalledWith(userId);

		expect(result).toBeDefined();
		expect(result.id).toBe(existingUser.id);
		expect(result.email).toBe(existingUser.email);
		expect(result.created_date).toBeInstanceOf(Date);
	});
});

// UserRepository는 mock으로 주입하고 "실패하는 Jest 테스트 코드"만 작성하고 createDate는 Date타입만 테스트해줘. 테스트가 지금은 실패해도 괜찮고, 구현을 만들면 통과할 수 있도록 의도를 명확히 드러내 줘.
