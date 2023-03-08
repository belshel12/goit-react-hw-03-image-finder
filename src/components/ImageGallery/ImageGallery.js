import { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
  };

  async componentDidUpdate(prevProps, prevState) {
    const { query } = this.props;
    const { images, value, page } = this.state;

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
      // this.setState({ images: [], loading: true });
      try {
        this.setState({ loading: true });

        const result = await getApi(query, page);

        this.setState({
          loading: false,
        });

        if (result.hits.length) {
          this.setState(prevState => {
            return { images: [...prevState.images, ...result.hits] };
          });
        } else {
          this.setState({ images: [], page: 1 });
        }
      } catch (error) {
        return toast(error.message);
      }
    }
  }

  handleLoad = () => {
    this.setState({ loading: true });
    return this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    console.log(this.state.images);
    const { images, loading } = this.state;

    return (
      <div>
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

        {!loading && <LoadButton onLoad={this.handleLoad} />}
      </div>
    );
  }
}

export default ImageGallery;
