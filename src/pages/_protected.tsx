import { useEffect, useState } from 'react';
import { createFileRoute, Outlet } from '@tanstack/react-router';
import { useNavigate } from '@tanstack/react-router';
import { Navbar } from '@/components/atoms/Navbar';

export const Route = createFileRoute('/_protected')({
  component: ProtectComponent,
});

function ProtectComponent() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const authenticate = async () => {
      try {
        const token = sessionStorage.getItem('token');
        const accessGoogle = sessionStorage.getItem('Access_Google');

        if (!token && !accessGoogle) {
          navigate({ to: '/Login' });
          return;
        }

        if (accessGoogle) {
          setIsAuthenticated(true);
          return;
        }
        if (token) {
          const payload = token.split('.')[1];
          if (!payload) throw new Error('Invalid token format');
          const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
          const padded = base64.padEnd(base64.length + (4 - base64.length % 4) % 4, '=');
          const decoded = JSON.parse(atob(padded));

          if (!decoded.exp) throw new Error('Token missing expiration');
          
          const expirationTime = decoded.exp * 1000;
          if (Date.now() >= expirationTime) {
            throw new Error('Token expired');
          }

          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Authentication error:', error);
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('Access_Google');
        navigate({ to: '/Login' });
      } finally {
        setIsLoading(false);
      }
    };

    authenticate();
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Checking authentication...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Redirecting to login...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">
        <Outlet />
      </div>
    </div>
  );
}

export default ProtectComponent;