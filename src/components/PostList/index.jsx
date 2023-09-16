import { Post } from "./Post";

import "./styles.css";

export const PostList = ({posts}) => {
    return (
        <div className="postlist-container">
            {posts.map(post => {
                return <Post createdAt={post.createdAt} autor={post.autor} text={post.text} comments={post.comments} image={post.image} />
            })}
        </div>
    )
}