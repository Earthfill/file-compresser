import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as zlib from 'zlib';
import * as fs from 'fs';
import { FileUploadDto } from './dto';
import { InjectModel } from '@nestjs/mongoose';
import { File, FileDocument } from './schemas/file-upload.entity';
import { Model } from 'mongoose';

@Injectable()
export class FileUploadService {
  constructor(@InjectModel(File.name) private fileModel: Model<FileDocument>) {}

  async uploadAndCompressFile(file: FileUploadDto['file']): Promise<string> {
    try {
      // handle file upload logic
      const filePath = file.path;

      // compress file
      const compressedFilePath = `${filePath}.gz`;
      const gzip = zlib.createGzip();
      const input = fs.createReadStream(filePath);
      const output = fs.createWriteStream(compressedFilePath);

      // Handle 'close' event to ensure compression completes before saving
      output.on('close', async () => {
        // Get file stats to calculate size
        const stats = fs.statSync(compressedFilePath);
        const compressedSize = stats.size;

        // Save file information to MongoDB
        const newFile = new this.fileModel({
          filePath: compressedFilePath,
          originalName: file.originalname,
          mimeType: file.mimetype,
          size: file.size,
          compressedSize: compressedSize,
        });
        await newFile.save();
      });

      input.pipe(gzip).pipe(output);

      return compressedFilePath;
    } catch (error) {
      console.error('Error during file upload and compression:', error);
      throw new HttpException(
        'Failed to upload and compress file. Please try again later',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAllUploadedFiles(): Promise<File[]> {
    try {
      const allFiles = await this.fileModel.find().exec();
      return allFiles;
    } catch (error) {
      throw new HttpException(
        'Failed to fetch all the uploaded files. Please try again later',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
