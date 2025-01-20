import React from "react";
import {
  FocusableComponentLayout,
  FocusDetails,
  useFocusable,
} from "@noriginmedia/norigin-spatial-navigation";
import {
  SepehrItemImageWrapper,
  SepehrItemInnerStyled,
  SepehrItemTitle,
  SepehrItemWrapperStyled,
} from "./style";

interface AssetProps {
  index: number;
  onFocus: (
    layout: FocusableComponentLayout,
    props: object,
    details: FocusDetails
  ) => void;
  item: { id: string; [key: string]: any };
}

function SepehrCategoryItem({ item, onFocus, index }: AssetProps) {
  const { ref, focused } = useFocusable({
    onFocus,
    // extraProps: {
    //   title,
    // }
  });

  return (
    <SepehrItemWrapperStyled ref={ref}>
      <SepehrItemInnerStyled focused={focused}>
        <SepehrItemImageWrapper>
          <img src={item.preview} alt={item.name} />
        </SepehrItemImageWrapper>
        <SepehrItemTitle>{item.name}</SepehrItemTitle>
      </SepehrItemInnerStyled>
    </SepehrItemWrapperStyled>
  );
}

export default SepehrCategoryItem;
