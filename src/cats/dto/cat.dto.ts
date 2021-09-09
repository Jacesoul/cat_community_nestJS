import { ApiProperty, PickType } from '@nestjs/swagger';
import { Cat } from '../cats.schema';

// PickType을 사용하면 Cat이라는 class에서 필요한 부분만 가져올수 있다.
// 반대로 OmitType을 사용하면 필요없는것만 뺄수 있다.
export class ReadOnlyCatDto extends PickType(Cat, ['email', 'name'] as const) {
  @ApiProperty({
    example: '1039414',
    description: 'id',
  })
  id: string;
}
