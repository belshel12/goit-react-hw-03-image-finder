import { Component } from 'react';
import { getApi } from './getApi';
import { ImageGalleryItem } from './ImageGalleryItem';
import { GalleryList } from './ImageGallery.styled';
import Loader from 'components/Loader';
import Modal from 'components/Modal';

class ImageGallery extends Component {
  state = {
    images: [],
    error: '',
    loading: false,
    showModal: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.value !== this.props.value ||
      prevProps.page !== this.props.page
    ) {
      this.setState({ loading: true });

      getApi(this.props.value.trim(), this.props.page)
        .then(images => {
          this.setState({
            images: [...this.state.images, ...images.hits],
          });
        })
        .catch(error => {
          this.setState({ error });
        })
        .finally(() => {
          this.setState({ loading: false });
        });
    }
  }

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { images, error, loading, showModal } = this.state;
    console.log(images);

    return (
      <div>
        {showModal && <Modal onClose={this.toggleModal}></Modal>}
        {error && <h2>{error}</h2>}
        {loading && <Loader />}
        {images && (
          <GalleryList>
            <ImageGalleryItem images={images} onClick={this.toggleModal} />
          </GalleryList>
        )}
      </div>
    );
  }
}

export default ImageGallery;

/* if (status === 'pending') return <Loader />;

    if (status === 'resolved')
      return (
        <div>
          {showModal && <Modal />}
          <GalleryList>
            <ImageGalleryItem images={images} />
          </GalleryList>
        </div>
      );

    if (status === 'rejected') return <h2>{error}</h2>;*/
