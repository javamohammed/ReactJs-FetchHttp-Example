import React, { Component } from 'react';
import axios  from 'axios'
import './FullPost.css';

class FullPost extends Component {
    state= {
        loadedPost : null
    }
    componentDidMount(){
        console.log(this.props.match.params.id)
       this.loaded()
    }
    componentDidUpdate(){
        this.loaded()
    }
    loaded(){
         if(this.props.match.params.id){
            if (!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id != this.props.match.params.id)) {
                axios.get('/posts/' + this.props.match.params.id)
                    .then(response => {
                        this.setState({
                            loadedPost: response.data
                        })
                    })
            }
        }
    }
     postDeleteHandler = () =>{
          axios.delete('/posts/' + this.props.match.params.id).then(response => {
             console.log(response)
         })
     }
    render () {
       //console.log(this.state.loadedPost)
        let post = <p>Please select a Post!</p>;
        if (!this.props.match.params.id) {
            post = <div className="FullPost"><p>Loading...!</p></div>;
        }
        if (this.state.loadedPost ) {
             post = (
            <div className="FullPost">
                <h1>{this.state.loadedPost.title}</h1>
                <p>{this.state.loadedPost.body}</p>
                <div className="Edit">
                    <button className="Delete" onClick={this.postDeleteHandler}>Delete</button>
                </div>
            </div>

        );
        }
        return post;
    }
}

export default FullPost;