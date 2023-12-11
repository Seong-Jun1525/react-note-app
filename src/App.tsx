import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import './App.css'
import { Navbar, Sidebar } from './layout'
import { AllNotes, ArchiveNotes, ErrorPage, TagNotes, TrashNotes } from './pages'
import { TagsModal } from './components'
import { useAppSelector } from './hooks/redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const {viewEditTagsModal} = useAppSelector(state => state.modal)
  return (
    <div className='App'>
      {viewEditTagsModal && <TagsModal type='edit' /> }

      <ToastContainer
        position='bottom-right'
        theme='light'
        pauseOnHover
        autoClose={1500}
      />

      <BrowserRouter>
        <Sidebar />
        <div className='app__container'>
          <Navbar />
          <Routes>
            <Route path='/' element={<AllNotes />} />
            <Route path='/archive' element={<ArchiveNotes />} />
            <Route path='/trash' element={<TrashNotes />} />
            <Route path='/tag/:name' element={<TagNotes />} />
            <Route path='/404' element={<ErrorPage />} />
            <Route path='/*' element={<Navigate to={"/404"} />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
