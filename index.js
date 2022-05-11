const express = require('express');
const app = express();
const PORT = process.env.PORT || 1337;
const userRoutes = require('./routes/userRoutes');

app.use(express.json());

app.use('/users', userRoutes)

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});