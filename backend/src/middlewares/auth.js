// const jwt = require('jsonwebtoken');

// const auth = (req, res, next) => {
//   const authHeader = req.header('Authorization');
//   if (!authHeader) return res.status(401).json({ message: 'No token, authorization denied' });

//   const token = authHeader.replace('Bearer ', '');
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded.user;
//     next();
//   } catch (error) {
//     res.status(401).json({ message: 'Token is not valid' });
//   }
// };

const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (token == null) return res.sendStatus(401); // If no token

  jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret', (err, user) => {
    if (err) return res.sendStatus(403); // If token is no longer valid
    req.user = user;
    next();
  });
};

module.exports = auth;

