import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

// type 또는 interface라고 하지 않고 class로 하는 이유는 데코레이터 패턴을 적용할수 있고 상속을해서 재사용성을 증가시킬수도 있다.
export class CatRequestDto {
  @ApiProperty({
    example: 'jace@naver.com',
    description: 'email',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: '1234',
    description: 'password',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: 'jace',
    description: 'name',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
