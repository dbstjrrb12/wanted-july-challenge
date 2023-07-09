import { Children, ReactNode, isValidElement, useContext } from 'react';
import { NavigationContext } from './Router';
import { RouteProps } from './Route';

const Routes = ({ children }: { children: ReactNode }) => {
  const { currentpath } = useContext(NavigationContext);

  const routeElements: ReactNode[] = Children.toArray(children).filter(
    (child) => {
      return (
        isValidElement<RouteProps>(child) && child.props.path === currentpath
      );
    }
  );

  return routeElements;
};

export { Routes };
