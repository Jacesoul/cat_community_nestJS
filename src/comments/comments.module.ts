import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { CommentsController } from './controllers/comments.controller';
import { CommentsService } from './services/comments.service';
import { Comments, CommentsSchema } from './comments.schema';
import { CatsRepository } from 'src/cats/cats.repository';
import { Cat, CatSchema } from 'src/cats/cats.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Comments.name, schema: CommentsSchema },
      { name: Cat.name, schema: CatSchema },
    ]),
  ],
  controllers: [CommentsController],
  providers: [CommentsService, CatsRepository],
})
export class CommentsModule {}
