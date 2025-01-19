import QuranSurahListItemStyled from './QuranSurahListItem';
import { QuranSurahListStyled } from './style';
import { FocusContext, useFocusable } from '../../libs/spacial-navigation';
import { useCallback } from 'react';
import { Surah } from '../../types/quran-surah.model';

function QuranSurahList({ items }: { items: Surah[] }) {

  const { ref, focusKey } = useFocusable();

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
      <QuranSurahListStyled>
        <ul ref={ref}>
          {items.map((item: Surah, index: number) => (
            <QuranSurahListItemStyled
              key={index}
              index={index}
              item={item}
              onFocus={onItemFocused}
            />
          ))}
        </ul>
      </QuranSurahListStyled>
    </FocusContext.Provider>
  );
}

export default QuranSurahList;
