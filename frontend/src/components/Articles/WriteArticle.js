import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import Quill from 'quill';

import {baseUrl} from "../../config";
import * as functions from '../functions'

import 'quill/dist/quill.snow.css';
import '../../App.css';
import pageStyles from './WriteArticle.module.css';

function WriteArticle() {
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    const container = editorRef.current;
    if (!container) return;

    const setupQuill = async () => {
      window.Quill = Quill;

      const { default: ImageResize } = await import('quill-image-resize-module-v2');

      const prevToolbar = container.previousSibling;
      if (prevToolbar?.classList.contains('ql-toolbar')) {
        prevToolbar.remove();
      }
      container.innerHTML = '';

      if (!Quill.imports?.['modules/imageResize']) {
        Quill.register('modules/imageResize', ImageResize);
      }

      //the stuff in the toolbar
      const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        ['link', 'image', 'video'],

        [{ 'header': 1 }, { 'header': 2 }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],
        [{ 'direction': 'rtl' }],

        [{ 'size': ['small', false, 'large', 'huge'] }],
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        [{ 'color': [] }, { 'background': [] }],
        [{ 'font': [] }],
        [{ 'align': [] }],

        ['clean']
      ]

      const quill = new Quill(editorRef.current, {
        debug: 'info',
        modules: {
          toolbar: toolbarOptions,
          imageResize: {
            displaySize: true
          }
        },
        placeholder: 'Write your article...',
        theme: 'snow'
      });
      quillRef.current = quill;

      const savedContent = localStorage.getItem('article-draft');
      if (savedContent) {
        try {
          const delta = JSON.parse(savedContent);
          quill.setContents(delta);
        } catch (e) {
          console.error("Failed to parse draft JSON", e);
        }
      }
      quill.on('text-change', () => {
        const content = JSON.stringify(quill.getContents());
        localStorage.setItem('article-draft', content);
      });
    }
    
    setupQuill();

    return () => {
      // Clean up toolbar and reset ref so the guard works on re-mount
      const toolbar = editorRef.current?.previousSibling;
      if (toolbar?.classList.contains('ql-toolbar')) {
        toolbar.remove();
      }
      if (editorRef.current) {
        editorRef.current.innerHTML = '';
      }
      quillRef.current = null;
    };
  }, []);

  return (
    <article>
      <div className = "title">Write an article</div>
      <div className = "editor-wrapper">
        <div ref = {editorRef} style={{height: '400px'}}/>
      </div>
    </article>
  );
}

export default WriteArticle;