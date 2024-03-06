import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Image, ImageSchema } from './schemas/image-resize.entity';
import { ImageResizeService } from './image-resize.service';
import { ImageResizeController } from './image-resize.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Image.name,
        schema: ImageSchema,
      },
    ]),
  ],
  providers: [ImageResizeService],
  controllers: [ImageResizeController],
})
export class ImageResizeModule {}
