import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsString, IsEmail, IsNotEmpty } from 'class-validator';
import { Document, SchemaOptions } from 'mongoose';

// DB에서 하나가 만들어질때 생성된 일자와 업데이트된 일자를 찍어준다.
const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class Cat extends Document {
  @Prop({ required: true, unique: true })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  password: string;

  @Prop()
  imgUrl: string;

  readonly readOnlyData: { id: string; email: string; name: string };
}

export const CatSchema = SchemaFactory.createForClass(Cat);

CatSchema.virtual('readOnlyData').get(function (this: Cat) {
  return {
    id: this.id,
    email: this.email,
    name: this.name,
  };
});
