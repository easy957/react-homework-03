import ImageGalleryItem from '../ImageGalleryItem';
import s from './ImageGallery.module.css';

export default function ImageGallery({ onImageClick, galleryItems }) {
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
    </>
  );
}
