import { Module } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileUploadController } from './file-upload.controller';
import { multerOptions } from 'src/multer.config';
import { MulterModule } from '@nestjs/platform-express';
import { MongooseModule } from '@nestjs/mongoose';
import { FileSchema } from './schemas/file-upload.entity';

@Module({
  imports: [
    MulterModule.register(multerOptions),
    MongooseModule.forFeature([
      {
        name: File.name,
        schema: FileSchema,
      },
    ]),
  ],
  providers: [FileUploadService],
  controllers: [FileUploadController],
})
export class FileUploadModule {}
