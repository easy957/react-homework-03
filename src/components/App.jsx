import { Component } from 'react';
import ImageGallery from './ImageGallery';
import Searchbar from './Searchbar';

export class App extends Component {
  state = {
    queryName: '',
  };

  handleSearch = query => {
    this.setState({ queryName: query });
  };

  render() {
    const { queryName } = this.state;

    return (
      <>
        <Searchbar onSearchSubmit={this.handleSearch} />
        <ImageGallery queryName={queryName} />
      </>
    );
  }
}
