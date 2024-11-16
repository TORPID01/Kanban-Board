import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const CardContext = createContext();

export const useCardContext = () => {
  return useContext(CardContext);
};

export const CardProvider = ({ children }) => {
  // Initialize cards and users from localStorage if available, otherwise empty arrays
  const [cards, setCards] = useState(() => {
    const savedCards = localStorage.getItem('cards');
    return savedCards ? JSON.parse(savedCards) : [];
  });
  
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem('users');
    return savedUsers ? JSON.parse(savedUsers) : [];
  });

  // Initialize category and sortBy from localStorage, otherwise default values
  const [category, setCategory] = useState(localStorage.getItem('category') || 'Priority');
  const [sortBy, setSortBy] = useState(localStorage.getItem('sortBy') || 'Priority');

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get('https://api.quicksell.co/v1/internal/frontend-assignment');
        setCards(response.data.tickets); // Update the cards state with the fetched data
        setUsers(response.data.users);

      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    // Fetch cards only if they are not already present in localStorage
    if (!localStorage.getItem('cards')) {
      fetchCards();
    }

  }, []);

  useEffect(() => {
    // Persist category and sortBy to localStorage whenever they change
    localStorage.setItem('category', category);
    localStorage.setItem('sortBy', sortBy);
  }, [category, sortBy]);

  return (
    <CardContext.Provider value={{ cards, setCards, users, setUsers, category, setCategory, sortBy, setSortBy }}>
      {children}
    </CardContext.Provider>
  );
};
