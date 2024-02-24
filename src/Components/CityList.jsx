import { useCities } from '../contexts/CitiesContext'
import CityItem from './CityItem'
import styles from './CityList.module.css'
import Message from './Message'
import Spinner from './Spinner'
function CityList() {
   const { cities, isLoading } = useCities()
   if (isLoading) return <Spinner></Spinner>
   if (!cities.length)
      return (
         <Message message="Click on the map and get your first city"></Message>
      )
   return (
      <ul className={styles.cityList}>
         {cities.map(city => (
            <CityItem city={city} key={city.id}></CityItem>
         ))}
      </ul>
   )
}

export default CityList
