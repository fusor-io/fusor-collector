import { Test, TestingModule } from '@nestjs/testing';

import { ExtractorService } from '../../extractor/service/extractor.service';
import { PostProcessorService } from '../../post-processor/service/post-processor.service';
import { PipeService } from './pipe.service';

describe('PipeService', () => {
  let service: PipeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PipeService,
        { provide: ExtractorService, useValue: {} },
        { provide: PostProcessorService, useValue: {} },
      ],
    }).compile();

    service = module.get<PipeService>(PipeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
