import { Module } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileUploadController } from './file-upload.controller';
import { multerOptions } from 'src/multer.config';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [MulterModule.register(multerOptions)],
  providers: [FileUploadService],
  controllers: [FileUploadController],
})
export class FileUploadModule {}
