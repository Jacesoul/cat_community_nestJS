import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsString, IsEmail, IsNotEmpty } from 'class-validator';
import { Document, SchemaOptions } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Comments } from 'src/comments/comments.schema';

// DB에서 하나가 만들어질때 생성된 일자와 업데이트된 일자를 찍어준다.
const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class Cat extends Document {
  @ApiProperty({
    example: 'jace@naver.com',
    description: 'email',
    required: true,
  })
  @Prop({ required: true, unique: true })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'jace',
    description: 'name',
    required: true,
  })
  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: '1234',
    description: 'password',
    required: true,
  })
  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  password: string;

  // 디폴트 이미지를 Prop에서 설정해줄수가 있다.
  @Prop({
    default:
      'https://raw.githubusercontent.com/amamov/teaching-nestjs-a-to-z/main/images/1.jpeg',
  })
  @IsString()
  imgUrl: string;

  readonly readOnlyData: {
    id: string;
    email: string;
    name: string;
    imgUrl: string;
  };

  readonly comments: Comments[];
}

const _CatSchema = SchemaFactory.createForClass(Cat);

_CatSchema.virtual('readOnlyData').get(function (this: Cat) {
  return {
    id: this.id,
    email: this.email,
    name: this.name,
    imgUrl: this.imgUrl,
    comments: this.comments,
  };
});

_CatSchema.virtual('comments', {
  ref: 'comments', // 해당하는 스키마 이름
  localField: '_id',
  foreignField: 'info', // comments 스키마의 info에 대해서 comment를 가지고 온다는 뜻
});
//populate 다른 document와 이어줄수 있는 메서드이다. 아래의 두가지 옵션이 필요하다.
_CatSchema.set('toObject', { virtuals: true }); // 객체로 변환이 가능
_CatSchema.set('toJSON', { virtuals: true }); // JSON형태로 변환이 가능

export const CatSchema = _CatSchema;
