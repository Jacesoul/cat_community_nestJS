import { CatRequestDto } from './dto/cats.request.dto';
import {
  Injectable,
  HttpException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cat } from './cats.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CatsService {
  constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}

  async signUp(body: CatRequestDto) {
    const { email, name, password } = body;
    const isCatExist = await this.catModel.exists({ email });
    // catModel안에 쿼리 메서드가 있다.
    // return값으로 Promise<boolean>으로 주게된다.

    if (isCatExist) {
      // throw new HttpException('해당하는 고양이는 이미 존재합니다.', 403);
      throw new UnauthorizedException('해당하는 고양이는 이미 존재합니다.');
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const cat = await this.catModel.create({
      email,
      name,
      password: hashedPassword,
    });

    return cat.readOnlyData;
  }
}
