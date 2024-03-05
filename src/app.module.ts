import { Module } from '@nestjs/common';
import { FileUploadModule } from './file-upload/file-upload.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://ulevaldevelopers:5khfa22BEkSaiktZ@cluster0.vpbatfi.mongodb.net/uleval?retryWrites=true&w=majority',
    ),
    FileUploadModule,
  ],
})
export class AppModule {}
