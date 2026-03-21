import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';

import {baseUrl} from "../../config";
import * as functions from '../functions'

import '../../App.css';
import pageStyles from './ViewArticle.module.css';

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

  if (loading) return <div className = "loader"></div>

  return (
    <article>
      <div key = {article.id}>
        <div className = "title">{article.header}</div>
        <div className = "subtitle">
          Published on {functions.formatDate(article.created_at)}, {functions.formatTime(article.created_at)}
        </div>
        {sameData && 
          (
            <div className = "subtitle">
              Modified on {functions.formatDate(article.created_at)}, {functions.formatTime(article.created_at)}
            </div>
          )      
        }
        <hr/>
        {article.content}
      </div>
        <div className = {pageStyles.test}>test</div>
    </article>
  );
}

export default ViewArticle;