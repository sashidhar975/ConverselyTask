import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get('/posts');
        if (Array.isArray(response.data)) {
          setPosts(response.data);
        } else {
          setError('Unexpected data format');
        }
      } catch (err) {
        setError('Failed to fetch posts');
      }
    };

    fetchPosts();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Container>
      <h1>All Posts</h1>
      <Row>
        {posts.length > 0 ? (
          posts.map((post) => (
            <Col md={4} key={post._id}>
              <div className="post-card">
                <h2>{post.title}</h2>
                <p>{post.content}</p>
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

export default HomePage;
