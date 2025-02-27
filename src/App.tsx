import { APIProvider } from '@vis.gl/react-google-maps'
import './App.css'

import CustomMap from './Map'

function App() {
  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAP_KEY}>
      <CustomMap />
    </APIProvider>
  )
}

export default App
