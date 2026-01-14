import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { UpdateUserService } from './update-user.service';
import { IUser, USER_REPOSITORY } from '@user/domain';
import { UpdateUserDto } from '@user/dto/request';
import { User } from '@user/domain';

describe('UpdateUserService', () => {
	let service: UpdateUserService;
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
				UpdateUserService,
				{
					provide: USER_REPOSITORY,
					useValue: mockRepository,
				},
			],
		}).compile();

		service = module.get<UpdateUserService>(UpdateUserService);
		repository = module.get<IUser>(USER_REPOSITORY);
	});

	it('UserRepository의 findOneById 메서드를 호출하여 유저를 조회 한다, 존재하지 않는다면 예외 발생', () => {
		const updateUserDto: UpdateUserDto = {
			id: 999,
			email: 'notfound@example.com',
			password: 'password123',
		};

		(repository.findOneById as jest.Mock).mockReturnValue(null);

		expect(() => (service as any).execute(updateUserDto)).toThrow(NotFoundException);
		expect(repository.findOneById).toHaveBeenCalledTimes(1);
		expect(repository.findOneById).toHaveBeenCalledWith(updateUserDto.id);
	});

	it('UserRepository의 findOneById 메서드를 호출하여 유저를 조회 한다, 존재한다면 update 메서드를 호출하여 유저를 업데이트 한다. update 메서드의 리턴 UserEntity 객체를 ResponseUpdateUserDto로 역직열화 하여 반환한다.', () => {
		const updateUserDto: UpdateUserDto = {
			id: 1,
			email: 'updated@example.com',
			password: 'newpassword123',
		};

		const existingUser: User = {
			id: 1,
			email: 'old@example.com',
			password: 'oldpassword',
			created_date: new Date(),
		};

		const updatedUser: User = {
			id: 1,
			email: 'updated@example.com',
			password: 'newpassword123',
			created_date: existingUser.created_date,
		};

		(repository.findOneById as jest.Mock).mockReturnValue(existingUser);
		(repository.update as jest.Mock).mockReturnValue(updatedUser);

		const result = (service as any).execute(updateUserDto);

		expect(repository.findOneById).toHaveBeenCalledTimes(1);
		expect(repository.findOneById).toHaveBeenCalledWith(updateUserDto.id);

		expect(repository.update).toHaveBeenCalledTimes(1);
		expect(repository.update).toHaveBeenCalledWith(expect.objectContaining(updateUserDto));

		expect(result).toBeDefined();
		expect(result.id).toBe(updatedUser.id);
		expect(result.email).toBe(updatedUser.email);
		expect(result.password).toBe(updatedUser.password);
		expect(result.created_date).toBeInstanceOf(Date);
	});
});

// UserRepository는 mock으로 주입하고 "실패하는 Jest 테스트 코드"만 작성해줘 대신 생성날짜, 업데이트 날짜는 타입만 확인해줘.테스트가 지금은 실패해도 괜찮고, 구현을 만들면 통과할 수 있도록 의도를 명확히 드러내 줘.
// 수정된 요구사항만 "실패하는 Jest 테스트 코드"만 다시 작성하고 createDate는 Date타입만 테스트해줘. 테스트가 실패해도 괜찮고, 구현을 만들면 통과할 수 있도록 의도를 명확히 드러내줘.
