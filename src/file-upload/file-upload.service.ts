import { Injectable } from '@nestjs/common';
import * as zlib from 'zlib';
import * as fs from 'fs';

@Injectable()
export class FileUploadService {
  async uploadAndCompressFile(file: Express.Multer.File): Promise<string> {
    // handle file upload logic
    const filePath = file.path;

    // compress file
    const compressedFilePath = `${filePath}.gz`;
    const gzip = zlib.createGzip();
    const input = fs.createReadStream(filePath);
    const output = fs.createWriteStream(compressedFilePath);

    input.pipe(gzip).pipe(output);

    return compressedFilePath;
  }
}
