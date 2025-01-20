import React, { RefObject } from "react";
import { News } from "../../../types/news.model";
import { FaqItemStyled } from "./style";
import { useFocusable } from "@noriginmedia/norigin-spatial-navigation";

interface FaqItemProps {
  item: News;
  onFocus: ({ y }: { y: number }) => void;
  index: number;
}

function FaqItem({ item, onFocus, index }: FaqItemProps) {
  const {
    ref,
    focused,
  }: { ref: RefObject<any>; focused: boolean; focusSelf: () => void } =
    useFocusable({
      onFocus: onFocus,
    });

  return (
    <FaqItemStyled ref={ref} className={focused ? "active" : ""}>
      <div>
        <h3 className="font-bold">{item.title}</h3>
        <div className="desc">
          <div className="text-justify">{item.introtext}</div>
          <div
            className="text-justify"
            dangerouslySetInnerHTML={{ __html: item.fulltext! }}
          ></div>
        </div>
      </div>
    </FaqItemStyled>
  );
}

export default FaqItem;
