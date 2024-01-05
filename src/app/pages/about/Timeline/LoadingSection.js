import styled, {keyframes} from 'styled-components';

const loadingAnim = keyframes`
  0% {
    background-position: -1000px;
  }
  100% {
    background-position: 1000px;
  }
`;

const LoadingSectionOuter = styled.div`
  margin-top: 20px;
  padding-left: 10px;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  .title, .body, .date {
    background-color: rgba(81,226,81,0.1);
  }
  .title {
    width: 40%;
    min-width: 200px;
    height: 35px;
  }
  .date {
    width: 10%;
    min-width: 120px;
    height: 35px;
  }
  .body {
    width: 70%;
    min-width: 310px;
    height: 100px;
  }
  .animated {
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, rgba(5,7,8,0) 40%, rgba(81,226,81,0.2) 55%, rgba(81,226,81,0.2) 66%, rgba(5,7,8,0) 82%);
    background-size: 1000px 70px;
    /* border: 1px dashed purple; */
    animation: ${loadingAnim} 2s linear 0s infinite forwards;
  }
  .body {

  }
`;


const LoadingSection = () => {
  return (
    <LoadingSectionOuter>
      <div className='title'>
        <div className="animated"></div>
      </div>
      <div className='date'>
        <div className="animated"></div>
      </div>
      <div className='body'>
        <div className="animated"></div>
      </div>
    </LoadingSectionOuter>
  )
}

export default LoadingSection;
