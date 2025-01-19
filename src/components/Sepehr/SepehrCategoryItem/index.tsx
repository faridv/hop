import React from "react";
import { FocusableComponentLayout, FocusDetails, KeyPressDetails, useFocusable } from '../../../libs/spacial-navigation';
import { SepehrItemImageWrapper, SepehrItemInnerStyled, SepehrItemTitle, SepehrItemWrapperStyled } from './style';

interface AssetProps {
  index: number;
  isShuffleSize: boolean;
  title: string;
  color: string;
  onEnterPress: (props: object, details: KeyPressDetails) => void;
  onFocus: (
    layout: FocusableComponentLayout,
    props: object,
    details: FocusDetails
  ) => void;
}

function SepehrCategoryItem({
                              item,
                              onEnterPress,
                              onFocus,
                              index
                            }: AssetProps) {
  const { ref, focused } = useFocusable({
    onEnterPress,
    onFocus,
    // extraProps: {
    //   title,
    // }
  });

  return (
    <SepehrItemWrapperStyled ref={ref}>
      <SepehrItemInnerStyled
        index={index}
        focused={focused}
      >
        <SepehrItemImageWrapper>
          <img
            src={item.preview}
            alt={item.name}/>
        </SepehrItemImageWrapper>
        <SepehrItemTitle>{item.name}</SepehrItemTitle>
      </SepehrItemInnerStyled>
    </SepehrItemWrapperStyled>
  );
}

export default SepehrCategoryItem;
