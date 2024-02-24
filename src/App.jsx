import { Suspense, lazy, useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

// import Product from './pages/Product'
// import Pricing from './pages/Pricing'
// import Homepage from './pages/Homepage'
// import Login from './pages/Login'
// import AppLayout from './pages/AppLayout'
// import PageNotFount from './pages/PageNotFount'
const Homepage = lazy(() => import('./pages/Homepage'))
const Product = lazy(() => import('./pages/Product'))
const Pricing = lazy(() => import('./pages/Pricing'))
const Login = lazy(() => import('./pages/Login'))
const AppLayout = lazy(() => import('./pages/AppLayout'))
const PageNotFount = lazy(() => import('./pages/PageNotFount'))
import CityList from './Components/CityList'
import City from './Components/City'
import Form from './Components/Form'
import CountryList from './Components/CountryList'
import SpinnerFullPage from './Components/SpinnerFullPage'
import { CitiesProvider } from './contexts/CitiesContext'
import { AuthProvider } from './contexts/FakeAuthContext'
import ProtectedRoute from './Components/ProtectedRoute'
const BASE_URL = 'http://localhost:4399'
function App() {
   const [cities, setCities] = useState([])
   const [isLoading, setIsLoading] = useState(false)
   useEffect(function () {
      async function fetchCities() {
         try {
            setIsLoading(true)
            const res = await fetch(`${BASE_URL}/cities`)
            const data = await res.json()
            setCities(data)
         } catch (error) {
            alert('Error when fetching data')
         } finally {
            setIsLoading(false)
         }
      }
      fetchCities()
   }, [])
   return (
      <AuthProvider>
         <CitiesProvider>
            <BrowserRouter>
               <Suspense fallback={<SpinnerFullPage></SpinnerFullPage>}>
                  <Routes>
                     <Route index element={<Homepage></Homepage>}></Route>
                     <Route
                        path="product"
                        element={<Product></Product>}
                     ></Route>
                     <Route
                        path="pricing"
                        element={<Pricing></Pricing>}
                     ></Route>
                     <Route path="login" element={<Login></Login>}></Route>
                     <Route
                        path="app"
                        element={
                           <ProtectedRoute>
                              <AppLayout></AppLayout>
                           </ProtectedRoute>
                        }
                     >
                        <Route
                           index
                           element={<Navigate replace to="cities"></Navigate>}
                        ></Route>
                        <Route
                           path="cities"
                           element={<CityList></CityList>}
                        ></Route>
                        <Route
                           path="cities/:id"
                           element={<City></City>}
                        ></Route>
                        <Route
                           path="countries"
                           element={<CountryList></CountryList>}
                        ></Route>
                        <Route path="form" element={<Form></Form>}></Route>
                     </Route>
                     <Route
                        path="*"
                        element={<PageNotFount></PageNotFount>}
                     ></Route>
                  </Routes>
               </Suspense>
            </BrowserRouter>
         </CitiesProvider>
      </AuthProvider>
   )
}

export default App
