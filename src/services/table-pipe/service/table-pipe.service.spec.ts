import { Test, TestingModule } from '@nestjs/testing';

import { ExtractorService } from '../../extractor/service/extractor.service';
import { PostProcessorService } from '../../post-processor/service/post-processor.service';
import { TablePipeService } from './table-pipe.service';

describe('TablePipeService', () => {
  let service: TablePipeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TablePipeService,
        { provide: ExtractorService, useValue: {} },
        { provide: PostProcessorService, useValue: {} },
      ],
    }).compile();

    service = module.get<TablePipeService>(TablePipeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
