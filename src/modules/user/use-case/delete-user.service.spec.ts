import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { DeleteUserService } from './delete-user.service';
import { IUser, USER_REPOSITORY } from '@user/domain';
import { User } from '@user/domain';

describe('DeleteUserService', () => {
	let service: DeleteUserService;
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
				DeleteUserService,
				{
					provide: USER_REPOSITORY,
					useValue: mockRepository,
				},
			],
		}).compile();

		service = module.get<DeleteUserService>(DeleteUserService);
		repository = module.get<IUser>(USER_REPOSITORY);
	});

	it('UserRepository의 findOneById 메서드를 호출하여 유저를 조회 한다, 존재하지 않는다면 예외 발생', () => {
		const userId = 999;

		(repository.findOneById as jest.Mock).mockReturnValue(null);

		expect(() => (service as any).execute(userId)).toThrow(NotFoundException);

		expect(repository.findOneById).toHaveBeenCalledTimes(1);
		expect(repository.findOneById).toHaveBeenCalledWith(userId);
	});

	it('UserRepository의 delete 메서드를 호출하여 유저를 삭제 한다.', () => {
		const userId = 1;
		const existingUser: User = {
			id: 1,
			email: 'test@example.com',
			password: 'password123',
			created_date: new Date(),
		};

		(repository.findOneById as jest.Mock).mockReturnValue(existingUser);
		(repository.delete as jest.Mock).mockReturnValue(undefined);

		(service as any).execute(userId);

		expect(repository.findOneById).toHaveBeenCalledTimes(1);
		expect(repository.findOneById).toHaveBeenCalledWith(userId);
		expect(existingUser.created_date).toBeInstanceOf(Date);

		expect(repository.delete).toHaveBeenCalledTimes(1);
		expect(repository.delete).toHaveBeenCalledWith(userId);
	});
});
// UserRepository는 mock으로 주입하고 "실패하는 Jest 테스트 코드"만 작성하고 createDate는 Date타입만 테스트해줘. 테스트가 지금은 실패해도 괜찮고, 구현을 만들면 통과할 수 있도록 의도를 명확히 드러내 줘.
