//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _=require('lodash');
const mongoose=require('mongoose');
// const encrypt=require('mongoose-encryption')
// const Blog = require('./models/Blog');
const homeStartingContent =`Certainly! The "75 HARD Challenge" has gained popularity as a powerful personal development journey that can transform your life. It's not just a physical challenge but also a mental and emotional one. So I have thought of giving it a try. I won't be following the exact rules as mentioned but I will try to improvise this in my own manner without missing the core part of the challenge which is "Pushing Yourself To Your Max limit". Therofore I would love to call it "The 75 MINDFULLNESS EVE".  `;
const aboutContent = `I'm Abish Chhetri, pursuing my B.Tech in computer science and technology. I'm interested in cyber security, IoT, and block chain technology. I am a self-motivated, intensely enthusiastic, and diligent individual who does have some leadership abilities. 
Being new to computer science and technology, I've been doing my best to prepare myself as much as possible by taking classes on subjects like React Js, Node Js, Python. I was self-motivated to pursue UI/UX designing with Figma, and I believe I have learned a lot about it and have used those abilities frequently. 
I've worked on e-commerce websites and home automation projects too. I am certain that the knowledge I've gained has aided me in developing creative and effective designs that successfully portray the intended message. As a result, I've become incredibly organised, have developed some fantastic website creation skills, and am able to manage multiple tasks at once. To ensure a happy and prosperous future, I strive to study more, acquire more skills which would be much more beneficial for me in the future.`;
const contactContent = "Comming soon";



const app = express();

app.set('view engine', 'ejs');

mongoose.connect('mongodb+srv://abishchhetri2502:BA1hj4dxRO88qmFO@cluster0.0em2pha.mongodb.net/?retryWrites=true&w=majority',{useNewUrlParser:true}).then((res)=>{
  console.log('Mongoose db connect');
}).catch((err)=>{
  console.log(err)
})



const blogSchema= new mongoose.Schema({
  Content:[{String}],
},{
  timestamps:true,
}
)

// const secret="happynamepeople"
// blogSchema.plugin(encrypt,{secret:secret, encryptionFields:['number']});

// const dailySchema=new mongoose.Schema({
//      title:"String",
//      Content:"String",
// })

// const Daily=mongoose.model('Daily',dailySchema);

const Blog=mongoose.model('Blog',blogSchema)

// const Admin=new Blog({
//   Title:String,
//   Content:{
//     type:String,
//   }
// });


// const document=async()=>{
//       const contact=new Daily({
//             title:"Content",
//             Content:"Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.",
        
//       })
//       const home=new Daily({
//         title:"Content",
//         Content:"Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.",
    
//       })

//       const about=new Daily({
//         title:"Content",
//         Content:"Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.",
    
//       })

//     const result=await Daily.insertMany([contact,home,about])
// }


// document();


// const document1=async(dr)=>{
//   try{
//     const result=await Blog.find({title:dr.title,number:dr.number});
//     console.log(result)
//     if(result[0]!=null){
//       res.redirect("/compose");
      
//     }

//     else{
//       // res.redirect("/views/about");
//       // res.sendFile(__dirname+"/views/Adminalert.html")
//       res.send("<h1>You are not the admin</h1>")
//     }
//   }
//   catch(err){
//       console.log(err)
//   }
// }      
// document1(req.body);
// })

// Admin.save();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
// const allBlogs = Blog.find({});
let posts=[];

console.log(posts)
app.get('/',(req,res)=>{
  // const result = mongoose.find({Content: posts})
 
  // console.log(result)
  res.render("home",{
    startingPara:homeStartingContent,
    Posts:posts,
  });
 

});


app.get('/about',(req,res)=>{
  res.render("about",{startingAbout:aboutContent});
});

app.get('/contact',(req,res)=>{
  res.render("contact",{startingContact:contactContent});
});

app.get('/compose50982',(req,res)=>{
  res.render("compose");
  
});

app.get('/sign',(req,res)=>{
  res.sendFile(__dirname+"/views/SignIn.html")
})

app.get('/:userinput',(req,res)=>{
  const userinput=_.lowerCase(req.params.userinput);

  posts.forEach(function(post){
    const storedtitle=_.lowerCase(post.title);
    const storedcontent=_.lowerCase(post.compose);

    // if(userinput===storedtitle){
    //   console.log('Match found');
    // }
    // else{
    //   console.log('Match not found')
    // }

    res.render('post',{
      startingHeader:storedtitle,
      startingPara3:storedcontent
    })
  })
})

app.post('/compose50982',(req,res)=>{
//   const newBlog=new Blog({
//     Title:`${req.body.title}`,
//     Content:`${req.body.compose}`,

   
// })
  // newBlog.save();
  // console.log(newBlog)

  // const allBlogs = await Blog.find({});  
  console.log(req.body.title);
  console.log(req.body.compose);
  const post={
    title: req.body.title,
    compose: req.body.compose,
  }

   posts.push(post);
 
  const newblog= new Blog({
    Content:posts,
  })
  
  newblog.save();


  res.redirect('/');
})

app.post('/Sign',(req,res)=>{


  const document=async(dr)=>{
    try{
      const result=await Blog.find({name:dr.name,number:dr.number});
      console.log(result)
      if(result[0]!=null){
        res.redirect("/compose");
        
      }
  
      else{
        // res.redirect("/views/about");
        // res.sendFile(__dirname+"/views/Adminalert.html")
        res.redirect("/");
      }
    }
    catch(err){
        console.log(err)
    }
  }      
  document(req.body);
})

app.listen('4000',function(){
  console.log('Server running at Server running at http://127.0.0.1:4000/');
});
// app.listen(3000, function() {
//   console.log("Server started on port 3000");
// });
