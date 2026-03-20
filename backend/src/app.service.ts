import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hi! We don\'t know how you found this, but uh... don\'t snoop around here, pretty please? -Jez10';
  }

  //supabase logins
  private supabase: SupabaseClient;

  constructor(private configService: ConfigService) {
    const url = this.configService.get<string>('SUPABASE_URL') as string;
    const key = this.configService.get<string>('SUPABASE_KEY') as string;

    this.supabase = createClient(url, key);
  }

  async getAllArticles() {
    const { data, error } = await this.supabase
      .schema('public')
      .from('Articles')
      .select('*')
      .order('modified_at', {ascending: false});
    
      if (error) throw error;
      return data;
  }

  async getArticleById(id: string) {
    const {data, error} = await this.supabase
      .schema('public')
      .from('Articles')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }
}
