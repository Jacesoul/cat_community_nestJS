import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CatsRepository } from 'src/cats/cats.repository';
import { LoginRequestDto } from './dto/login.request.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  // cat의 데이터베이스를 사용해야하기 때문에 종속성 주입을 해야한다.
  constructor(
    private readonly catsRepository: CatsRepository,
    private jwtService: JwtService, // auth.module에 JwtModule안에서 제공해주는 공급자이다.
  ) {}

  async jwtLogIn(data: LoginRequestDto) {
    const { email, password } = data;

    // * 해당하는 email이 있는지 체크
    const cat = await this.catsRepository.findCatByEmail(email);

    if (!cat) {
      throw new UnauthorizedException('이메일과 비밀번호를 확인해주세요.');
    }

    // * password 일치여부 체크
    // bcrypt안에 compare라는 메서드가 있다. (password가 해시화 되어있어서 이 함수를 통해 비교를 해야한다.)
    const isPasswordValidated: boolean = await bcrypt.compare(
      password,
      cat.password,
    );

    if (!isPasswordValidated) {
      throw new UnauthorizedException('이메일과 비밀번호를 확인해주세요.');
    }

    // sub는 토큰 제목을 의미한다.
    const payload = { email, sub: cat.id };

    return {
      token: this.jwtService.sign(payload),
    };
  }
}
