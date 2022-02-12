import { Component } from 'react';

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
    showModal: false,
    modalImgUrl: '',
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

  toggleModal = (url = '') => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
      modalImgUrl: url,
    }));
  };

  handleSearch = query => {
    this.setState({ queryName: query });
  };

  render() {
    const { status, showModal, modalImgUrl, galleryItems, error } = this.state;

    return (
      <>
        <Searchbar onSearchSubmit={this.handleSearch} />
        <ImageGallery
          galleryItems={galleryItems}
          onImageClick={this.toggleModal}
          status={status}
          error={error}
          onLoadMore={this.onLoadMore}
        />
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={modalImgUrl} alt="Original size" />
          </Modal>
        )}
      </>
    );
  }
}
