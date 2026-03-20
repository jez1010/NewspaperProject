import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  //grab all articles for searching
  @Get('all-articles')
  async getAllArticles() {
    return await this.appService.getAllArticles();
  }

  //grab a certain article
  @Get(':id')
  getArticle(@Param('id') id: string) {
    return this.appService.getArticleById(id);
  }
}
