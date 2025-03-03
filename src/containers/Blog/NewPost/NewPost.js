import React, { Component } from 'react';
import axios from 'axios';
import './NewPost.css';
import { Redirect } from 'react-router-dom';

class NewPost extends Component {
    state = {
        title: '',
        content: '',
        author: 'Max',
        submitted: false
    }
    postSelectHandler(){
        const data= {
            title: this.state.title,
            body: this.state.content,
            author: this.state.author
        }
        axios.post('/posts', data).then( response => {
            console.log(response)
            //this.setState({submitted : true})
            //this.props.history.push('/posts')
            this.props.history.replace('/posts')
        })
    }

    render () {
        let redirect = null
        if(this.state.submitted){
            redirect = <Redirect to = "/posts" />
        }
        return (
            <div className="NewPost">
                {redirect}
                <h1>Add a Post</h1>
                <label>Title</label>
                <input type="text" value={this.state.title} onChange={(event) => this.setState({title: event.target.value})} />
                <label>Content</label>
                <textarea rows="4" value={this.state.content} onChange={(event) => this.setState({content: event.target.value})} />
                <label>Author</label>
                <select value={this.state.author} onChange={(event) => this.setState({author: event.target.value})}>
                    <option value="Max">Max</option>
                    <option value="Manu">Manu</option>
                </select>
                <button onClick={this.postSelectHandler.bind(this)}>Add Post</button>
            </div>
        );
    }
}

export default NewPost;