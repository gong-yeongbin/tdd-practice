import { Module } from '@nestjs/common';
import { UserController } from '@user/controller';
import { CreateUserService, GetUserService, UpdateUserService } from '@user/use-case';
import { UserRepository } from '@user/infrastructure';
import { USER_REPOSITORY } from '@user/domain';

@Module({
	controllers: [UserController],
	providers: [CreateUserService, UpdateUserService, GetUserService, { provide: USER_REPOSITORY, useClass: UserRepository }],
})
export class UserModule {}
