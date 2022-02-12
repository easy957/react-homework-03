import { Component } from 'react';

import { AiFillCaretDown } from 'react-icons/ai';
import { Oval } from 'react-loader-spinner';

import pixabayAPI from '../services/pixabay-api';

import Modal from './Modal';
import ImageGallery from './ImageGallery';
import Searchbar from './Searchbar';

export class App extends Component {
  state = {
    queryName: '',
    galleryItems: [],
    currentPage: 0,
    status: 'idle',
    error: null,
    modalImgUrl: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { currentPage, queryName } = this.state;

    if (prevState.queryName !== queryName) {
      this.setState({ galleryItems: [], currentPage: 1 });
    }

    if (prevState.currentPage !== currentPage) {
      this.fetchGalleryItems(queryName, currentPage);
    }
  }

  fetchGalleryItems = (queryName, currentPage) => {
    this.setState(
      { status: currentPage === 1 ? 'loading' : 'loading-more' },
      () => {
        pixabayAPI
          .fetchImages(queryName, currentPage)
          .then(res => {
            this.setState(prevState => ({
              galleryItems: [...prevState.galleryItems, ...res.data.hits],
              status: 'resolved',
              isLoadingMore: false,
            }));
          })
          .catch(error => {
            this.setState({ status: 'rejected', error });
          });
      }
    );
  };

  onLoadMore = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
      isLoadingMore: true,
    }));
  };

  toggleModal = (url = null) => {
    this.setState(prevState => ({
      modalImgUrl: url,
    }));
  };

  handleSearch = query => {
    this.setState({ queryName: query });
  };

  render() {
    const { status, modalImgUrl, galleryItems, error } = this.state;

    return (
      <>
        {/* Search Bar */}
        <Searchbar onSearchSubmit={this.handleSearch} />

        {/* Image Gallery */}
        {(status === 'resolved' || status === 'loading-more') && (
          <ImageGallery
            galleryItems={galleryItems}
            onImageClick={this.toggleModal}
          />
        )}

        {/* Load More Button */}
        {status === 'resolved' && (
          <button className="Button" onClick={this.onLoadMore}>
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
          <Modal onClose={this.toggleModal}>
            <img src={modalImgUrl} alt="Original size" />
          </Modal>
        )}
      </>
    );
  }
}
