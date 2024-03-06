import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Image, ImageDocument } from './schemas/image-resize.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ImageUploadDto } from './dto';
import sharp from 'sharp';

@Injectable()
export class ImageResizeService {
  constructor(
    @InjectModel(Image.name) private imageModel: Model<ImageDocument>,
  ) {}

  async uploadAndCreateResponsiveImages(
    file: ImageUploadDto['file'],
  ): Promise<string[]> {
    try {
      // handle image upload logic
      const filePath = file.path;
      const scaledImagePaths: string[] = [];

      // compress original image
      const compressedFilePath = `${filePath}.compressed.jpg`; // output processed file path
      await sharp(filePath)
        .jpeg({ quality: 80 }) // adjust quality as needed
        .toFile(compressedFilePath);
      scaledImagePaths.push(compressedFilePath);

      // generate scaled images for responsive UI
      const sizes = [320, 640, 1024]; // define desired sizes for responsive images
      for (const size of sizes) {
        const scaledFilePath = `${filePath}.${size}px.jpg`; // outpu scaled file path
        await sharp(filePath)
          .resize(size) // resize image to specified size
          .jpeg({ quality: 80 }) // adjust quality as needed
          .toFile(scaledFilePath);
        scaledImagePaths.push(scaledFilePath);
      }

      // save file information to MongoDB
      const newFile = new this.imageModel({
        filePaths: scaledImagePaths,
        originalName: file.originalName,
        mimeType: file.mimeType,
        size: file.size,
      });
      await newFile.save();

      return scaledImagePaths;
    } catch (error) {
      console.error('Error during image upload and processing:', error);
      throw new HttpException(
        'Failed to upload and process image. Please try again later',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAllResizedImages(): Promise<Image[]> {
    try {
      const allImages = await this.imageModel.find().exec();
      return allImages;
    } catch (error) {
      throw new HttpException(
        'Failed to fetch all the uploaded images. Please try again later',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
