import { NewsItemInnerStyled, NewsItemStyled } from './style';
import { useFocusable } from '@noriginmedia/norigin-spatial-navigation';
import { RefObject } from 'react';
import { News } from '../../../types/news.model';
import { useNavigate } from 'react-router-dom';
import React from 'react';

interface NewsListItemProps {
  item: News;
  // onEnterPress: (props: object, details: any) => void;
  onFocus: (layout: any, props: object, details: any) => void;
  index: number;
  itemType: string;
}

function NewsListItem({ item, onFocus, index, itemType }: NewsListItemProps) {

  const navigate = useNavigate();
  const { ref, focused }: { ref: RefObject<any>; focused: boolean; } = useFocusable({
    onFocus: onFocus,
    onEnterPress: (): void | Promise<void> => open(),
  });

  const open = () => navigate(`/app/${itemType}/${item.id}`);

  return (
    <NewsItemStyled onClick={open} ref={ref}>
      <NewsItemInnerStyled focused={focused}>
        <figure>
          <img src={`https://api.hbbtv.ir${item.img}`} alt={item.title}/>
        </figure>
        <div className="desc">
          <h3>
            <span className="title">{item.title}</span>
          </h3>
          <p className="summary">{item.introtext}</p>
        </div>
      </NewsItemInnerStyled>
    </NewsItemStyled>
  );
}

export default NewsListItem;
