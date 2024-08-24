// import React, { useEffect, useState } from 'react';
// import api from '../services/api.jsx';
// import { useParams, useNavigate } from 'react-router-dom';

// const EditPostPage = () => {
//   const { id } = useParams();
//   const history = useNavigate();

//   const [formData, setFormData] = useState({
//     title: '',
//     content: '',
//   });
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [successMessage, setSuccessMessage] = useState('');

//   const { title, content } = formData;

//   const fetchPost = async () => {
//     try {
//       const res = await api.get(`/posts/${id}`);
//       setFormData({
//         title: res.data.title,
//         content: res.data.content,
//       });
//       setLoading(false);
//     } catch (err) {
//       console.error(err);
//       setError('Failed to fetch post');
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPost();
//   }, [id]);

//   const onChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const onSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       await api.put(`/posts/${id}`, { title, content });
//       setSuccessMessage('Post updated successfully!');
//       setTimeout(() => {
//         history.push(`/posts/${id}`);
//       }, 2000); // Redirect after 2 seconds
//     } catch (err) {
//       console.error(err);
//       setError(err.response?.data?.message || 'Failed to update post');
//     }
//   };

//   return (
//     <div>
//       <h1>Edit Post</h1>
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <>
//           {error && <p style={{ color: 'red' }}>{error}</p>}
//           {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
//           <form onSubmit={onSubmit}>
//             <div>
//               <label>Title:</label>
//               <input
//                 type="text"
//                 name="title"
//                 value={title}
//                 onChange={onChange}
//                 required
//                 minLength={5} // Example validation rule
//               />
//             </div>
//             <div>
//               <label>Content:</label>
//               <textarea
//                 name="content"
//                 value={content}
//                 onChange={onChange}
//                 required
//               ></textarea>
//             </div>
//             <button type="submit">Update Post</button>
//           </form>
//         </>
//       )}
//     </div>
//   );
// };

// export default EditPostPage;
import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Alert } from 'react-bootstrap';

const EditPostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: null,
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(true);

  const { title, content, image } = formData;

  const fetchPost = async () => {
    try {
      const res = await api.get(`/posts/${id}`);
      setFormData({
        title: res.data.title,
        content: res.data.content,
        image: res.data.image || null,
      });
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch post');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [id]);

  const onChange = (e) => {
    if (e.target.name === 'image') {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append('title', title);
    form.append('content', content);
    if (image) form.append('image', image);

    try {
      await api.put(`/posts/${id}`, form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccessMessage('Post updated successfully!');
      setTimeout(() => {
        navigate(`/posts/${id}`);
      }, 2000); // Redirect after 2 seconds
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update post');
    }
  };

  return (
    <Container>
      <h1>Edit Post</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {error && <Alert variant="danger">{error}</Alert>}
          {successMessage && <Alert variant="success">{successMessage}</Alert>}
          <Form onSubmit={onSubmit}>
            <Form.Group controlId="formTitle">
              <Form.Label>Title:</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={title}
                onChange={onChange}
                required
                minLength={5}
              />
            </Form.Group>
            <Form.Group controlId="formContent">
              <Form.Label>Content:</Form.Label>
              <Form.Control
                as="textarea"
                name="content"
                value={content}
                onChange={onChange}
                required
              />
            </Form.Group>
            <Button type="submit">Update Post</Button>
          </Form>
        </>
      )}
    </Container>
  );
};

export default EditPostPage;
