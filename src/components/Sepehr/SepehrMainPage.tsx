import { SepehrCategoriesContainerStyled, SepehrStyled } from '../../pages/Sepehr/style';
import { FocusContext, useFocusable } from '../../libs/spacial-navigation';
import React, { useCallback } from 'react';
import SepehrCategory from './SepehrCategory';

function SepehrMainPage({ categories, channels }) {

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
      <SepehrStyled>
        <div className="powered-by">
          <span>قدرت گرفته از </span>
          <img src='/sepehr-logo.png' alt='sepehr-logo'/>
        </div>
        <SepehrCategoriesContainerStyled ref={ref}>
          {categories.map((category, index) => (
            <SepehrCategory
              key={category.id}
              index={index}
              title={category.name}
              items={channels[category.id]}
              onFocus={onItemFocused}
            />
          ))}
        </SepehrCategoriesContainerStyled>
      </SepehrStyled>
    </FocusContext.Provider>
  )
}

export default SepehrMainPage;
