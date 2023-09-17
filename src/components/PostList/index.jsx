import { Post } from "./Post";

import "./styles.css";

export const PostList = ({posts}) => {
    return (
        <div className="postlist-container">
            {posts.sort((a,b) => a.createdAt <= b.createdAt).map((post, index) => {
                return <Post key={post.id} createdAt={post.createdAt} autor={post.author.username} text={post.text} comments={post.comments.length} image={post.image} postLikes={post.likes}/>
            })}
        </div>
    )
}