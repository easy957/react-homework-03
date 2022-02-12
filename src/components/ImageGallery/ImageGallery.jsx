import { AiFillCaretDown } from 'react-icons/ai';
import { Oval } from 'react-loader-spinner';

import ImageGalleryItem from '../ImageGalleryItem';
import s from './ImageGallery.module.css';

export default function ImageGallery({
  onImageClick,
  status,
  galleryItems,
  error,
  onLoadMore,
}) {
  if (status === 'idle') {
    return <div></div>;
  }

  if (status === 'loading') {
    return (
      <Oval
        ariaLabel="loading-indicator"
        height={80}
        width={80}
        strokeWidth={5}
        color="#303f9f"
        secondaryColor="cornflowerblue"
        wrapperClass={s.Loader}
      />
    );
  }

  if (status === 'rejected') {
    return <h2>{error.message}</h2>;
  }

  if (status === 'resolved' || status === 'loading-more') {
    return (
      <>
        <ul className={s.ImageGallery}>
          {galleryItems.map(item => {
            return (
              <ImageGalleryItem
                key={item.id}
                tags={item.tags}
                previewUrl={item.webformatURL}
                onImageClick={() => onImageClick(item.largeImageURL)}
              />
            );
          })}
        </ul>

        {status === 'resolved' && (
          <button className={s.Button} onClick={onLoadMore}>
            <AiFillCaretDown />
            Load more...
          </button>
        )}

        {status === 'loading-more' && (
          <Oval
            ariaLabel="loading-indicator"
            height={80}
            width={80}
            strokeWidth={5}
            color="#303f9f"
            secondaryColor="cornflowerblue"
            wrapperClass={s.Loader}
          />
        )}
      </>
    );
  }
}
