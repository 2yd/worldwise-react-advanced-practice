import { Outlet } from 'react-router-dom'
import AppNav from './AppNav'
import Logo from './Logo'
import styles from './Sidebar.module.css'

function Sidebar() {
   return (
      <div className={styles.sidebar}>
         <Logo></Logo>
         <AppNav></AppNav>
         <Outlet></Outlet>
         <footer className={styles.footer}>
            <p className={styles.copyright}>
               &copyt; Copyright {new Date().getFullYear()} by Worldwise Inc.
            </p>
         </footer>
      </div>
   )
}

export default Sidebar
