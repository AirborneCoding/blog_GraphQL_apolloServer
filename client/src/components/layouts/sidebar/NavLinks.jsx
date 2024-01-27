import { NavLink } from 'react-router-dom';
import { IoBarChartSharp } from 'react-icons/io5';
import { MdArticle } from 'react-icons/md';
import { FaWpforms } from 'react-icons/fa';
import { ImProfile } from 'react-icons/im';
import { IoSettings } from "react-icons/io5";
const links = [
  {
    text: 'stats',
    path: '',
    icon: <IoBarChartSharp />,
  },
  {
    text: 'profile',
    path: 'profile_info',
    icon: <ImProfile />,
  },
  {
    text: 'write posts',
    path: 'write_post',
    icon: <FaWpforms />,
  },
  {
    text: 'my posts',
    path: 'my_posts',
    icon: <MdArticle />,
  },
  {
    text: 'settings',
    path: 'settings',
    icon: <IoSettings />,
  },
  // {
  //   text: 'admin',
  //   path: 'admin',
  //   icon: <MdAdminPanelSettings />,
  // },
];

const NavLinks = ({ isBigSidebar, toggleSidebar }) => {
  return (
    <div className='nav-links'>
      {links.map((link) => {
        const { text, path, icon } = link;
        // const { role } = user;
        // if (path === 'admin' && role !== 'admin') return; // todo
        return (
          <NavLink
            to={path}
            key={text}
            className='nav-link'
            onClick={isBigSidebar ? null : toggleSidebar}
            end
          >
            <span className='icon'>{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};
export default NavLinks;
