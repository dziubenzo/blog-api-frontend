import { useState } from 'react';
import { changeTheme, getThemeFromLocalStorage } from '../helpers';

function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(getThemeFromLocalStorage());

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

export default ThemeToggle;
