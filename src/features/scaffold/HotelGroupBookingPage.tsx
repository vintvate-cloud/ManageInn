import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function HotelGroupBookingPage() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/dashboard/hotel/frontoffice', { replace: true });
  }, [navigate]);
  return null;
}
