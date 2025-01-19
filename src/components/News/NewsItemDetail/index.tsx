import { News } from '../../../types/news.model';
import { useEffect, useState } from 'react';
import { NewsItemDetailStyled } from './style';

function NewsItemDetail({ item, hideImage }: { item: News[], hideImage: boolean }) {

  const [data, setData] = useState<News | null>(null);

  useEffect(() => {
    setData(item[0]);
    // eslint-disable-next-line
  }, [item]);

  return data && (
    <NewsItemDetailStyled className={`news-details inner${data!.cover ? ' cover' : ''}`}>
      {!hideImage && (
        <figure>
          <img src={`https://api.hbbtv.ir${data!.img}`} alt={data!.title}/>
        </figure>
      )}
      <div className="news-text">
        <h3 className='text-2xl mb-4'>{data!.title}</h3>
        <div className="text-justify">{data!.introtext}</div>
        <div className='text-justify' dangerouslySetInnerHTML={{ __html: data!.fulltext! }}></div>
      </div>
    </NewsItemDetailStyled>
  )

}

export default NewsItemDetail;
