import "./main.css";
import { Link } from "react-router-dom";
const Home = ({ connectWallet, currentAccount }: any) => {
  return (
    <div id="mainwrap">
      <div className="main">
        <div className="blank"></div>
        <div className="nav"></div>
        {currentAccount != undefined ? (
          <div className="position_banner_on"></div>
        ) : (
          <div className="position_banner_off" onClick={connectWallet}></div>
        )}

        <Link to="/explore">
          <div className="explore_btn"></div>
        </Link>
        <div className="explore_menu"></div>
        <Link to="/explore">
          <div className="explore_banner"></div>
        </Link>
        <div className="bottom_nav">
          <Link to="/explore">
            <div className="nav_01"></div>
          </Link>
          <Link to="/nft">
            <div className="nav_02"></div>
          </Link>
          <Link to="/donate">
            <div className="nav_03"></div>
          </Link>
        </div>
        <div className="homein"></div>
      </div>
    </div>
  );
};

export default Home;
