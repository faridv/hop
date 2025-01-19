import React, { JSX, useCallback, useEffect, useState } from 'react';
import { StyledInitializer, StyledSplash } from './style';
import { useKeyboardEvents } from '../../contexts/keyboard-events';
import { useNavigate } from 'react-router-dom';

export function Splash({ toggleButton, buttonVisible }: {
  toggleButton: (value?: boolean) => void,
  buttonVisible: boolean
}): JSX.Element {

  const { register } = useKeyboardEvents('splash');
  const navigate = useNavigate();
  const [fadeOut, setFadeOut] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  const start = useCallback(() => {
    navigate('/app');
  }, [navigate]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => toggleButton(false), 1000); // match the duration of the fade-out animation
    }, 5000);
    return () => clearTimeout(timer);
  }, [toggleButton]);

  useEffect(() => {
    if (!fadeIn) {
      toggleButton(true);
      setFadeIn(true);
    }
    register('red,r', start);
  }, [register, start, toggleButton, fadeIn]);

  return (
    <StyledSplash>
      {buttonVisible && (
        <StyledInitializer className={`app-initializer ${fadeIn ? 'fade-in' : ''} ${fadeOut ? 'fade-out' : ''}`} style={{ bottom: '40px', right: '40px' }}>
          <img src="/redbutton3.png" alt="red,r" onClick={start}/>
        </StyledInitializer>
      )}
    </StyledSplash>
  );
}
