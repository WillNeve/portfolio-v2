import styled from "styled-components";

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
  return (
    <ProjectsWrapper>
      <h2>Projects</h2>
      <p className="notice">*Coming soon!</p>
    </ProjectsWrapper>
  );
};

export default Projects;
