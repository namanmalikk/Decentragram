// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Decentragram {
    string public name = 'Decentragram';
    uint256 public postCount = 0;
    mapping(uint256 => Post) public posts;

    struct Post {
        uint256 id;
        string hash;
        string description;
        uint256 tipAmount;
        address author;
    }

    event newPost(
        uint256 id,
        string hash,
        string description,
        uint256 tipAmount,
        address author
    );

    event postTip(
        uint256 id,
        string hash,
        string description,
        uint256 tipAmount,
        address author
    );

    function uploadPost(string memory _imgHash, string memory _description)
        public
    {
        require(bytes(_description).length > 0);
        require(bytes(_imgHash).length > 0);
        require(msg.sender != address(0));

        postCount++;

        posts[postCount] = Post(
            postCount,
            _imgHash,
            _description,
            0,
            msg.sender
        );

        emit newPost(postCount, _imgHash, _description, 0, msg.sender);
    }

    function tipPostOwner(uint256 _id) public payable {
        require(_id > 0 && _id <= postCount);

        Post memory _post = posts[_id];
        address _author = _post.author;
        payable(address(_author)).transfer(msg.value);
        _post.tipAmount = _post.tipAmount + msg.value;
        posts[_id] = _post;

        emit postTip(
            _id,
            _post.hash,
            _post.description,
            _post.tipAmount,
            _author
        );
    }
}
