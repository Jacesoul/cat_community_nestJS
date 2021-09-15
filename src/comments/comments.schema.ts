import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsString, IsNotEmpty, IsPositive } from 'class-validator';
import { Document, SchemaOptions, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

// DB에서 하나가 만들어질때 생성된 일자와 업데이트된 일자를 찍어준다.
const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class Comments extends Document {
  @ApiProperty({
    example: '61416d0a9151b12c35eadd69',
    description: '작성한 고양이 id',
    required: true,
  })
  @Prop({ required: true, type: Types.ObjectId, ref: 'cats' }) // mongoDB에서 id는 Types.ObjectId 타입이다. ref는 어떤 도큐먼트랑 연결을 할것인지 적어준다.
  @IsNotEmpty()
  author: Types.ObjectId;

  @ApiProperty({
    description: '댓글 컨텐츠',
    required: true,
  })
  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  contents: string;

  @ApiProperty({
    description: '좋아요 수',
    required: true,
  })
  @Prop({ default: 0 })
  @IsPositive()
  @IsNotEmpty()
  likeCount: number;

  @ApiProperty({
    example: '61416d0a9151b12c35eadd69',
    description: '작성 대상(게시글, 정보글)',
    required: true,
  })
  @Prop({ required: true, type: Types.ObjectId, ref: 'cats' }) // mongoDB에서 id는 Types.ObjectId 타입이다. ref는 어떤 도큐먼트랑 연결을 할것인지 적어준다.
  @IsNotEmpty()
  info: Types.ObjectId;
}

export const CommentsSchema = SchemaFactory.createForClass(Comments);
