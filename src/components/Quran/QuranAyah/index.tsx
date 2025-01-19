import { AyahContainerStyled } from './style';
import { RefObject } from 'react';
import { useFocusable } from '../../../libs/spacial-navigation';

function QuranAyah({ text, translation, number, index, onFocus }) {

  const { ref, focused }: { ref: RefObject<any>; focused: boolean; } = useFocusable({
    onFocus: onFocus,
  });


  return (
    <AyahContainerStyled ref={ref} index={index} focused={focused}>
      <div
        className='ayah'
      >
        <span>{number}</span>
        <p>{text}</p>
        <p className='translation'>{translation}</p>
      </div>
    </AyahContainerStyled>
  )
}

export default QuranAyah;
