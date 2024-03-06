import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadResponseDto } from './dto';
import { File } from './schemas/file-upload.entity';

@Controller('upload')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<FileUploadResponseDto> {
    const filePath = await this.fileUploadService.uploadAndCompressFile(file);
    return { filePath };
  }

  @Get()
  getAllUploadedFiles(): Promise<File[]> {
    return this.fileUploadService.getAllUploadedFiles();
  }
}
