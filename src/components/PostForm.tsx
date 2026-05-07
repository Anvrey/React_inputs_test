import React, { useState } from 'react';
import cn from 'classnames';
import usersFromServer from './api/users.json';
import postsFromServer from './api/posts.json';
import { getUserById } from './services/user';
import { Post } from './types/Post';

type Props = {
  onSubmit: (post: Post) => void;
}

export const PostForm: React.FC<Props> = ({ onSubmit }) => {
  const [userId, setUserId] = useState(0);
  const [hasUserIdError, setHasUserIdError] = useState(false);

  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [body, setBody] = useState('');
  const [hasBodyError, setHasBodyError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
    setHasTitleError(false)
  }

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value)
    setHasUserIdError(false)
  }

  const handleBodyChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(event.target.value)
    setHasBodyError(false)
  }

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    setHasTitleError(!title);
    setHasUserIdError(!userId);
    setHasBodyError(!body);

    if (!title || !userId || !body) {
      return;
    }

    onSubmit({
      id: maxId() + 1,
      userId,
      title,
      body,
      user: getUserById(userId),
    });

    reset();
  }

  const reset = () => {
    setUserId(0);
    setTitle('');
    setBody('');

    setHasTitleError(false)
    setHasUserIdError(false)
    setHasBodyError(false)
  }

  const maxId = () => postsFromServer.reduce((maxId, post) => Math.max(maxId, post.id), 0);

  return (
    <form 
      action="/api/posts" 
      method="POST" 
      className="box" 
      onSubmit={handleSubmit}
      onReset={reset}
    >
      <div className="field">
        <label className="label" htmlFor='post-title'>Title</label>
        <div className={cn("control", {"has-icons-right": hasTitleError})}>
          <input
            className={cn("input", {"is-danger": hasTitleError})}
            id='post-title'
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={handleTitleChange}
            onBlur={() => setHasTitleError(!title)}
          />
          {hasTitleError && (
          <>
          <span className="icon is-small is-right">
            <i className="fas fa-exclamation-triangle has-text-danger"></i>
          </span>
          <p className="help is-danger">Write a title</p>
          </>
          )}

        </div>
      </div>

      <div className="field">
        <label className="label" htmlFor='post-select'>User</label>
        <div className="control has-icons-left">
          <div className={cn("select", {"is-danger": hasUserIdError})}>
            <select id='post-select' value={userId} onChange={handleUserIdChange}>
              <option value="0">Select user</option>
              {usersFromServer.map(user => (
                <option value ={user.id} key={user.id}>{user.name}</option>
              ))}
            </select>
          </div>
          <span className="icon is-small is-left">
            <i className="fas fa-user"></i>
          </span>
        </div>
      </div>

      <div className="field">
        <label className="label">Message</label>
        <div className="control">
          <textarea 
            className={cn("textarea", {"is-danger": hasBodyError})} 
            placeholder="Text area" 
            value={body}
            onChange={handleBodyChange}
            onBlur={() => setHasBodyError(!body)}
          ></textarea>
          {hasBodyError && (
            <p className="help is-danger">Write a text</p>
          )}
        </div>
      </div>

      <div className="buttons">
        <button className="button is-link">Submit</button>
        <button type="reset" className="button is-link is-light">Cancel</button>
      </div>
    </form>
  );
};