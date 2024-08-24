import React, { useEffect, useState, useContext } from 'react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { Button, Container, Row, Col, Alert } from 'react-bootstrap';

const UserPostsPage = () => {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get('/posts/user');
        if (Array.isArray(response.data)) {
          setPosts(response.data);
        } else {
          setError('Unexpected data format');
        }
      } catch (err) {
        setError('Failed to fetch posts');
      }
    };

    if (user) {
      fetchPosts();
    } else {
      setError('User not authenticated');
    }
  }, [user]);

  const handleDelete = async (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await api.delete(`/posts/${postId}`);
        setPosts(posts.filter(post => post._id !== postId));
      } catch (err) {
        setError('Failed to delete post');
      }
    }
  };

  return (
    <Container>
      <h1>Your Posts</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Row>
        {posts.length > 0 ? (
          posts.map((post) => (
            <Col md={4} key={post._id}>
              <div className="post-card">
                <h2>{post.title}</h2>
                <p>{post.content}</p>
                <div>
                  <Link to={`/posts/${post._id}/edit`}>Edit</Link>
                </div>
                <div>
                  <Button variant="danger" onClick={() => handleDelete(post._id)}>Delete</Button>
                </div>
              </div>
            </Col>
          ))
        ) : (
          <p>No posts available</p>
        )}
      </Row>
    </Container>
  );
};

export default UserPostsPage;
