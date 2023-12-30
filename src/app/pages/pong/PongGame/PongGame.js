import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const CanvasOuter = styled.canvas`
  margin-top: 20px;
  border: 2px solid ${props => props.theme.hackerGreen};
`;

const PongGame = () => {
  const canvasRef = useRef(null);

  const [ballPosition, setBallPosition] = useState([20, 20]);
  const [ballVelocity, setBallVelocity] = useState([3, 6]);
  const [mouseYPosition, setMouseYPosition] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const width = canvas.width;
    const height = canvas.height;

    const ctx = canvas.getContext("2d");

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

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
      const newBallPosition = [ballPosition[0] + ballVelocity[0], ballPosition[1] + ballVelocity[1]];

      // Inverse velocity if collision with boundaries
      if (newBallPosition[0] > width - 20) {
        // game over
        setBallVelocity([0,0])
        setBallPosition([(width / 2), (height / 2)])
      }
      if (newBallPosition[0] < 0 + 20) {
        setBallVelocity([ -ballVelocity[0], ballVelocity[1] ]);
      }
      if (newBallPosition[1] < 0 + 20 || newBallPosition[1] > height - 20) {
        setBallVelocity([ ballVelocity[0], -ballVelocity[1] ]);
      }
      if ((newBallPosition[1] >= paddleY && newBallPosition[1] <= paddleY + paddleHeight) && (newBallPosition[0] >= paddleX - 20)) {
        console.log('Collided');
        console.log('velocity', ballVelocity);
        setBallVelocity([ -ballVelocity[0] * 1.05, ballVelocity[1] * 1.05])
      }


      // Update ball position
      setBallPosition(newBallPosition);

      // Draw ball based on position
      ctx.beginPath();
      const x = ballPosition[0];
      const y = ballPosition[1];
      const radius = 20;
      const startAngle = 0;
      const endAngle = 2 * Math.PI;
      ctx.arc(x, y, radius, startAngle, endAngle, true);
      ctx.fillStyle = '#51e251';
      ctx.fill();


      // Recursively call function when next browser frame is ready (animate)
      // requestAnimationFrame(draw);
    };

    // Initial animation frame
    requestAnimationFrame(draw);

  }, [ballPosition, ballVelocity]);

  useEffect(() => {
    const mouseListener = window.addEventListener('mousemove', (e) => {
      setMouseYPosition(e.clientY);
    });

    return () => {
      window.removeEventListener('mousemove', mouseListener);
    }
  }, [])

  return (
    <CanvasOuter ref={canvasRef} width={500} height={400} />
  );
};

export default PongGame;
