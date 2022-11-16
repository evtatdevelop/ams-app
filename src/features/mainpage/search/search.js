import React from "react";
import styles from './search.module.scss';
import { useSelector, useDispatch } from "react-redux";
import { user } from "../../user/userSlice";
import { search, onSearch, clearSearch } from "../mainpageSlice";

export const SearchSystems = () => {

  const userData = useSelector(user);
  const value = useSelector(search);
  const dispatch = useDispatch();
  // const [show, onShow] = useState(false);

  return (
    <div className={styles.search}>
      <input type="text" className={styles.inputSearch}
        placeholder={userData['lang'] === 'RU' ? 'Поиск' : 'Search'}
        value = {value}
        onInput={ e => dispatch(onSearch(e.target.value)) }
      />
      {value !== ''
        ? <button type="button" className={styles.clearSearch}
            onClick={() => dispatch(clearSearch())}
          >&times;</button>
        : null
      }

    </div>
    

  )
}