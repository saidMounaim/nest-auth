import {
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { Prisma } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (password && !bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException('Invalid password');
    }

    return {
      accessToken: this.jwtService.sign({ userId: user.id }),
    };
  }

  async register(createUserDto: Prisma.UserCreateInput) {
    const user = await this.prisma.user.findFirst({
      where: { email: createUserDto.email },
    });

    if (user) {
      throw new HttpException('User already exists', 401);
    }

    const hashedPassword = bcrypt.hashSync(createUserDto.password, 10);

    const newUser = { ...createUserDto, password: hashedPassword };

    await this.prisma.user.create({ data: newUser });

    return newUser;
  }
}
