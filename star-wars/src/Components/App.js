import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Films from './Films';
import NotFound from '../NotFound';
import MovieContents from './MovieContents';

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Films/>}/>
        <Route path='/item/:episode_id' element={<MovieContents/>}/>
        
        {/* * - wildcard */}
        <Route path='*' element={<NotFound />} />
    </Routes>
    </>
  )
}

export default App