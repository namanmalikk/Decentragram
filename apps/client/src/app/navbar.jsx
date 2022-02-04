import logoPic from './btc-logo.png'

const Navbar = ({account}) => {
  return (
    <nav className="navbar navbar-dark" style={{"backgroundColor": "#990000"}}>
      <a className="navbar-brand" href="/">
      <img src={logoPic} width="30" height="30" className="d-inline-block align-top mx-2" />
          Decentragram
      </a>
      <small className='text-white mx-3'>{account}</small>
    </nav>
    );
};

export default Navbar;
