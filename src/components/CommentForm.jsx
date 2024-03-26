function CommentForm() {
  return (
    <form method="post">
      <fieldset>
        <legend>Add Comment</legend>
        <label htmlFor="author">Nickname:</label>
        <input
          type="text"
          name="author"
          id="author"
          minLength="3"
          maxLength="64"
          required
        />
        <label htmlFor="content">Text:</label>
        <textarea
          name="content"
          id="content"
          rows="6"
          minLength="3"
          required
        ></textarea>
        <label htmlFor="avatar-colour">Avatar Colour:</label>
        <input
          type="color"
          name="avatar_colour"
          id="avatar-colour"
          defaultValue="#FFB937"
        />
        <button type="submit">Send</button>
      </fieldset>
    </form>
  );
}

export default CommentForm;
