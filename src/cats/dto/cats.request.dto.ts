import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

// type 또는 interface라고 하지 않고 class로 하는 이유는 데코레이터 패턴을 적용할수 있고 상속을해서 재사용성을 증가시킬수도 있다.
export class CatRequestDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}
