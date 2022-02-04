import Web3 from 'web3';

function Post({post,tipPostOwner}) {
  const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');

  return (
    <div className='row d-flex justify-content-center mt-3'>
        <div className="card" style={{"width": "22rem"}}>
            <img className="card-img-top" src={`https://ipfs.infura.io/ipfs/${post.hash}`} alt="Card image cap"/>
            <div className="card-body">
                <h6 className="card-title">
                {`${post.id} - ${post.author}`}
                </h6>
                <p className="card-text">{post.description}</p>
                <small className="float-left mt-1 text-muted">
                  TIPS: {web3.utils.fromWei(post.tipAmount.toString(), 'Ether')} ETH
                </small>
            </div>
            <div className="card-body">
                <a href="#" className="card-link" onClick={(event) => {
                            event.preventDefault();
                            let tipAmount = web3.utils.toWei('0.1','Ether')
                            console.log(post.id,tipAmount);
                            tipPostOwner(post.id, tipAmount)
                          }}>TIP 0.1 ETH</a>
            </div>
        </div>
    </div>
  );
}

export default Post;
