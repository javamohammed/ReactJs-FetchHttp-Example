import React, { Component } from 'react';

import Post from '../../../components/Post/Post';
import FullPost from '../FullPost/FullPost'
import './Posts.css';
import Axios from '../../../axios';
import { Link, Route } from 'react-router-dom'


class Posts extends Component {

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
        //you can use this method instead the Component Link
        //this.props.history.push(this.props.match.url+ '/:id')
        this.setState({
            fullPostId: postId
        })
    }
    render () {
        let posts = <p style={{textAlign:'center', color:'red'}}>Something went wrong!!</p>
         if(!this.state.error){
             posts = this.state.posts.map( post => {
            return (<Link to={this.props.match.url+'/'+ post.id} key={post.id}>
                        <Post title={post.title} content={post.body}  author={post.Author} clicked={this.postSelectHandler.bind(this,post.id)}/>
                    </Link>
                    )
        })
         }
        return (
            <div>
                 <div className="Posts">
                    {
                        posts
                    }
            </div>
                    <Route path={this.props.match.url+ '/:id'} exact component={FullPost} />
            </div>
        );
    }
}

export default Posts;