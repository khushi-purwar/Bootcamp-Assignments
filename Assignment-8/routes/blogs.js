
const express = require('express');
const routes = express.Router();

const Blog = require('../models/blogs');
const Review = require('../models/review');

// List all the comments
routes.get('/blogs', async (req, res) => {

    try{
    const blogs = await Blog.find({});
    res.render('blogs/index', { blogs });
    }catch (e){
        console.log("Something Went Wrong");
        req.flash('error', 'Cannot Find Blogs');
        res.render('error');
    }
})

// Getting a form for adding new comment
routes.get('/blogs/new', (req, res) => {
    res.render('blogs/new');
})


// Creates a new comments
routes.post('/blogs', async(req, res) => {
    try{
   await Blog.create(req.body);
   req.flash('success', 'New Blog Addded Successfully!');
    res.redirect('/blogs');  // by default get request 
    }catch (e){
        console.log("Something Went Wrong");
        req.flash('error', 'Cannot Create Blog');
        res.render('error');
    }
    
})

// Show particular comment
routes.get('/blogs/:id', async(req, res) => {

    try{
    const foundBlog = await Blog.findById(req.params.id).populate('reviews');  // reviews is an array name
    // console.log(foundBlog);
    res.render('blogs/show',{foundBlog});
    }catch (e){
        console.log("Something Went Wrong");
        // req.flash('error', 'Cannot Find this Product');
        res.render('error');
    }
})

// get a form for edting

routes.get('/blogs/:id/edit', async (req,res) => {
    try{
    const foundBlog = await Blog.findById(req.params.id);
    res.render('blogs/edit', {foundBlog});
    }catch (e){
        console.log("Something Went Wrong");
        req.flash('error', 'Cannot Edit this Blog');
        res.render('error');
    }
})

// update the comment

routes.patch('/blogs/:id', async(req, res) => {
    try{
    await Blog.findByIdAndUpdate(req.params.id, req.body);
    req.flash('success', 'Updated Successfully!');
    res.redirect(`/blogs/${req.params.id}`);
    }catch (e){
        console.log("Something Went Wrong");
        req.flash('error', 'Cannot Update this blog');
        res.render('error');
    }
    
})

// delete a particular comment
routes.delete('/blogs/:id', async(req, res) => {
    try{
    await Blog.findByIdAndDelete(req.params.id);
    req.flash('success', 'Deleted the blog successfully');
    res.redirect('/blogs');
    }catch(e){
        console.log(e.message);
        req.flash('error', 'Cannot delete this Blog');
        res.redirect('/error');
    }
})

//creating a new comment for on a blog

routes.post('/blogs/:id/review', async (req, res) => {
    
    try{
    const blog = await Blog.findById(req.params.id);
    const review = new Review(req.body);
    // console.log(review);

    blog.reviews.push(review);

    await review.save();
    await blog.save();
    req.flash('success','Successfully added your review!')
    res.redirect(`/blogs/${req.params.id}`);
    }catch(e){
        console.log(e.message);
        req.flash('error', 'Cannot add review to this Product');
        res.redirect('/error');
    }
})

routes.get('/error', (req, res) => {
    res.status(404).render('error');
})

module.exports = routes;
