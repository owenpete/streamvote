
interface Props{
  isLoggedIn: boolean;
}

const Navbar = (props: Props) =>{
  return (
    <div className='navbar'>
      <div className="navbar__left">

      </div>
      <div className='navbar__right'>
        {
          props.isLoggedIn?
            <input 
              className="auth-option log-out__button"
              type='button'
              value={'Log out'}
            />
            :
            <input
              className='auth-option login__button'
              type='button'
              value={'Login'}
            />
        }
      </div>
    </div>
  );
}

export default Navbar;