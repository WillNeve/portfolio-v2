import { useEffect, useState } from "react";
import styled from "styled-components";

import { ProjectCard, LoadingCard } from "./ProjectCard";

const ProjectsWrapper = styled.div`
  font-family: "Montserrat", sans-serif;
  h2 {
    color: ${(props) => props.theme.hackerGreen};
    margin-bottom: 10px;
  }

  .notice {
    color: ${(props) => props.theme.foregroundWhite};
    font-size: 0.8em;
  }

  & > div {
    display: flex;
    flex-direction: column;
    row-gap: 20px;
    padding: 20px 0px;
  }
  h2 {
    color: ${(props) => props.theme.hackerGreen};
  }
`;

const Projects = () => {
  const [projects, setProjects] = useState(null);

  // dont ask why I used a database to store these
  const getProjects = async () => {
    const res = await fetch(`/api/projects`, {
      cache: "no-store",
      revalidate: 0,
    });
    const data = await res.json();
    const rows = data.rows;
    setProjects(rows);
  };

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <ProjectsWrapper>
      <h2>Projects</h2>
      <p className="notice">*Outdated, update coming soon!</p>
      <div>
        {projects === null ? (
          <>
            <LoadingCard />
            <LoadingCard />
            <LoadingCard />
          </>
        ) : (
          projects.map(
            (
              { title, description, imgsrc, skills, deploy_url, github_url },
              index
            ) => (
              <ProjectCard
                key={index}
                title={title}
                desc={description}
                skills={skills.split(", ")}
                deployUrl={deploy_url}
                githubUrl={github_url}
                imgSrc={imgsrc}
              />
            )
          )
        )}
      </div>
    </ProjectsWrapper>
  );
};

export default Projects;
