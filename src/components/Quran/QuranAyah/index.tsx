import { AyahContainerStyled } from './style';
import { RefObject } from 'react';
import { useFocusable } from '../../../libs/spacial-navigation';
import React from 'react';

interface QuranAyahProps {
  text: string;
  translation: string;
  number: number;
  index: number;
  onFocus: ({y}: {y: number}) => void;
}

function QuranAyah({ text, translation, number, index, onFocus }: QuranAyahProps) {

  const { ref, focused }: { ref: RefObject<any>; focused: boolean; } = useFocusable({
    onFocus: onFocus,
  });


  return (
    <AyahContainerStyled ref={ref} focused={focused}>
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
