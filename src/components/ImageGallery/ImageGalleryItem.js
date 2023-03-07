import PropTypes from 'prop-types';

const ImageGalleryItem = ({ images, onClick }) => {
  return images.map(({ id, webformatURL, tags }) => (
    <li key={id}>
      <img
        src={webformatURL}
        alt={tags}
        onClick={onClick}
        width="320"
        height="220"
      />
    </li>
  ));
};

ImageGalleryItem.proptypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      webformatURL: PropTypes.string,
      tags: PropTypes.string,
    })
  ).isRequired,
};

export { ImageGalleryItem };
