import React, { useEffect } from 'react';
import { useKeyboardEvents } from '../../contexts/keyboard-events';

function Menu(props: any) {
  const { register } = useKeyboardEvents('child-component');

  useEffect(() => {

    register('p', (event: KeyboardEvent) => {
      console.log('Child: P key pressed');
    }, 1); // Register it once

    register('c', (event: KeyboardEvent) => {
      console.log('Child: C key pressed');
    }, 1); // Register it once

  }, [register]);

  return (
    <div>
      <h2>Menu</h2>
    </div>
  );
}

export default Menu;
