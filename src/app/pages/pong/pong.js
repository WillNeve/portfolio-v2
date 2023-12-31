import PongGame from './PongGame/PongGame';
import styled from 'styled-components';

const Subtle = styled.p`
  font-size: 16px;
`;

const Pong = () => {
  return (
    <div>
      <h1>A single player take on Pong</h1>
      {/* <p>My single player take on Pong</p> */}
      <Subtle>Not as easy as to implemenet as initially anticipated...</Subtle>
      <PongGame/>
    </div>
  );
}

export default Pong;
