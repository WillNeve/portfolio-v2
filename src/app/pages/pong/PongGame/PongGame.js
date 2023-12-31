import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { boxSeperationAnim, hexToRgba, textSeperationAnim } from '@/app/config/utilities';

const Canvas = styled.canvas`
  width: 100%;
  height: 100%;
  max-height: 500px;
  background: ${props => props.theme.backgroundBlack};
  border: 2px solid ${props => props.theme.hackerGreen};
  ${props => boxSeperationAnim(props.theme.hackerGreen, .5)};
`;

const CanvasWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 80%;
  max-width: 600px;
  /* margin: 0 auto; */
  /* padding: 20px; */
`;

const Controls = styled.div`
  display: flex;
  column-gap: 5px;
  position: absolute;
  top: 30px;
  left: 50%;
  transform: translate(-50%, 0);
  color: ${props => props.theme.hackerGreen};
  font-size: 16px;
  @media (min-width: 575px) {
    font-size: 20px;
  }
  & > button {
    color: inherit;
  }
  & > button, & > p {
    ${props => textSeperationAnim(props.theme.hackerGreen, .5)};
  }
`;

const ControlButton = styled.button`
  display: ${props => props.$disabled ? 'none' : 'block'};
  outline: none;
  background: none;
  border: 2px solid ${props => props.theme.hackerGreen};
  font-size: inherit;
  padding: 5px;
  transition: background .1s linear;
  cursor: pointer;
  &:hover {
    background: ${props => props.theme.foregroundWhite};
  }
`;

const Score = styled.p`
  display: ${props => props.$disabled ? 'none' : 'block'};
  width: fit-content;
  animation: none;
`;

const PongGame = () => {
  const canvasRef = useRef(null);
  const lastTimestampRef = useRef(0);

  //audio
  const wallAudio = useRef(null);
  const paddleAudio = useRef(null);
  const endAudio = useRef(null);

  const [ballPosition, setBallPosition] = useState([20, 20]);
  const [ballVelocity, setBallVelocity] = useState([3, 6]);
  const [mouseYPosition, setMouseYPosition] = useState(0);
  const [isColliding, setIsColliding] = useState([false, false])
  const [score, setScore] = useState(0);

  const [gameRunning, setGameRunning] = useState(false);
  const [gameReset, setGameReset] = useState(true);

  const startGame = () => {
    setGameRunning(true);
    setGameReset(false);
    draw();
  }

  const endGame = () => {
    setGameRunning(false);
    endAudio.current.play();
  }

  const resetGame = () => {
    setGameReset(true);
    setBallPosition([20,20]);
    setBallVelocity([3,6]);
    setScore(0);
  }

  const resizeCanvas = () => {
    canvasRef.current.width = canvasRef.current.offsetWidth;
    canvasRef.current.height = canvasRef.current.offsetHeight;
    draw();
  }

  const draw = (timestamp) => {
    const canvas = canvasRef.current;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    const ballRadius = 15;
    const startAngle = 0;
    const endAngle = 2 * Math.PI;


    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    const elapsed = timestamp - lastTimestampRef.current; // count time between frames to calc refresh rate (hz)
    lastTimestampRef.current = timestamp;

    ctx.beginPath();
    const paddleHeight = 100;
    const paddleX = canvasWidth - 30;
    let paddleY = mouseYPosition - (canvasRef.current.offsetTop + canvasRef.current.offsetParent.offsetTop) - (paddleHeight / 2);
    if (paddleY > canvasHeight - paddleHeight) paddleY = canvasHeight - paddleHeight;
    if (paddleY < 0) paddleY = 0;

    ctx.fillStyle = '#51e251';
    ctx.rect(paddleX, paddleY, 10, paddleHeight);
    ctx.fill();



    const newBallPosition = elapsed ? [
      ballPosition[0] + (ballVelocity[0] * (elapsed / 16)), // 16ms elapsed (60hz)
      ballPosition[1] + (ballVelocity[1] * (elapsed / 16)),
    ] : [
      ballPosition[0] + (ballVelocity[0]),
      ballPosition[1] + (ballVelocity[1]),
    ];

    if (newBallPosition[0] > canvasWidth - ballRadius) {
      if (gameRunning) {
        endGame();
      }
    } else if (newBallPosition[0] < 0 + ballRadius) {
      wallAudio.current.play();
      if (!isColliding[0]) {
        setBallVelocity([ -ballVelocity[0], ballVelocity[1] ]);
        setIsColliding([true, isColliding[1]]);
      }
    } else  if (newBallPosition[1] < 0 + ballRadius || newBallPosition[1] > canvasHeight - ballRadius) {
      wallAudio.current.play();
      if (!isColliding[1]) {
        setBallVelocity([ ballVelocity[0], -ballVelocity[1] ]);
        setIsColliding([isColliding[0], true]);
      }
    } else if ((newBallPosition[1] >= paddleY && newBallPosition[1] <= paddleY + paddleHeight) && (newBallPosition[0] >= paddleX - ballRadius)) {
      paddleAudio.current.play();
      if (!isColliding[0]) {
        setBallVelocity([ -ballVelocity[0] * 1.05, ballVelocity[1] * 1.05])
        setIsColliding([true, isColliding[1]]);
        setScore(score + 1);
      }
    } else {
      setIsColliding([false, false])
    }

    setBallPosition(newBallPosition);

    ctx.beginPath();
    const x = ballPosition[0];
    const y = ballPosition[1];
    ctx.arc(x, y, ballRadius, startAngle, endAngle, true);
    ctx.fillStyle = '#51e251';
    ctx.fill();

  }

  useEffect(() => {
    if (gameRunning) {
      requestAnimationFrame(draw)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ballPosition, ballVelocity])

  useEffect(() => {
    draw();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameReset])

  useEffect(() => {
    setTimeout(() => {
      resizeCanvas();
    }, 100);

    const mouseMoveListener = (e) => {
      setMouseYPosition(e.clientY);
    };

    const touchMoveListener = (e) => {
      e.preventDefault();
      setMouseYPosition(e.touches[0].clientY);
    };

    const resizeListener = (e) => {
      resizeCanvas();
    };



    window.addEventListener('mousemove', mouseMoveListener);
    window.addEventListener('touchmove', touchMoveListener, { passive: false });
    window.addEventListener('resize', resizeListener);

    return () => {
      window.removeEventListener('mousemove', mouseMoveListener);
      window.removeEventListener('touchmove', touchMoveListener);
      window.removeEventListener('resize', resizeListener);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handlePlayButtonClick = () => {
    startGame();
  }

  const handleResetButtonClick = () => {
    resetGame();
  }

  return (
    <CanvasWrapper>
      <Controls>
        <ControlButton type='text'
                    aria-label='Start Pong Game'
                    onClick={handlePlayButtonClick}
                    $disabled={gameRunning || !gameReset}>
        PLAY
        </ControlButton>
        <ControlButton type='text'
                    aria-label='Reset Pong Game'
                    onClick={handleResetButtonClick}
                    $disabled={gameRunning || gameReset}>
        RESET
        </ControlButton>
        <Score $disabled={!gameRunning && gameReset}>
          {`SCORE: ${score}`}
        </Score>
      </Controls>
      <audio ref={wallAudio} src="pongWall.mp3"></audio>
      <audio ref={paddleAudio} src="pongPaddle.mp3"></audio>
      <audio ref={endAudio} src="pongEnd.mp3"></audio>
      <Canvas ref={canvasRef} width={400} height={400}>
      </Canvas>
    </CanvasWrapper>
  );
};

export default PongGame;
