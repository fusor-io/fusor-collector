import { Test, TestingModule } from '@nestjs/testing';

import { PipeService } from '../../pipe/service/pipe.service';
import { ScrapperService } from '../../scrapper/service/scrapper.service';
import { TablePipeService } from '../../table-pipe/service/table-pipe.service';
import { CollectorService } from './collector.service';

describe('CollectorService', () => {
  let service: CollectorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CollectorService,
        {provide: PipeService, useValue: {}},
        {provide: ScrapperService, useValue: {}},
        {provide: TablePipeService, useValue: {}},
      ],
    }).compile();

    service = module.get<CollectorService>(CollectorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
