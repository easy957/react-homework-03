import { Component } from 'react';
import { AiFillCaretDown } from 'react-icons/ai';
import { Oval } from 'react-loader-spinner';

import pixabayAPI from '../../services/pixabay-api';
import ImageGalleryItem from '../ImageGalleryItem';
import Modal from 'components/Modal';
import s from './ImageGallery.module.css';

export default class ImageGallery extends Component {
  state = {
    galleryItems: [],
    currentPage: 0,
    status: 'idle',
    error: null,
    showModal: false,
    modalImgUrl: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const { queryName } = this.props;
    const { currentPage } = this.state;

    if (prevProps.queryName !== queryName) {
      this.setState({ galleryItems: [], currentPage: 1 });
    }

    if (prevState.currentPage !== currentPage) {
      this.fetchGalleryItems(queryName, currentPage);
    }
  }

  fetchGalleryItems = (queryName, currentPage) => {
    this.setState({ status: 'loading' }, () => {
      pixabayAPI
        .fetchImages(queryName, currentPage)
        .then(res => {
          this.setState(prevState => ({
            galleryItems: [...prevState.galleryItems, ...res.data.hits],
            status: 'resolved',
          }));
        })
        .catch(error => {
          this.setState({ status: 'rejected', error });
        });
    });
  };

  onLoadMore = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
    }));
  };

  toggleModal = (url = '') => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
      modalImgUrl: url,
    }));
  };

  render() {
    const { galleryItems, status, error, showModal, modalImgUrl } = this.state;

    if (status === 'idle') {
      return <div></div>;
    }

    if (status === 'loading' && galleryItems.length === 0) {
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

    if (status === 'loading' && galleryItems.length > 0) {
      return (
        <>
          <ul className={s.ImageGallery}>
            {galleryItems.map(item => {
              return (
                <ImageGalleryItem
                  key={item.id}
                  tags={item.tags}
                  previewUrl={item.webformatURL}
                  largeUrl={item.largeImageURL}
                />
              );
            })}
          </ul>
          <Oval
            ariaLabel="loading-indicator"
            height={80}
            width={80}
            strokeWidth={5}
            color="#303f9f"
            secondaryColor="cornflowerblue"
            wrapperClass={s.Loader}
          />
        </>
      );
    }

    if (status === 'rejected') {
      return <p>{error.message}</p>;
    }

    if (status === 'resolved') {
      return (
        <>
          <ul className={s.ImageGallery}>
            {galleryItems.map(item => {
              return (
                <ImageGalleryItem
                  key={item.id}
                  tags={item.tags}
                  previewUrl={item.webformatURL}
                  originalUrl={item.largeImageURL}
                  onImageClick={this.toggleModal}
                />
              );
            })}
          </ul>
          <button className={s.Button} onClick={this.onLoadMore}>
            <AiFillCaretDown />
            Load more...
          </button>
          {showModal && (
            <Modal onClose={this.toggleModal}>
              <img src={modalImgUrl} alt="Original size" />
            </Modal>
          )}
        </>
      );
    }
  }
}
