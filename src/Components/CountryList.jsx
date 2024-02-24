import { useCities } from '../contexts/CitiesContext'

import CountryItem from './CountryItem'
import styles from './CountryList.module.css'
import Message from './Message'
import Spinner from './Spinner'
function CountryList() {
   const { cities, isLoading } = useCities()

   const countries = cities.reduce((arr, city) => {
      if (!arr.map(el => el.country).includes(city.country)) {
         return [...arr, { country: city.country, emoji: city.emoji }]
      } else return arr
   }, [])
   if (isLoading) return <Spinner></Spinner>
   if (!cities.length)
      return (
         <Message message="Click on the map and get your first city"></Message>
      )
   return (
      <ul className={styles.countryList}>
         {countries.map(country => (
            <CountryItem country={country} key={country.country}></CountryItem>
         ))}
      </ul>
   )
}

export default CountryList
