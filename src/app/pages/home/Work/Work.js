import styled from "styled-components";
import {
  BodyText,
  EmphasisedText,
  InlineLink,
} from "@/app/components/Styles/Text";

const WorkWrapper = styled.div`
  font-family: "Montserrat", sans-serif;
  h2 {
    color: ${(props) => props.theme.hackerGreen};
  }

  .container {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
  }

  .container > p {
    margin-bottom: 0;
  }

  h2 {
    color: ${(props) => props.theme.hackerGreen};
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  row-gap: 5px;
  margin-bottom: 10px;
`;

const MutedText = styled.p`
  color: ${(props) => props.theme.foregroundWhite};
  font-size: 0.8em;
  margin-top: 4px;
  margin-bottom: 0;
`;

const Work = () => {
  return (
    <WorkWrapper>
      <TitleWrapper>
        <h2>Current Work:</h2>
        <MutedText>
          See my <InlineLink href="/cv.pdf">CV</InlineLink> for{" "}
          <EmphasisedText>past</EmphasisedText> work
        </MutedText>
      </TitleWrapper>
      <div className="container">
        <BodyText>
          - <EmphasisedText>Software Developer</EmphasisedText>
          {" @ "}{" "}
          <InlineLink href="https://www.localista.ai/">Localista</InlineLink>:
          Taking the pain out of event planning
        </BodyText>

        <BodyText>
          - <EmphasisedText>Lecturer | Lead Teacher</EmphasisedText>
          {" @ "}{" "}
          <InlineLink href="https://www.lewagon.com/web-development-course">
            Le Wagon London
          </InlineLink>
          : sharing passion and expertise to facilitate student comprehension of
          technical topics via engaging lectures, personalized support, code
          reviews, and project management.
        </BodyText>
      </div>
    </WorkWrapper>
  );
};

export default Work;
