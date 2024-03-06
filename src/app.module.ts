import { Module } from '@nestjs/common';
import { FileUploadModule } from './file-upload/file-upload.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ImageResizeModule } from './image-resize/image-resize.module';
// import { MulterModule } from '@nestjs/platform-express';
// import { multerOptions } from './multer.config';

@Module({
  imports: [
    // MulterModule.register(multerOptions),
    MongooseModule.forRoot(
      'mongodb+srv://Kingslee:Kk147890kK@file-compressor.twxopn0.mongodb.net/?retryWrites=true&w=majority&appName=file-compressor',
    ),
    FileUploadModule,
    ImageResizeModule,
  ],
})
export class AppModule {}
