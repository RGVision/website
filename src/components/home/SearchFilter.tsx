"use client";

import React, { useState } from 'react';
import { FaMapMarkerAlt, FaCalendarAlt, FaUsers, FaSearch } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useRouter } from 'next/navigation';
import { DatePickerWithRange } from '@/components/ui/date-range-picker';
import { DateRange } from "react-day-picker";
import { format } from "date-fns";
import './SearchFilter.css';

const SearchFilter = ({ categories = [], initialVillas = [] }: { categories?: any[], initialVillas?: any[] }) => {
  const router = useRouter();
  const [location, setLocation] = useState('');
  const [date, setDate] = useState<DateRange | undefined>(undefined);
  const [guests, setGuests] = useState('1');

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (location) params.set('location', location);
    if (date?.from) params.set('checkIn', format(date.from, "yyyy-MM-dd"));
    if (date?.to) params.set('checkOut', format(date.to, "yyyy-MM-dd"));
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
              <SelectTrigger className="border-0 bg-transparent focus:ring-0 h-auto p-0 text-left text-navy font-semibold">
                <SelectValue placeholder="Where to go?" />
              </SelectTrigger>
              <SelectContent className="bg-white/95 backdrop-blur-xl border-navy/10 text-navy">
                <SelectItem value="kovalam">Kovalam</SelectItem>
                <SelectItem value="mahabalipuram">Mahabalipuram</SelectItem>
                <SelectItem value="nemili">Nemili</SelectItem>
                <SelectItem value="ecr">ECR</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="search-filter-divider" />

        {/* Date Range Section */}
        <div className="search-filter-section date-section">
          <FaCalendarAlt className="section-icon" />
          <div className="section-content">
            <label className="section-label">DATES (IN - OUT)</label>
            <DatePickerWithRange date={date} setDate={setDate} />
          </div>
        </div>

        <div className="search-filter-divider" />

        {/* Guests Section */}
        <div className="search-filter-section guests-section">
          <FaUsers className="section-icon" />

          <div className="section-content">
            <label className="section-label">GUESTS</label>
            <Select value={guests} onValueChange={setGuests}>
              <SelectTrigger className="border-0 bg-transparent focus:ring-0 h-auto p-0 text-left text-white font-bold">
                <SelectValue placeholder="Guests" />
              </SelectTrigger>
              <SelectContent className="bg-white/95 backdrop-blur-xl border-navy/10 text-navy">
                {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num}{num === 12 ? '+' : ''} {num === 1 ? 'Guest' : 'Guests'}
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
