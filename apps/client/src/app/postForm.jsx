import { useState } from 'react';

function PostForm({captureFile,uploadPost}) {
    const [description,setDescription]=useState("");

    return (
        <div className="d-flex justify-content-center container mt-3">
            <div className='row'>
                <h2>Share Post</h2>
                <form onSubmit={async(e)=>{
                    e.preventDefault()
                    await uploadPost(description);
                    }}>
                    <div className="mb-3">
                        <input className="form-control" type="file" id="formFile" onChange={(e) => {captureFile(e)}}/>
                    </div>
                    <div className="mb-3">
                        <input type="text" className="form-control" placeholder="Enter Description" value={description} onChange={(e)=>setDescription(e.target.value)}/>
                    </div>
                    <button type="submit" className="btn btn-danger" >Upload!</button>
                </form>
            </div>
        </div>
    );
}

export default PostForm;
