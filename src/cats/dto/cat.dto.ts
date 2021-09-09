import { ApiProperty } from '@nestjs/swagger';

export class ReadOnlyCatDto {
  @ApiProperty({
    example: '1039414',
    description: 'id',
  })
  id: string;

  @ApiProperty({
    example: 'jace@naver.com',
    description: 'email',
  })
  email: string;

  @ApiProperty({
    example: 'jace',
    description: 'name',
  })
  name: string;
}
