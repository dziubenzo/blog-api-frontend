import { changeTheme } from '../helpers';
import PropTypes from 'prop-types';

function ThemeToggle({ isDarkMode, setIsDarkMode }) {
  return (
    <>
      <label className="switch" aria-label="Light/Dark Mode Toggle">
        <input
          type="checkbox"
          checked={isDarkMode}
          onChange={() => {
            setIsDarkMode(!isDarkMode);
            changeTheme(!isDarkMode);
          }}
        />
        <div className="slider"></div>
      </label>
    </>
  );
}

ThemeToggle.propTypes = {
  isDarkMode: PropTypes.bool,
  setIsDarkMode: PropTypes.func,
};

export default ThemeToggle;
