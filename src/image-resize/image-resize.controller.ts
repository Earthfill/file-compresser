import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Image } from './schemas/image-resize.entity';
import { ImageResizeService } from './image-resize.service';
import { ImageResizeResponseDto } from './dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('resize')
export class ImageResizeController {
  constructor(private readonly imageResizeService: ImageResizeService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadAndCreateResponsiveImages(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<ImageResizeResponseDto> {
    const filePath =
      await this.imageResizeService.uploadAndCreateResponsiveImages(file);
    return { filePath };
  }

  @Get()
  getAllResizedImages(): Promise<Image[]> {
    return this.imageResizeService.getAllResizedImages();
  }
}
