
import Post from './post';
import PostForm from './postForm';

const Main = ({captureFile,uploadPost,posts,tipPostOwner}) => {
  return (
    <div>
        <PostForm 
        captureFile={captureFile}
        uploadPost={uploadPost}
        />
        <div className='container mt-5'>
            <div className='col'>
                {posts.map((post)=>
                    <Post key={post.id} post={post} tipPostOwner={tipPostOwner}/>
                )}
            </div>
        </div>
    </div>
      );
};

export default Main;