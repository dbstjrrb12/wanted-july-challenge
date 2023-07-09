import { ReactNode } from 'react';

const Route = ({ component }: RouteProps) => {
  return component;
};

export { Route };

export type RouteProps = {
  path: string;
  component: ReactNode;
};
