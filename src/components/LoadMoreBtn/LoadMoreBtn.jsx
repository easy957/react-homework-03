import { AiFillCaretDown } from 'react-icons/ai';
import './LoadMoreBtn.css';

export default function LoadMoreBtn({ onClick }) {
  return (
    <button className="Button" onClick={onClick}>
      <AiFillCaretDown />
      Load more...
    </button>
  );
}
