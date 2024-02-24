import {
   createContext,
   useEffect,
   useContext,
   useReducer,
   useCallback,
} from 'react'
const BASE_URL = 'http://localhost:4399'
const FAKE_USER = {
   name: 'Jack',
   email: 'jack@example.com',
   password: 'qwerty',
   avatar: 'https://i.pravatar.cc/100?u=zz',
}
const CitiesContext = createContext()
const initialState = {
   cities: [],
   isLoading: false,
   currentCity: {},
   error: '',
}

function reducer(state, action) {
   switch (action.type) {
      case 'loading':
         return { ...state, isLoading: true }
      case 'cities/loaded':
         return { ...state, isLoading: false, cities: action.payload }
      case 'city/loaded':
         return { ...state, isLoading: false, currentCity: action.payload }
      case 'city/created':
         return {
            ...state,
            isLoading: false,
            cities: [...state.cities, action.payload],
            currentCity: action.payload,
         }
      case 'city/deleted':
         return {
            ...state,
            isLoading: false,
            cities: state.cities.filter(city => city.id !== action.payload),
            currentCity: {},
         }
      case 'rejected':
         return { ...state, isLoading: false, error: action.payload }
      default:
         throw new Error('Unknown action')
   }
}

function CitiesProvider({ children }) {
   const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
      reducer,
      initialState
   )

   useEffect(function () {
      async function fetchCities() {
         dispatch({ type: 'loading' })
         try {
            const res = await fetch(`${BASE_URL}/cities`)
            const data = await res.json()
            dispatch({ type: 'cities/loaded', payload: data })
         } catch (error) {
            dispatch({ type: 'rejected', payload: 'Error when loading data' })
         }
      }
      fetchCities()
   }, [])
   const getCity = useCallback(
      async function getCity(id) {
         if (Number(id) === currentCity.id) return
         dispatch({ type: 'loading' })
         try {
            const res = await fetch(`${BASE_URL}/cities?id=${id}`)
            const data = await res.json()
            dispatch({ type: 'city/loaded', payload: data[0] })
         } catch (error) {
            dispatch({ type: 'rejected', payload: 'Error when loading data' })
         }
      },
      [currentCity.id]
   )
   async function createCity(newCity) {
      dispatch({ type: 'loading' })
      try {
         const res = await fetch(`${BASE_URL}/cities`, {
            method: 'POST',
            body: JSON.stringify(newCity),
            headers: { 'Content-Type': 'application/json' },
         })
         const data = await res.json()
         dispatch({ type: 'city/created', payload: data })
      } catch (error) {
         dispatch({ type: 'rejected', payload: 'Error when submitting data' })
      }
   }
   async function deleteCity(id) {
      dispatch({ type: 'loading' })
      try {
         await fetch(`${BASE_URL}/cities/${id}`, {
            method: 'DELETE',
         })
         dispatch({ type: 'city/deleted', payload: id })
      } catch (error) {
         alert('Error when delete data')
      }
   }
   return (
      <CitiesContext.Provider
         value={{
            cities,
            isLoading,
            currentCity,
            error,
            getCity,
            createCity,
            deleteCity,
         }}
      >
         {children}
      </CitiesContext.Provider>
   )
}
function useCities() {
   const context = useContext(CitiesContext)
   if (!context) throw new Error(`dop't use CitiesContext outside provider`)
   return context
}

export { CitiesProvider, useCities }
