// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';
import Navbar from './navbar';
import Main from './main';
import Web3 from 'web3';
import {create} from "ipfs-http-client"
import Decentragram from '../abis/Decentragram.json'
import { useState,useEffect } from 'react';


const IPFSclient = create('https://ipfs.infura.io:5001/api/v0');

export function App() {
	const [account,setAccount] = useState("0x0")
	const [decentragram, setDecentragram] = useState(null)
	const [posts,setPosts] = useState([])
	const [postCount, setPostCount] = useState(undefined)
	const [loading, setLoading] = useState(false)
	const [imageBuffer, setImageBuffer] = useState()

	const fetchContract =  async (web3) => {
		const networkId = await web3.eth.net.getId()
		const networkData = Decentragram.networks[networkId]
		if(networkData){
			const decentragram =new web3.eth.Contract(Decentragram.abi,networkData.address);
			setDecentragram(decentragram);
			const postCount = await decentragram.methods.postCount().call({from:networkData.address}).then((postCount) => {
				setPostCount(postCount);
				return postCount;
			})
			for(var i=1;i<=postCount;i++){
				await decentragram.methods.posts(i).call({from:networkData.address}).then((post) => {
					setPosts((posts) => [...posts,post]);
				})
			}
			console.log(postCount);
			console.log(posts);
		}else{
			alert("Dapp not deployed to detected network");
		}
	}

	const captureFile = (e) =>{
		console.log("capturing file")
		e.preventDefault();
		const file = e.target.files[0];
		const reader = new FileReader()
		reader.readAsArrayBuffer(file);
		reader.onloadend = () =>{
			setImageBuffer(reader.result);
			console.log("buffer ->  ",reader.result);
		}
	}

	const uploadPost = async(description) =>{
		console.log("submitting image to ipfs")
		console.log(description);
		try{
            const created = await IPFSclient.add(imageBuffer);
			console.log(created);
            decentragram.methods.uploadPost(created.path,description).send({from:account}).on('transactionHash', (hash) => {
                setLoading(false);
            })
        }catch(error){
            alert(error);
            setLoading(false);
        }
	}

	const tipPostOwner = (id,tipAmount) =>{
		console.log(id,tipAmount)
		// const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');
		decentragram.methods.tipPostOwner(id).send({
				from: account,
				value: tipAmount
			}).on('transactionHash', (hash) => {
			   alert("Poat Tipped");
			})
	}

  	useEffect(() => {
		const ethEnable = async () => {
			if(window.ethereum){
				const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');
				const accounts = await web3.eth.requestAccounts();
				setAccount(accounts[0]);
				// console.log(accounts);
				await fetchContract(web3)
				return true;
			}
			return false;
		}
		if(!ethEnable()){
			alert("PLEASE INSTALL METAMASK!")
		}
	}, [])

  return (
    <>
      <Navbar account={account}/>    
	  {loading?
	  "loading":
	  <Main 
	  captureFile={captureFile}
	  uploadPost={uploadPost}
	  posts={posts}
	  tipPostOwner={tipPostOwner}
	  />}
      <div />
    </>
  );
}

export default App;
