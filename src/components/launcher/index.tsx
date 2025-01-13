import React, { useEffect } from 'react';
import { useKeyboardEvents } from '../../contexts/keyboard-events';
import Menu from '../menu';
import { useAppManager } from '../../contexts/app-manager';

function Launcher(props: any) {

  const { register } = useKeyboardEvents('parent-component');

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { buttonVisible, toggleButton, setKeys } = useAppManager();


  useEffect(() => {
    const handlePKey = (event: KeyboardEvent) => {
      console.log('Parent: P key pressed');
    };
    register('p', handlePKey); // Register it once
  }, [register]);

  return (
    <div>
      <h1>Launcher</h1>
      <Menu/>
    </div>
  );
}

export default Launcher;
