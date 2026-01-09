import { Module } from '@nestjs/common';
import { UserController } from '@src/modules/user/controller';
import { CreateUserService } from '@src/modules/user/use-case';
import { UserRepository } from '@src/modules/user/infrastructure';
import { USER_REPOSITORY } from '@src/modules/user/domain';

@Module({
	controllers: [UserController],
	providers: [CreateUserService, { provide: USER_REPOSITORY, useClass: UserRepository }],
})
export class UserModule {}
