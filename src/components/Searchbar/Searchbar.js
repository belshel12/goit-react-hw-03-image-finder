import PropTypes from 'prop-types';
import { Component } from 'react';
import { BsSearch } from 'react-icons/bs';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  SearchContainer,
  Form,
  FormInput,
  SearchButton,
  SearchButtonLabel,
} from './Searchbar.styled';

class Searchbar extends Component {
  state = {
    value: '',
  };

  handleChange = ({ target: { value } }) => {
    this.setState({ value: value.toLowerCase() });
  };

  handleSubmit = evt => {
    evt.preventDefault();

    if (this.state.value.trim() === '') {
      return toast('Enter a search value.');
    }
    this.props.onSearch(this.state.value);
    this.setState({ value: '' });
  };

  render() {
    return (
      <SearchContainer>
        <Form onSubmit={this.handleSubmit}>
          <SearchButton type="submit">
            <SearchButtonLabel></SearchButtonLabel>
            <BsSearch size="20" />
          </SearchButton>

          <FormInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </Form>
      </SearchContainer>
    );
  }
}

// Searchbar.proptypes = {};

export default Searchbar;
