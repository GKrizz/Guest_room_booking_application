import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Import Routes along with BrowserRouter and Route
import Homescreen from './screens/Homescreen';
import Bookingscreen from './screens/Bookingscreen';
import Loginscreen from './screens/Loginscreen';
import Registerscreen from './screens/Registerscreen';
import Profilescreen from './screens/Profilescreen';
import Adminscreen from './screens/Adminscreen';
import Landingscreen from './screens/Landingscreen';

function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/home" exact element={<Homescreen />} /> 
          <Route path='/book/:roomid/:fromdate/:todate' exact element={<Bookingscreen />} /> 
          <Route path='/register' exact element={<Registerscreen/>}/>
          <Route path='/login' exact element={<Loginscreen/>}/>
          <Route path='/profile' exact element={<Profilescreen/>}/>
          <Route path='/admin' exact element={<Adminscreen/>}/>
          <Route path='/' exact element={<Landingscreen/>}/>
        </Routes>
      </BrowserRouter> 
    </div>
  );
}

export default App;
