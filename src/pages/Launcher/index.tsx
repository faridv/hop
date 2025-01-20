import React, { useEffect } from 'react';
import { useKeyboardEvents } from '../../contexts/keyboard-events';
import { useAppManager } from '../../contexts/app-manager';
import SunStatus from '../../components/sun-status';

import { FocusContext } from '@noriginmedia/norigin-spatial-navigation';
// import { init } from '@noriginmedia/norigin-spatial-navigation';
// import { initArrowNavigation } from '@arrow-navigation/core';
// import { FocusableElement, FocusableGroup } from '@arrow-navigation/react';

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
      <SunStatus/>
      <div>
        <FocusContext.Provider value={'TABS'}>
          <div>a</div>
          <div>b</div>
        </FocusContext.Provider>
      </div>
    </div>
  );
}

export default Launcher;
