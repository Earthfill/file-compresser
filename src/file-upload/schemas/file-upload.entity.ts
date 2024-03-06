import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type FileDocument = HydratedDocument<File>;

@Schema({ timestamps: true })
export class File {
  @Prop()
  filePath: string;

  @Prop()
  originalName: string;

  @Prop()
  mimeType: string;

  @Prop()
  size: number;

  @Prop()
  compressedSize: number;
}

export const FileSchema = SchemaFactory.createForClass(File);
