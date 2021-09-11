import { CatsModule } from './../cats/cats.module';
import { CatsRepository } from 'src/cats/cats.repository';
import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt/jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', session: false }), // 나중에 만들 Strategy에 대해서 기본적인 설정을 해줄수 있다. 세션 쿠키를 사용하지 않기 때문에 session은 false로 설정

    // JWT 생성 모듈
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '1y' },
    }), // 로그인시에 사용

    forwardRef(() => CatsModule), // 순환참조 해결
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
