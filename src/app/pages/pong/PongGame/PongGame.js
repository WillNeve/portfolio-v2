import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const Canvas = styled.canvas`
  border: 2px solid red;
`;

const CanvasWrapper = styled.div`
  width: 100%;
  border: 2px solid yellow;
  margin-top: 20px;
`;

const PlayButton = styled.button`
  outline: none;
  background: none;
  color: ${props => props.theme.hackerGreen};
  border: 2px solid red;
`;

const PongGame = () => {
  const canvasRef = useRef(null);
  const wrapperRef = useRef(null);
  const lastTimestampRef = useRef(0);

  //audio
  const wallAudio = useRef(null);
  const paddleAudio = useRef(null);
  const endAudio = useRef(null);

  const [ballPosition, setBallPosition] = useState([20, 20]);
  const [ballVelocity, setBallVelocity] = useState([3, 6]);
  const [mouseYPosition, setMouseYPosition] = useState(0);
  const [isColliding, setIsColliding] = useState(false)
  const [isOver, setIsOver] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = wrapperRef.current.offsetWidth;
    const width = canvas.width;
    const height = canvas.height;

    const ballRadius = 15;
    const startAngle = 0;
    const endAngle = 2 * Math.PI;

    const ctx = canvas.getContext("2d");

    const draw = (timestamp) => {
      ctx.clearRect(0, 0, width, height);
      const elapsed = timestamp - lastTimestampRef.current;
      lastTimestampRef.current = timestamp;
      // Draw paddle
      ctx.beginPath();
      const paddleHeight = 100;
      const paddleX = width - 30;
      let paddleY = mouseYPosition - canvasRef.current.offsetTop;
      if (paddleY > height - paddleHeight) paddleY = height - paddleHeight;
      if (paddleY < 0) paddleY = 0;

      ctx.fillStyle = '#51e251';
      ctx.rect(paddleX, paddleY, 10, paddleHeight);
      ctx.fill();

      // Calculate new ball position
      const newBallPosition = [
        ballPosition[0] + ballVelocity[0] * (elapsed / 16), // Adjust 16 to control speed
        ballPosition[1] + ballVelocity[1] * (elapsed / 16), // Adjust 16 to control speed
      ];

      // Inverse velocity if collision with boundaries
      if (newBallPosition[0] > width - ballRadius) {
        // game over
        if (!isOver) {
          endAudio.current.play();
          setBallVelocity([0,0]);
          setIsOver(true);
        }
      } else if (newBallPosition[0] < 0 + ballRadius) {
        wallAudio.current.play();
        if (!isColliding) {
          setBallVelocity([ -ballVelocity[0], ballVelocity[1] ]);
          setIsColliding(true);
        }
      } else  if (newBallPosition[1] < 0 + ballRadius || newBallPosition[1] > height - ballRadius) {
        wallAudio.current.play();
        if (!isColliding) {
          setBallVelocity([ ballVelocity[0], -ballVelocity[1] ]);
          setIsColliding(true);
        }
      } else if ((newBallPosition[1] >= paddleY && newBallPosition[1] <= paddleY + paddleHeight) && (newBallPosition[0] >= paddleX - ballRadius)) {
        paddleAudio.current.play();
        if (!isColliding) {
          setBallVelocity([ -ballVelocity[0] * 1.05, ballVelocity[1] * 1.05])
          setIsColliding(true);
        }
      } else {
        setIsColliding(false)
      }





      // Update ball position
      setBallPosition(newBallPosition);

      // Draw ball based on position
      ctx.beginPath();
      const x = ballPosition[0];
      const y = ballPosition[1];
      ctx.arc(x, y, ballRadius, startAngle, endAngle, true);
      ctx.fillStyle = '#51e251';
      ctx.fill();


      // Recursively call function when next browser frame is ready (animate)
      // requestAnimationFrame(draw);
    };

    // Initial animation frame
    requestAnimationFrame(draw);

  }, [ballPosition, ballVelocity]);

  const game = () => {
    const canvas = canvasRef.current;
    canvas.width = wrapperRef.current.offsetWidth;
    const width = canvas.width;
    const height = canvas.height;

    const ballRadius = 15;
    const startAngle = 0;
    const endAngle = 2 * Math.PI;

    const ctx = canvas.getContext("2d");

    const draw = (timestamp) => {
      ctx.clearRect(0, 0, width, height);
      const elapsed = timestamp - lastTimestampRef.current;
      lastTimestampRef.current = timestamp;
      // Draw paddle
      ctx.beginPath();
      const paddleHeight = 100;
      const paddleX = width - 30;
      let paddleY = mouseYPosition - canvasRef.current.offsetTop;
      if (paddleY > height - paddleHeight) paddleY = height - paddleHeight;
      if (paddleY < 0) paddleY = 0;

      ctx.fillStyle = '#51e251';
      ctx.rect(paddleX, paddleY, 10, paddleHeight);
      ctx.fill();

      // Calculate new ball position
      const newBallPosition = [
        ballPosition[0] + ballVelocity[0] * (elapsed / 16), // Adjust 16 to control speed
        ballPosition[1] + ballVelocity[1] * (elapsed / 16), // Adjust 16 to control speed
      ];

      // Inverse velocity if collision with boundaries
      if (newBallPosition[0] > width - ballRadius) {
        // game over
        if (!isOver) {
          endAudio.current.play();
          setBallVelocity([0,0]);
          setIsOver(true);
        }
      } else if (newBallPosition[0] < 0 + ballRadius) {
        wallAudio.current.play();
        if (!isColliding) {
          setBallVelocity([ -ballVelocity[0], ballVelocity[1] ]);
          setIsColliding(true);
        }
      } else  if (newBallPosition[1] < 0 + ballRadius || newBallPosition[1] > height - ballRadius) {
        wallAudio.current.play();
        if (!isColliding) {
          setBallVelocity([ ballVelocity[0], -ballVelocity[1] ]);
          setIsColliding(true);
        }
      } else if ((newBallPosition[1] >= paddleY && newBallPosition[1] <= paddleY + paddleHeight) && (newBallPosition[0] >= paddleX - ballRadius)) {
        paddleAudio.current.play();
        if (!isColliding) {
          setBallVelocity([ -ballVelocity[0] * 1.05, ballVelocity[1] * 1.05])
          setIsColliding(true);
        }
      } else {
        setIsColliding(false)
      }





      // Update ball position
      setBallPosition(newBallPosition);

      // Draw ball based on position
      ctx.beginPath();
      const x = ballPosition[0];
      const y = ballPosition[1];
      ctx.arc(x, y, ballRadius, startAngle, endAngle, true);
      ctx.fillStyle = '#51e251';
      ctx.fill();


      // Recursively call function when next browser frame is ready (animate)
      // requestAnimationFrame(draw);
    };

    // Initial animation frame
    requestAnimationFrame(draw);
  }

  useEffect(() => {
    const mouseListener = window.addEventListener('mousemove', (e) => {
      setMouseYPosition(e.clientY);
    });

    return () => {
      window.removeEventListener('mousemove', mouseListener);
    }
  }, [])

  const handlePlayButtonClick = () => {
    game();
  }

  return (
    <CanvasWrapper ref={wrapperRef}>
      <PlayButton type='text'
                  aria-label='Start Pong Game'
                  onClick={handlePlayButtonClick}
                  $disabled={!isOver}>
      Play
      </PlayButton>
      <audio ref={wallAudio} src="pongWall.mp3"></audio>
      <audio ref={paddleAudio} src="pongPaddle.mp3"></audio>
      <audio ref={endAudio} src="pongEnd.mp3"></audio>
      <Canvas ref={canvasRef} width={400} height={400}></Canvas>
    </CanvasWrapper>
  );
};

export default PongGame;
