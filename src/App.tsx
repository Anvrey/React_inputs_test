import React, { useState } from 'react';

import { Post } from './components/types/Post';
import postsFromServer from './components/api/posts.json';
import { PostForm } from './components/PostForm';
import { PostList } from './components/PostList';
import { getUserById } from './components/services/user';

const initialPosts: Post[] = postsFromServer.map(post => ({
  ...post,
  user: getUserById(post.userId)
}));

export const App: React.FC = () => {
  const [posts, setPosts] = useState(initialPosts);

  const addPost = (newPost: Post) => {
    setPosts(prevPosts => [...prevPosts, newPost]);
  }

  return (
    <div className="section">
      <h1 className="title">Create a post</h1>

      <PostForm onSubmit={addPost}/>
      <PostList posts={posts} />
    </div>
  );
};