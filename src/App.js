import { useSelector, useDispatch } from 'react-redux/es/exports';

import Counter from './components/Counter';
import Header from './components/Header';
import Auth from './components/Auth';
import UserProfile from './components/UserProfile';


function App() {
  const isAuth = useSelector((state)=>state.auth.isAuthed);

  return (
    <>
    <Header />
    {!isAuth && <Auth />}
    {isAuth && <UserProfile />}
    <Counter />
    </>
  );
}

export default App;
