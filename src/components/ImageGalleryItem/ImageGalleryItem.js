import { Component } from 'react';
import PropTypes from 'prop-types';
import { GalleryItem, Image } from './ImageGalleryItem.styled';
import Modal from 'components/Modal';

class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(prev => {
      return { showModal: !prev.showModal };
    });
  };

  render() {
    const { largeUrl, webUrl, alt } = this.props;

    return (
      <GalleryItem>
        <Image src={webUrl} alt={alt} onClick={this.toggleModal} />
        {this.state.showModal && (
          <Modal onClose={this.toggleModal} url={largeUrl} alt={alt} />
        )}
      </GalleryItem>
    );
  }
}

ImageGalleryItem.propTypes = {
  largeUrl: PropTypes.string.isRequired,
  webUrl: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
