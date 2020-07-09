import { Test, TestingModule } from '@nestjs/testing';
import { PostProcessorService } from './post-processor.service';

describe('PostProcessorService', () => {
  let service: PostProcessorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostProcessorService],
    }).compile();

    service = module.get<PostProcessorService>(PostProcessorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
