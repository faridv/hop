import React, { useCallback } from 'react';
import { ISchedule } from '../../types/schedule.model';
import ScheduleItem from './ScheduleItem';
import { ScheduleMainStyled } from './style';
import { FocusContext, useFocusable } from '@noriginmedia/norigin-spatial-navigation';

function ScheduleMain({ items }: { items: ISchedule[] }) {

  const { ref, focusKey } = useFocusable();

  // TODO: set focus on current item and scroll to it on page startup

  const onItemFocused = useCallback(
    ({ y }: { y: number }) => {
      ref.current.scrollTo({
        top: y > 150 ? y - 150 : 0,
        behavior: 'smooth'
      });
    },
    [ref]
  );

  return (
    <FocusContext.Provider value={focusKey}>
      <ScheduleMainStyled>
        <ul ref={ref}>
          {items.map((item: ISchedule, index: number) => (
            <ScheduleItem
              key={index}
              index={index}
              item={item}
              onFocus={onItemFocused}
            />
          ))}
        </ul>
      </ScheduleMainStyled>
    </FocusContext.Provider>
  );
}

export default ScheduleMain;
