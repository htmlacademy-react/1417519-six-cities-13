import HeaderNav from '../header-nav/header-nav';
import Logo from '../logo/logo';

function Header ():JSX.Element{
  return(
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <Logo/>
          <HeaderNav/>
        </div>
      </div>
    </header>
  );
}

export default Header;
