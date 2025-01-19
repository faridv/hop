import { useCallback, useRef } from 'react';
import { FocusContext, useFocusable } from '../../../libs/spacial-navigation';
import { SepehrRowScrollingContent, SepehrRowScrollWrapper, SepehrRowTitle, SepehrRowWrapper } from './style';
import SepehrCategoryItem from '../SepehrCategoryItem';


function SepehrCategory({
                          title: rowTitle,
                          onFocus,
                          items,
                        }) {
  const { ref, focusKey } = useFocusable({
    onFocus
  });

  const scrollingRef = useRef(null);

  const onAssetFocus = useCallback(
    ({ x }: { x: number }) => {
      scrollingRef.current.scrollTo({
        left: x,
        behavior: 'smooth'
      });
    },
    [scrollingRef]
  );

  return (
    <FocusContext.Provider value={focusKey}>
      <SepehrRowWrapper ref={ref}>
        <SepehrRowTitle>{rowTitle}</SepehrRowTitle>
        <SepehrRowScrollWrapper ref={scrollingRef}>
          <SepehrRowScrollingContent>
            {items.map((item, index) => (
              <SepehrCategoryItem
                index={index}
                item={item}
                key={`${rowTitle}-${item.id}`}
                onFocus={onAssetFocus}
              />
            ))}
          </SepehrRowScrollingContent>
        </SepehrRowScrollWrapper>
      </SepehrRowWrapper>
    </FocusContext.Provider>
  );
}

export default SepehrCategory;
