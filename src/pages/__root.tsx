import { createRootRoute, Outlet } from '@tanstack/react-router';
import NotFoundComponent from './NotFound/index.lazy';
import { Navbar } from '@/components/atoms/Navbar';

export const Route = createRootRoute({
  component: RootComponent,
    notFoundComponent: () => <NotFoundComponent />
});

function RootComponent() {

  return (
    <>
      <Outlet />
    </>
  );
}
