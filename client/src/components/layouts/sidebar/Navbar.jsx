import { FaAlignLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styled from 'styled-components';


const Wrapper = styled.nav`
  height: var(--nav-height);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.1);
  background: #3B3F44;
  color: #FFFFFF;
  .nav-center {
    display: flex;
    width: 90vw;
    align-items: center;
    justify-content: space-between;
  }
  .toggle-btn {
    background: transparent;
    border-color: transparent;
    font-size: 1.75rem;
    color: var(--primary-500);
    cursor: pointer;
    display: flex;
    align-items: center;
  }
  .logo-text {
    display: none;
  }
  .logo {
    display: flex;
    align-items: center;
    width: 100px;
  }
  .btn-container {
    display: flex;
    align-items: center;
  }
  @media (min-width: 992px) {
    position: sticky;
    top: 0;
    .nav-center {
      width: 90%;
    }
    .logo {
      display: none;
    }
    .logo-text {
      display: block;
    }
  }
`;



const Navbar = ({ toggleSidebar, handleLogout }) => {

  return (
    <Wrapper>
      <div className='nav-center py-4'>
        <button type='button' className='toggle-btn' onClick={toggleSidebar}>
          <FaAlignLeft />
        </button>
        <div className='flex space-x-5 items-center'>
          <Link to="/my_profile">
            <h4 className='logo-text text-white underline underline-offset-8'>dashboard</h4>
          </Link>
        </div>
        <button onClick={handleLogout} type='button' className='btn-container btn btn-sm'>
          logout
        </button>
      </div>
    </Wrapper>
  );
};
export default Navbar;
