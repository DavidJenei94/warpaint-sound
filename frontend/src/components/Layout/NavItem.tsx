import { NavLink } from 'react-router-dom';

import styles from './NavItem.module.scss';

interface NavItemProps {
  children: React.ReactNode;
  to: string;
}

const NavItem = ({ children, to }: NavItemProps) => {
  return (
    <NavLink
      to={to}
      // style={{ color: 'inherit', textDecoration: 'inherit'}}
      className={({ isActive }) =>
        isActive ? `${styles.link} ${styles.active}` : `${styles.link}`
      }
    >
      {children}
    </NavLink>
  );
};

export default NavItem;
