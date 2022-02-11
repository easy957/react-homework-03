import { Component } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

import s from './Searchbar.module.css';

export default class Searchbar extends Component {
  state = {
    queryName: '',
  };

  handleChange = e => {
    this.setState({ queryName: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.onSearchSubmit(this.state.queryName);
    this.setState({ queryName: '' });
  };

  render() {
    const { queryName } = this.state;

    return (
      <header className={s.Searchbar}>
        <form onSubmit={this.handleSubmit} className={s.SearchForm}>
          <button type="submit" className={s.SearchForm_button}>
            <AiOutlineSearch className={s.SearchForm_icon} />
            <span className={s.SearchForm_button_label}>Search</span>
          </button>

          <input
            className={s.SearchForm_input}
            type="text"
            autoComplete="off"
            autoFocus
            name="queryName"
            value={queryName}
            onChange={this.handleChange}
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
