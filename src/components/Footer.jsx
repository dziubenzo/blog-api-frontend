import PropTypes from 'prop-types';

function Footer({ isDarkMode }) {
  return (
    <>
      <p>
        created by <span>dziubenzo</span>
      </p>
      <a
        href="https://github.com/dziubenzo/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Developer's GitHub page, opens in new tab"
      >
        <img
          src={isDarkMode ? 'github-dark-theme.svg' : 'github-light-theme.svg'}
          alt="GitHub Logo"
        />
      </a>
    </>
  );
}

Footer.propTypes = {
  isDarkMode: PropTypes.bool,
};

export default Footer;
