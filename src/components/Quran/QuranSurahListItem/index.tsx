import { Surah } from '../../../types/quran-surah.model';
import { RefObject } from 'react';
import { QuranSurahListItemInnerStyled, QuranSurahListItemStyled } from './style';
import { useFocusable } from '../../../libs/spacial-navigation';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import React from 'react';

interface QuranSurahListItemProps {
  item: Surah;
  onFocus: (layout: any, props: object, details: any) => void;
  index: number;
}

function QuranSurahListItem({ item, onFocus, index }: QuranSurahListItemProps) {

  const navigate: NavigateFunction = useNavigate();

  const { ref, focused }: { ref: RefObject<any>; focused: boolean; } = useFocusable({
    onFocus: onFocus,
    onEnterPress: (): void | Promise<void> => open(),
  });

  const open = (): void => {
    navigate(`/app/quran/${item.id}`);
  }

  return (
    <QuranSurahListItemStyled ref={ref}>
      <QuranSurahListItemInnerStyled focused={focused}>
        <div className="desc">
          <h3 className="font-qurani"><span>{item.id}.</span> {item.title}</h3>
          <div className="meta">
            <p>{item.type.toLowerCase() === 'Meccan' ? ('مکی') : ('مدنی')}</p>
            <p>تعداد آیات: <span>{item.verses}</span></p>
          </div>
        </div>
      </QuranSurahListItemInnerStyled>
    </QuranSurahListItemStyled>
  );
}

export default QuranSurahListItem;
