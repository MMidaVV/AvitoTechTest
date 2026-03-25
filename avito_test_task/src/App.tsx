import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Browser from './components/Browser/Browser'
import Desktop from './components/Desktop/Desktop'
import ItemsListPage from './pages/ItemsList/ItemsListPage'
import ItemEditPage from './pages/ItemEditPage/ItemEditPage'
import ItemPage from './pages/ItemPage/ItemPage'

function App() {
  return (
    <Desktop>
      <Browser>
        <Routes>
          <Route path="/ads" element={<ItemsListPage />} />
          <Route path="/ads/:id" element={<ItemPage />} />
          <Route path="/ads/:id/edit" element={<ItemEditPage />}></Route>
          <Route path="/" element={<Navigate to="/ads" replace />} />
          <Route path="*" element={<Navigate to="/ads" replace />} />
        </Routes>
      </Browser>     
    </Desktop>
  )
}

export default App