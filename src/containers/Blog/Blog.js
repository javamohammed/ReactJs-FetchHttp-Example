import React from 'react';
import { Route,NavLink, Switch, Redirect } from 'react-router-dom'
import './Blog.css'
import Posts from './Posts/Posts'
import AsyncComponent from '../../hoc/AsyncComponent'

const asyncNewPost = AsyncComponent(() => {
    return import('./NewPost/NewPost')
})
const  Blog = (props) => {

        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            {
                                /** this link is personalized by add new name for class active and styling it inline */ }
                            <li><NavLink exact activeClassName="my-active" activeStyle={{color: 'orange', textDecoration:'underline'}} to="/posts">Posts</NavLink></li>
                            <li><NavLink to="/new-post">New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
                <Switch>
                    <Route path="/new-post" component={asyncNewPost} />
                    <Route path="/posts"  component={Posts} />
                    {/*<Redirect  from="/" to= "/posts"   />*/}
                    <Route render={() => <h2>Not found !!</h2>} />
                    {/*<Route path="/" component={Posts} />*/}
                </Switch>
            </div>
        );
    }

export default Blog;