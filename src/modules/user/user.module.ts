import { Module } from '@nestjs/common';
import { UserController } from '@user/controller';
import { CreateUserService, UpdateUserService } from '@user/use-case';
import { UserRepository } from '@user/infrastructure';
import { USER_REPOSITORY } from '@user/domain';

@Module({
	controllers: [UserController],
	providers: [CreateUserService, UpdateUserService, { provide: USER_REPOSITORY, useClass: UserRepository }],
})
export class UserModule {}
