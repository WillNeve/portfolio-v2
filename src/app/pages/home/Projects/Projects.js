import { useEffect, useState } from "react";
import styled from "styled-components"

import {ProjectCard, LoadingCard} from "./ProjectCard";

const ProjectsWrapper = styled.div`
  font-family: 'Montserrat', sans-serif;
  h2 {
    color: ${props => props.theme.hackerGreen};
    margin-bottom: 20px;
  }

  & > div {
    display: flex;
    flex-direction: column;
    row-gap: 20px;
    padding: 20px 0px;
  }
  h2 {
    color: ${props => props.theme.hackerGreen};
  }
`;

const Projects = () => {
  const [projects, setProjects] = useState(null);

  const getProjects = async () => {
    const res = await fetch(`/api/projects`, { cache: 'no-store', revalidate: 0 })
    const data = await res.json();
    const rows = data.rows;
    setProjects(rows);
  }

  useEffect(() => {
    getProjects();
  }, [])

  return (
    <ProjectsWrapper>
      <h2>Projects</h2>
      <div>
        {projects === null ? (
          <>
            <LoadingCard/>
            <LoadingCard/>
            <LoadingCard/>
          </>
        ) :
        projects.map(({title, description, imgsrc, skills}, index) => (
          <ProjectCard key={index}
                       title={title}
                       desc={description}
                       skills={skills.split(', ')}
                       imgSrc={imgsrc}/>
        ))
      }

      </div>
    </ProjectsWrapper>
  )
}

export default Projects;
