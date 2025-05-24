import express from "express"
import authrouter from "./Routes/auth.js"
import categoriesRoutes from "./Routes/categories.js"
import contentRoutes from "./Routes/contentRoutes.js"
import cors from "cors"
import cookieParser from "cookie-parser";
import contentdata from "./Routes/content.js"
import blogRoutes from "./Routes/blog.js"
import  getUsers  from "./Routes/users.js"
import blogsRecord from "./Routes/blogTable.js"
import multer from "multer"
import path from "path"
import bodyParser from "body-parser"
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app=express();

app.use(express.json())
app.use(cookieParser())
app.use(cors());
app.use(bodyParser.json());





// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Multer storage setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Save to uploads folder
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Image upload route
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const imageUrl = `http://localhost:5000/uploads/${req.file.filename}`;
  res.json({ url: imageUrl });
});







app.use("/api/auth", authrouter)
app.use('/api/categories', categoriesRoutes);
app.use('/api', contentRoutes);
app.use('/api/content', contentdata);
app.use('/api/blogs', blogRoutes);
app.use("/api/users", getUsers);
app.use("/api/getblogs", blogsRecord);


app.listen(5000,()=>{
    console.log("Connected")
})