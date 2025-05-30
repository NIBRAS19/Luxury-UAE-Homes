
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const HeroCTA = () => {
  const { user, loading } = useAuth();

  return (
    <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
      {!loading && user ? (
        <Button asChild size="lg" className="bg-gold hover:bg-gold/90 text-white">
          <Link to="/dashboard">Go to Dashboard</Link>
        </Button>
      ) : (
        <>
          <Button asChild size="lg" className="bg-gold hover:bg-gold/90 text-white">
            <Link to="/properties">Browse Properties</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/auth">Sign In / Register</Link>
          </Button>
        </>
      )}
    </div>
  );
};

export default HeroCTA;
