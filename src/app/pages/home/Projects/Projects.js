import { useEffect, useState } from "react";
import styled from "styled-components"

import ProjectCard from "./ProjectCard";

const ProjectsWrapper = styled.div`
  font-family: 'Montserrat', sans-serif;
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
  const [projects, setProjects] = useState([]);

  const getProjects = async () => {
    const res = await fetch(`/api/projects`, { cache: 'no-store', revalidate: 0 })
    const data = await res.json();
    const rows = data.rows;
    console.log(rows);
    setProjects(rows);
  }

  useEffect(() => {
    getProjects();
  }, [])

  return (
    <ProjectsWrapper>
      <h2>Projects</h2>
      <div>
        {projects.map(({title, description, imgsrc, skills}, index) => (
          <ProjectCard key={index}
                       title={title}
                       desc={description}
                       skills={skills.split(', ')}
                       imgSrc={imgsrc}/>
        ))}
      </div>
    </ProjectsWrapper>
  )
}

export default Projects;
