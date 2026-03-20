import React, {useState, useEffect, useMemo} from 'react';
import axios from 'axios';

import styles from './Home.module.css';

function ProjectCards ({ project_id }) {
  const [projects, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const {data} = await axios.get(`${baseUrl}/app/articles`);
        setProjects(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const project = useMemo(() => {
    return projects.find(p => p.id === Number(project_id));
  }, [projects, project_id]);

  //empty template
  if (loading) return (
    <div className = {styles.project_window}>
      <div className = {styles.image_side}>
        Test
      </div>

      <div className = {styles.desc}>
        Testt
      </div>
    </div>
  );


  //content
  return (
    <>

    </>
  );
}

export default ProjectCards;