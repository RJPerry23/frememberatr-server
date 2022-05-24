require("dotenv").config();
const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 1337;
const userRoutes = require('./routes/userRoutes');
const authenticator = require("./middleware/authenticator");
const fileUpload = require('express-fileupload')

app.use(express.json());
//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));
app.use(cors());
app.use(fileUpload());

app.post('/upload', authenticator, (req, res) => {
  console.log(req.files['image-field']);
  const imageFile = req.files['image-field']
  const fileName = imageFile.name
  const uploadPath = `images/${fileName}`
  imageFile.mv(`${__dirname}/public/${uploadPath}`, 
    function(err){
      if (err) {return res.status(500).send(err.message)}
      return res.send({path: uploadPath})
  })
});

app.use('/users', userRoutes)

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});