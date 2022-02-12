import s from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({ tags, previewUrl, onImageClick }) {
  return (
    <li className={s.ImageGalleryItem}>
      <img
        className={s.ImageGalleryItem_image}
        src={previewUrl}
        alt={tags}
        onClick={onImageClick}
      />
    </li>
  );
}
