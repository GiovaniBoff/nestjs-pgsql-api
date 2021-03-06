import {
	Body,
	Controller,
	Get,
	Param,
	Patch,
	Post,
	UnauthorizedException,
	UseGuards,
	ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { User } from 'src/users/user.entity';
import { UserRole } from 'src/users/users-roles.enum';
import { AuthService } from './auth.service';
import { ChangePasswordDto } from './dtos/change-password.dto';
import { CredentialsDto } from './dtos/credentials.dto';
import { GetUser } from './get-user.decorator';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('/signup')
	async signup(
		@Body(ValidationPipe) createUserDto: CreateUserDto,
	): Promise<{ message: string }> {
		await this.authService.signUp(createUserDto);
		return {
			message: 'Cadastro realizado com sucesso',
		};
	}

	@Patch(':token')
	async confirmEmail(@Param('token') token: string) {
		const user = await this.authService.confirmEmail(token);
		return {
			message: 'Email confirmado',
		};
	}

	@Post('/send-recover-email')
	async sendRecoverPasswordEmail(
		@Body('email') email: string,
	): Promise<{ message: string }> {
		await this.authService.sendRecoverPasswordEmail(email);
		return {
			message:
				'Foi enviado um email com instruções para resetar sua senha',
		};
	}

	@Patch('/reset-password/:token')
	async resetPassword(
		@Param('token') token: string,
		@Body(ValidationPipe) changePasswordDto: ChangePasswordDto,
	): Promise<{ message: string }> {
		await this.authService.resetPassword(token, changePasswordDto);

		return {
			message: 'Senha alterada com sucesso',
		};
	}

	@Post('/signin')
	async signIn(
		@Body(ValidationPipe) credentialsDto: CredentialsDto,
	): Promise<{ token: string }> {
		return await this.authService.signIn(credentialsDto);
	}

	@Patch(':id/change-password')
	@UseGuards(AuthGuard())
	async changePassword(
		@Param('id') id: string,
		@Body(ValidationPipe) changePasswordDto: ChangePasswordDto,
		@GetUser() user: User,
	) {
		if (user.role !== UserRole.ADMIN && user.id.toString() !== id)
			throw new UnauthorizedException(
				'Você não tem permissão para realizar esta operação',
			);

		await this.authService.changePassword(id, changePasswordDto);
		return {
			message: 'Senha alterada',
		};
	}

	@Get('/me')
	@UseGuards(AuthGuard('jwt'))
	getMe(@GetUser() user: User): User {
		return user;
	}
}
