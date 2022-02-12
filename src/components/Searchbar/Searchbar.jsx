import { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

import s from './Searchbar.module.css';

export default function Searchbar({ onSearchSubmit }) {
  const [queryName, setQueryName] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    onSearchSubmit(queryName);
    setQueryName('');
  }

  function handleChange(e) {
    setQueryName(e.target.value);
  }

  return (
    <header className={s.Searchbar}>
      <form onSubmit={handleSubmit} className={s.SearchForm}>
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
          onChange={handleChange}
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}
