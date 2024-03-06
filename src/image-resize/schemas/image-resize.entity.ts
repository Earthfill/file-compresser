import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ImageDocument = HydratedDocument<Image>;

@Schema({ timestamps: true })
export class Image {
  @Prop()
  filePath: string[];

  @Prop()
  originalName: string;

  @Prop()
  mimeType: string;

  @Prop()
  size: number;
}

export const ImageSchema = SchemaFactory.createForClass(Image);
