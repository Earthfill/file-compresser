import { Test, TestingModule } from '@nestjs/testing';
import { ImageResizeController } from './image-resize.controller';

describe('ImageResizeController', () => {
  let controller: ImageResizeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImageResizeController],
    }).compile();

    controller = module.get<ImageResizeController>(ImageResizeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
