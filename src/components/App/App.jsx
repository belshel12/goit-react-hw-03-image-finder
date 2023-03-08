import { Component } from 'react';
import { Layout } from './Layout';
import { ToastContainer } from 'react-toastify';
import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';

export class App extends Component {
  state = {
    searchText: '',
  };

  handleSubmit = searchText => {
    this.setState({ searchText });
  };

  render() {
    const { searchText } = this.state;

    return (
      <Layout>
        <Searchbar onSearch={this.handleSubmit} />
        <ImageGallery query={searchText} />
        <ToastContainer autoClose={2000} />
      </Layout>
    );
  }
}
