import { Ayah, SurahDetail } from '../../../types/quran-surah.model';
import { AyahContainerStyled, SurahStyled } from './style';
import { useFocusable, FocusContext } from '@noriginmedia/norigin-spatial-navigation';
import QuranAyah from '../QuranAyah';
import { useCallback } from 'react';
import React from 'react';

function QuranSurahDetail({ items }: { items: SurahDetail[] }) {

  const { ref, focusKey } = useFocusable();

  const onItemFocused = useCallback(
    ({ y }: { y: number }) => {
      ref.current.scrollTo({
        top: y > 50 ? y - 50 : 0,
        behavior: 'smooth'
      });
    },
    [ref]
  );

  return (
    <FocusContext.Provider value={focusKey}>
      <SurahStyled>
        <AyahContainerStyled ref={ref}>
          <div className='header'>
            <h2>{items[0].name}</h2>
            {items[0].number !== 9 && <div className="bismillah">﻿بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>}
          </div>
          <div className='body'>
            {items[0].ayahs.map((ayah: Ayah, index: number) => (
              <QuranAyah
                key={index}
                index={index}
                text={ayah.text}
                number={ayah.number}
                translation={items[1].ayahs[index].text}
                onFocus={onItemFocused}
              />
            ))}
          </div>
        </AyahContainerStyled>
      </SurahStyled>
    </FocusContext.Provider>
  );
}

export default QuranSurahDetail;
