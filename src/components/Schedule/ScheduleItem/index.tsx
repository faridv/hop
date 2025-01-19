import { ISchedule } from '../../../types/schedule.model';
import { extractTime, sec2time } from '../../../utils/helpers';
import { ScheduleItemInnerStyled, ScheduleItemStyled } from './style';
import { RefObject, useEffect } from 'react';
import { useFocusable } from '../../../libs/spacial-navigation';

interface ScheduleListItemProps {
  item: ISchedule;
  onFocus: (layout: any, props: object, details: any) => void;
  index: number;
}

export function ScheduleItem({ item, onFocus, index }: ScheduleListItemProps) {

  const { ref, focused, focusSelf }: { ref: RefObject<any>; focused: boolean; focusSelf: () => void; } = useFocusable({
    onFocus: onFocus,
  });

  useEffect(() => {
    if (item.isCurrent) {
      focusSelf();
    }
  }, []);

  return (
    <ScheduleItemStyled ref={ref} index={index} className={item.isCurrent ? 'current' : ''}>
      <ScheduleItemInnerStyled focused={focused}>
        <figure>
          <img src={item.thumbnail} alt={item.episodeTitle}/>
        </figure>
        <div className="desc">
          <h4>{item.programTitle && (<>{item.programTitle}</>)}</h4>
          <h3>{item.episodeTitle}</h3>
          <p className="summary">{item.description}</p>
          <time>
            {extractTime(item.start)}
            <span>{sec2time(item.duration)}</span>
          </time>
        </div>
      </ScheduleItemInnerStyled>
    </ScheduleItemStyled>
  );
}

export default ScheduleItem;
