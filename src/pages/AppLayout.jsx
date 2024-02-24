import Map from '../Components/Map'
import Sidebar from '../Components/Sidebar'
import User from '../Components/User'
import styles from './AppLayout.module.css'
function AppLayout() {
   return (
      <div className={styles.app}>
         <Sidebar></Sidebar>
         <Map></Map>
         <User></User>
      </div>
   )
}

export default AppLayout
