"use client";

import React, { useState } from 'react';
import { FaMapMarkerAlt, FaCalendarAlt, FaUsers, FaSearch } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useRouter } from 'next/navigation';
import './SearchFilter.css';

const SearchFilter = () => {
  const router = useRouter();
  const [location, setLocation] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('1');

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (location) params.set('location', location);
    if (checkIn) params.set('checkIn', checkIn);
    if (checkOut) params.set('checkOut', checkOut);
    if (guests) params.set('guests', guests);

    router.push(`/villas?${params.toString()}`);
  };

  return (
    <div className="search-filter-wrapper animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
      <div className="search-filter-container glass">
        {/* Location Section */}
        <div className="search-filter-section location-section">
          <FaMapMarkerAlt className="section-icon" />
          <div className="section-content">
            <label className="section-label">LOCATION</label>
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger className="border-0 bg-transparent focus:ring-0 h-auto p-0 text-left">
                <SelectValue placeholder="Where to go?" />
              </SelectTrigger>
              <SelectContent className="bg-black/95 backdrop-blur-xl border-white/10 text-white">
                <SelectItem value="goa">Goa</SelectItem>
                <SelectItem value="coorg">Coorg</SelectItem>
                <SelectItem value="udaipur">Udaipur</SelectItem>
                <SelectItem value="shimla">Shimla</SelectItem>
                <SelectItem value="alibaug">Alibaug</SelectItem>
                <SelectItem value="mumbai">Mumbai</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="search-filter-divider" />

        {/* Check-in Section */}
        <div className="search-filter-section date-section">
          <FaCalendarAlt className="section-icon" />
          <div className="section-content">
            <label className="section-label">CHECK IN</label>
            <input
              type="date"
              className="date-input"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </div>
        </div>

        <div className="search-filter-divider tiny" />

        {/* Check-out Section */}
        <div className="search-filter-section date-section">
          <div className="section-content">
            <label className="section-label">CHECK OUT</label>
            <input
              type="date"
              className="date-input"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>
        </div>

        <div className="search-filter-divider" />

        {/* Guests Section */}
        <div className="search-filter-section guests-section">
          <FaUsers className="section-icon" />

          <div className="section-content">
            <Select value={guests} onValueChange={setGuests}>
              <SelectTrigger className="border-0 bg-transparent focus:ring-0 h-auto p-0 text-left">
                <SelectValue placeholder="Guests" />
              </SelectTrigger>
              <SelectContent className="bg-black/95 backdrop-blur-xl border-white/10 text-white">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num} {num === 1 ? 'Guest' : 'Guests'}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Search Button */}
        <button className="search-filter-button" onClick={handleSearch}>
          <FaSearch className="mr-2 text-sm" />
          SEARCH
        </button>
      </div>
    </div>
  );
};

export default SearchFilter;
