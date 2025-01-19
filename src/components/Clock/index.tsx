import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { fetchServerTime } from '../../libs/server-time';

const ClockStyled = styled.div`
    font-size: 24px;
    color: white;
`;

const Clock: React.FC = () => {
  const [time, setTime] = useState<Date>(new Date());

  useEffect(() => {
    fetchServerTime().then((date: Date) => {
      setTime(date);
    });
    const intervalId: NodeJS.Timeout = setInterval(() => {
      setTime((prevTime: Date) => new Date(prevTime.getTime() + 1000));
    }, 1000);

    const serverTimeIntervalId: NodeJS.Timeout = setInterval(() => {
      fetchServerTime().then((date: Date) => {
        setTime(date);
      });
    }, 10 * 60 * 1000);

    return () => {
      clearInterval(intervalId);
      clearInterval(serverTimeIntervalId);
    };
  }, []);

  return <ClockStyled>{time.toLocaleTimeString('en-GB')}</ClockStyled>;
};

export default Clock;
