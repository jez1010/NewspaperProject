import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';

import {baseUrl} from "../../config";

import styles from './ViewArticle.module.css';

function ViewArticle() {
  const {id} = useParams();

  const [article, setArticle] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${baseUrl}/app/${id}`);
        setArticle(response.data);
      } catch (error) {
        
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  const sameData = article.created_at !== article.modified_at;


  return (
    <article>
      <h1>{article.header}</h1>
      <h5>{article.created_at}</h5>
      {sameData && 
        (
          <h5>{article.modified_at}</h5>
        )      
      }
      {article.content}
    </article>
  );
}

export default ViewArticle;