import axios from 'axios';

import {baseUrl} from "../../config";
import {supabase} from "../../config";

export const { data, count, error } = async () => {
  await this.supabase
    .schema('public')
    .from('Articles')
      .select('id', {
        count: 'exact',
        head: false
      })
      .range(0,9)
      .order('modified_at', {ascending: false});
    
      if (error) throw error;
      return data;
}

