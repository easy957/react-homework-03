import { useState, useEffect } from 'react';

import { AiFillCaretDown } from 'react-icons/ai';
import { Oval } from 'react-loader-spinner';

import pixabayAPI from '../services/pixabay-api';

import Modal from './Modal';
import ImageGallery from './ImageGallery';
import Searchbar from './Searchbar';

export function App() {
  const [queryName, setQueryName] = useState('');
  const [galleryItems, setGalleryItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const [modalImgUrl, setModalImgUrl] = useState(null);

  useEffect(() => {
    function fetchGalleryItems() {
      setStatus(currentPage === 1 ? 'loading' : 'loading-more');
      pixabayAPI
        .fetchImages(queryName, currentPage)
        .then(res => {
          setGalleryItems(prevItems => [...prevItems, ...res.data.hits]);
          setStatus('resolved');
        })
        .catch(error => {
          setStatus('rejected');
          setError(error);
        });
    }

    if (queryName !== '' && currentPage !== 0) {
      fetchGalleryItems();
    }
  }, [currentPage, queryName]);

  function handleSearch(query) {
    setGalleryItems([]);
    setQueryName(query);
    setCurrentPage(1);
  }

  function toggleModal(url = null) {
    setModalImgUrl(url);
  }

  function onLoadMore() {
    setCurrentPage(page => page + 1);
  }

  return (
    <>
      {/* Search Bar */}
      <Searchbar onSearchSubmit={handleSearch} />

      {/* Image Gallery */}
      {(status === 'resolved' || status === 'loading-more') && (
        <ImageGallery galleryItems={galleryItems} onImageClick={toggleModal} />
      )}

      {/* Load More Button */}
      {status === 'resolved' && (
        <button className="Button" onClick={onLoadMore}>
          <AiFillCaretDown />
          Load more...
        </button>
      )}

      {/* Loading Indicator */}
      {(status === 'loading-more' || status === 'loading') && (
        <Oval
          ariaLabel="loading-indicator"
          height={80}
          width={80}
          strokeWidth={5}
          color="#303f9f"
          secondaryColor="cornflowerblue"
          wrapperClass="Loader"
        />
      )}

      {/* Error Message */}
      {status === 'rejected' && <h2>{error.message}</h2>}

      {/* Modal */}
      {modalImgUrl && (
        <Modal onClose={toggleModal}>
          <img
            src={modalImgUrl}
            alt="Original size"
            style={{ maxHeight: '90vh' }}
          />
        </Modal>
      )}
    </>
  );
}
