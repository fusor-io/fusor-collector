import { Module, HttpModule } from '@nestjs/common';
import { ScrapperService } from './service/scrapper.service';

@Module({
  imports: [HttpModule],
  providers: [ScrapperService],
  exports: [ScrapperService],
})
export class ScrapperModule {}
