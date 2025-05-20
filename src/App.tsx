import { APIProvider, Map } from '@vis.gl/react-google-maps'
import './App.css'

import CustomMap from './Map'
import Layout from './components/Layout'
import AppProvider from './components/AppProvider'

const center = {lat: 49.18140440608156, lng: -122.84811819468837, address: ''}

function App() {
  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAP_KEY}> 
    
    <AppProvider>
      <Layout>
        <Map
          zoom={12}
          center={center}
          style={{width: '100vw', height: '100vh'}}
          mapId="map"
        >
          <CustomMap />
        </Map>
      </Layout>
    </AppProvider>
    </APIProvider>
  )
}

export default App
