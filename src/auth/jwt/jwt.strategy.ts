import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  // JwtStrategy는 인증을 할때 사용한다.
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // header에 토큰으로부터 추출
      secretOrKey: process.env.SECRET_KEY, // 외부에 유출이 되면 안되기때문에 환경변수로 저장하기!
      ignoreExpiration: false, // jwt의 만료기간
    });
  }

  // async validate(payload) {}
}
