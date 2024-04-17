import { useEffect } from 'react';
import { useAppContext } from './contexts/AppStore';
import useRouteElements from './useRouteElements';
import { LocalStorageEventTarget } from './utils/auth';

function App() {
  const routeElements = useRouteElements();
  const { reset } = useAppContext()
  useEffect(() => {
    LocalStorageEventTarget.addEventListener('clearLS', reset)
    return () => {
      LocalStorageEventTarget.removeEventListener('clearLS', reset)
    }
  }, [reset])
  return (
   <div>
    {routeElements}
   </div>
  )
}

export default App
