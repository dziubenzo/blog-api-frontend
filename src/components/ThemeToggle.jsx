function ThemeToggle() {
  return (
    <>
      <label className="switch" aria-label="Light/Dark Mode Toggle">
        <input type="checkbox" />
        <div className="slider"></div>
      </label>
    </>
  );
}

export default ThemeToggle;
