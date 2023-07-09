import { useContext } from 'react';
import { NavigationContext } from '../component/Router';

const useRouter = () => {
  const { changePath } = useContext(NavigationContext);

  return { push: changePath };
};

export { useRouter };
