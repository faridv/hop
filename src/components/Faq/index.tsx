import React, { useCallback, useEffect } from "react";
import { News } from "../../types/news.model";
import FaqItem from "./FaqItem";
import { FaqContainerStyled } from "./style";
import {
  FocusContext,
  useFocusable,
} from "@noriginmedia/norigin-spatial-navigation";

function FaqContainer({ items }: { items: News[] }) {
  const { ref, focusKey, focusSelf } = useFocusable();

  useEffect(() => {
    focusSelf();
  }, [focusSelf]);

  const onItemFocused = useCallback(
    ({ y }: { y: number }) => {
      ref.current.scrollTo({
        top: y > 150 ? y - 150 : 0,
        behavior: "smooth",
      });
    },
    [ref]
  );

  return (
    <FocusContext.Provider value={focusKey}>
      <FaqContainerStyled ref={ref}>
        {items.map((item, index) => (
          <FaqItem
            key={index}
            item={item}
            onFocus={onItemFocused}
            index={index}
          />
        ))}
      </FaqContainerStyled>
    </FocusContext.Provider>
  );
}

export default FaqContainer;
