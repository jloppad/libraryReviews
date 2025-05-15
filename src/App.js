import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Index from './pages';
import Create from './pages/create';
import View from './pages/view';
import Login from './pages/login';
import Register from './pages/register';
import Review from './pages/review';
import Edit from './pages/edit';
import PrivateRoute from './components/privateRoute';
import Admin from "./admin/App.tsx"

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<PrivateRoute><Index /></PrivateRoute>} />
          <Route path='create' element={<PrivateRoute><Create /></PrivateRoute>}/>
          <Route path='view/:bookId' element={<PrivateRoute><View /></PrivateRoute>}/>
          <Route path='edit/:bookId' element={<PrivateRoute><Edit /></PrivateRoute>}/>
          <Route path='review' element={<PrivateRoute><Review /></PrivateRoute>}/>
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route path='admin' element={<PrivateRoute><Admin /></PrivateRoute>}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
