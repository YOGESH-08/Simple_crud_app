import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.set('views', path.join(__dirname, 'views'))
// initialising the app



//middlewares
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

//post
let posts = [];
app.set('view engine', 'ejs');

//home page to show all post

app.get("/",(req,res)=>{
    res.render("home",{posts});
})

//creating post- add a new post

app.post("/create",(req,res)=>{
    const newPost = {
        id : posts.length+1,
        title : req.body["title"],
        content : req.body["content"]
    };
    posts.push(newPost);
    console.log(newPost);
    res.redirect("/");
})

app.post("/edit",(req,res) => {
    const postid = Number(req.body["id"]);
    for (let i =0; i<posts.length;i++){
        if (posts[i].id===postid ){
        posts[i].title = req.body.title;
        posts[i].content = req.body.content;
        break;
        }
    }
res.redirect("/")
});

app.post('/delete', (req, res) => {
    const postId = Number(req.body.id);
    posts = posts.filter(post => post.id !== postId);
    res.redirect('/');
});






app.listen(1234,() => {
    console.log("Localhost running on port : 1234");
})



























// import express from 'express';
// import bodyParser from 'body-parser';

// // Create the app
// const app = express();

// // Serve static files (CSS)
// app.use(express.static('public'));

// // Parse form data
// app.use(bodyParser.urlencoded({ extended: true }));

// // Store posts in memory
// let posts = [];

// // Home Page - Show all posts
// app.get('/', (req, res) => {
//     res.render('views/home.ejs', { posts });
// });

// // Create Post - Add a new post
// app.post('/create', (req, res) => {
//     const newPost = {
//         id: posts.length + 1, // Simple ID
//         title: req.body.title,
//         content: req.body.content
//     };
//     posts.push(newPost); // Add to the posts list
//     res.redirect('/');
// });

// // Edit Post - Load the post for editing
// app.get('/edit/:id', (req, res) => {
//     const postId = Number(req.params.id); // Get the post ID
//     let post = null;

//     // Look for the post
//     for (let p of posts) {
//         if (p.id === postId) {
//             post = p;
//             break;
//         }
//     }

//     if (post) {
//         res.render('views/edit-post.ejs', { post });
//     } else {
//         res.send('Post not found');
//     }
// });

// // Update Post - Save the changes
// app.post('/update/:id', (req, res) => {
//     const postId = Number(req.params.id);

//     // Update the post
//     for (let p of posts) {
//         if (p.id === postId) {
//             p.title = req.body.title;
//             p.content = req.body.content;
//             break;
//         }
//     }

//     res.redirect('/');
// });

// // Delete Post - Remove a post
// app.post('/delete/:id', (req, res) => {
//     const postId = Number(req.params.id);
//     posts = posts.filter(p => p.id !== postId); // Remove the post
//     res.redirect('/');
// });

// // Start the server
// const PORT = 3000;
// app.listen(PORT, () => {
//     console.log(`Server running at http://localhost:${PORT}`);
// });

