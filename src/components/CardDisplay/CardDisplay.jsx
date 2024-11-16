import React, { useContext, useEffect, useState } from 'react';
import { useCardContext } from '../../StoreContext/Contex';
import Card from '../Card/Card';
import './CardDisplay.css';

function CardDisplay({ category, priority, status, user }) {
  const { cards, sortBy } = useCardContext();  // Assuming this provides cards and the sorting criterion
  const [filteredAndSortedCards, setFilteredAndSortedCards] = useState([]);

  // Function to count the number of cards
  const countCards = () => {
    return filteredAndSortedCards.length;
  };

  useEffect(() => {
    let result;

    if (category === "Priority") {
      result = cards.filter(item => item.priority === priority);
    } else if (category === "Status") {
      result = cards.filter(item => item.status === status);
    } else if (category === "Users") {
      result = cards.filter(item => item.userId === user);
    }

    const sortResult = (array, sortBy) => {
      if (sortBy === "Priority") {
        return array.sort((a, b) => b.priority - a.priority);
      } else if (sortBy === "Title") {
        return array.sort((a, b) => a.title.localeCompare(b.title));
      }
      return array;
    };

    setFilteredAndSortedCards(sortResult([...result], sortBy));  
  }, [cards, category, priority, status, user, sortBy]);

  return (
    <>
      <div className='class-display-container'>
        <div className="countName">
            Total Tickets: {countCards()}
        </div>
      {filteredAndSortedCards.map((item) => (
        <div className='card-container' key={item.id}>
          <Card 
            id={item.id} 
            status={item.status}
            title={item.title} 
            tag={item.tag}
          />
        </div>
      ))}
      </div>
    </>
  );
}

// Export the component and the countCards function
export { CardDisplay};
