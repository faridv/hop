import { NewsScrollWrapperStyled, NewsStyled } from '../../pages/News/style';
import NewsListItem from './NewsListItem';
import { FocusContext, useFocusable } from '@noriginmedia/norigin-spatial-navigation';
import React, { useCallback, useEffect } from 'react';
import { News } from '../../types/news.model';

function NewsList({ type, items }: any) {

  const { ref, focusKey, focusSelf } = useFocusable();

  useEffect(() => {
      focusSelf();
    }, [focusSelf]);

  const onItemFocused = useCallback(
    ({ y }: { y: number }) => {
      ref.current.scrollTo({
        top: y,
        behavior: 'smooth'
      });
    },
    [ref]
  );

  return (
    <FocusContext.Provider value={focusKey}>
      <NewsStyled>
        <NewsScrollWrapperStyled ref={ref}>
          {items.map((item: News, index: number) => (
            <NewsListItem
              itemType={type}
              index={index}
              key={`${type}-${item.id}`}
              item={item}
              onFocus={onItemFocused}
            />
          ))}
        </NewsScrollWrapperStyled>
      </NewsStyled>
    </FocusContext.Provider>
  );
}


export default NewsList;
