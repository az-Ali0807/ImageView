const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./configs/db');
const ImageRoutes = require("./routes/image.route");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

//connect DB
connectDB(); 

//static folder access
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//Image Routing
app.use('/api/images', ImageRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});