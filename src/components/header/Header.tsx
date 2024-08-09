import "./Header.css";

const Header = () => {
  return (
    <section className="header">
      <h3 className="header-logo">Buletin</h3>
      <span className="header-vertical-line"></span>
      <div className="header-link-box">
        <div>
          <span>Stories</span>
          <span>Creator</span>
          <span>Community</span>
        </div>
        <div>
          <span>
            <img height={24} width={24} src="assets/img/active.png" alt="notification" />
          </span>
          <span>
            <img height={24} width={24} src="assets/img/user.png" alt="user profile" />
          </span>
        </div>
      </div>
    </section>
  );
};

export default Header;
