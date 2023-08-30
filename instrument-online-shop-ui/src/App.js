import './App.scss';
import Header from './components/Header';
import Home from './components/Home';
import HomeProducts from './components/HomeProducts';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Header/>
      <Navbar/>
      <Home/>
      <HomeProducts/>
    </>
  );
}

export default App;
