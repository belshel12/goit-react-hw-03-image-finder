import { Component } from 'react';
import { Layout } from './Layout';
import { ToastContainer } from 'react-toastify';
import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import LoadButton from 'components/LoadButton';


export class App extends Component {
  state = {
    searchText: '',
    page: 1,
   
  };

  handleSubmit = searchText => {
    this.setState({ searchText, page: 1 });
  };

  handleLoad = () => {
    return this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { searchText, page } = this.state;
    console.log(this.state.searchText);

    return (
      <Layout>
        <Searchbar onSearch={this.handleSubmit} />
        <ImageGallery value={searchText} page={page} />
        {searchText && <LoadButton onLoad={this.handleLoad} />}
        <ToastContainer autoClose={2000} />
      </Layout>
    );
  }
}
