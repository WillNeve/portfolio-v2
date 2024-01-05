import styled from "styled-components"

const ProjectsWrapper = styled.div`
  font-family: 'Montserrat', sans-serif;
  border: 1px dashed cyan;
  h2 {
    color: ${props => props.theme.hackerGreen};
  }
`;

const Projects = () => {
  return (
    <ProjectsWrapper>
      <h2>Projects</h2>
    </ProjectsWrapper>
  )
}

export default Projects;
