import { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';
import { getApi } from '../../services/getApi';
import { GalleryList } from './ImageGallery.styled';
import Loader from 'components/Loader';
import ImageGalleryItem from 'components/ImageGalleryItem';
import LoadButton from 'components/LoadButton';

class ImageGallery extends Component {
  state = {
    images: [],
    value: '',
    loading: false,
    page: 1,
    totalImages: 0,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { query } = this.props;
    const { value, page } = this.state;

    if (query !== prevProps.query) {
      this.setState({ value: query });
    }

    if (value !== prevState.value) {
      this.setState({
        images: [],
        page: 1,
      });
    }

    if (
      (query !== prevProps.query && page === 1) ||
      (query === prevProps.query && page !== prevState.page)
    ) {
      try {
        this.setState({ loading: true });

        const result = await getApi(query, page);

        this.setState({
          loading: false,
          totalImages: result.totalHits,
        });

        if (result.hits.length) {
          this.setState(prevState => {
            return { images: [...prevState.images, ...result.hits] };
          });
        } else {
          this.setState({ images: [], page: 1 });
        }
      } catch (error) {
        toast(error.message);
        this.setState({ images: [], page: 1, loading: false });
        return;
      }
    }
  }

  handleLoad = () => {
    return this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { images, loading, totalImages } = this.state;

    return (
      <>
        {loading && <Loader />}

        <GalleryList>
          {images.map(item => {
            return (
              <li key={item.id}>
                <ImageGalleryItem
                  largeUrl={item.largeImageURL}
                  webUrl={item.webformatURL}
                  alt={item.tags}
                />
              </li>
            );
          })}
        </GalleryList>

        {images.length > 0 && images.length < totalImages && (
          <LoadButton onLoad={this.handleLoad} />
        )}
      </>
    );
  }
}

ImageGallery.propTypes = {
  query: PropTypes.string.isRequired,

};

export default ImageGallery;
