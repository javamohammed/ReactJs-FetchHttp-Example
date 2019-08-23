import React, { Component } from 'react';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';
import Axios from '../../axios';

class Blog extends Component {

    state = {
        posts: [],
        error: false
    }
    componentDidMount(){
        Axios.get('/posts')
            .then(response => {
                const posts = response.data.slice(0,4)
                const updatedPosts = posts.map( post => {
                    return {...post, Author: 'Mido'}
                })
                this.setState({
                    posts: updatedPosts,
                    fullPostId:null,
                })

        }).catch(err => {
            this.setState({
                error: true
            })
        })
    }
    postSelectHandler(postId){
        this.setState({
            fullPostId: postId
        })
    }
    render () {
        let posts = <p style={{textAlign:'center', color:'red'}}>Something went wrong!!</p>
         if(!this.state.error){
             posts = this.state.posts.map( post => {
            return <Post title={post.title} content={post.body} key={post.id} author={post.Author} clicked={this.postSelectHandler.bind(this,post.id)}/>
        })
         }
        return (
            <div>
                <section className="Posts">
                    {
                        posts
                    }
                </section>
                <section>
                    <FullPost postId={this.state.fullPostId} />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;