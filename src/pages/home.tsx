import "./main.css";
const Home = ({ connectWallet }: any) => {
  return (
    <div id="mainwrap">
      <div className="main">
        <div className="blank"></div>
        <div className="nav"></div>
        <div className="position_banner_off"></div>
        <a href="http://localhost:3000/explore">
          <div className="explore_btn"></div>
        </a>
        <div className="explore_menu"></div>
        <a href="http://localhost:3000/explore">
          <div className="explore_banner"></div>
        </a>
        <div className="explore_banner"></div>
        <div className="explore_banner"></div>
        <div className="bottom_nav">
          <a href="http://localhost:3000/explore">
            <div className="nav_01"></div>
          </a>
          <a href="http://localhost:3000/nft">
            <div className="nav_02"></div>
          </a>
          <a href="http://localhost:3000/donate">
            <div className="nav_03"></div>
          </a>
        </div>
        <div className="homein"></div>
      </div>
    </div>
  );
};

export default Home;
