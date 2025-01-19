import { NewsScrollWrapperStyled, NewsStyled } from '../../pages/News/style';
import NewsListItem from './NewsListItem';
import { FocusContext, useFocusable } from '../../libs/spacial-navigation';
import React, { useCallback } from 'react';

function NewsList({ type, items }: any) {

  const { ref, focusKey } = useFocusable();

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
          {items.map((item, index) => (
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
