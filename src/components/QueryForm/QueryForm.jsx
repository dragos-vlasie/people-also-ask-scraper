import React, { useState } from 'react';
import styles from './QueryForm.module.scss';

const QueryForm = ({ onSubmit }) => {
  const [query, setQuery] = useState('');
  const [queries, setQueries] = useState([]);

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const handleAddQuery = () => {
    if (query.trim() !== '') {
      setQueries([...queries, query]);
      setQuery('');
    }
  };

  const handleRemoveQuery = (index) => {
    const updatedQueries = [...queries];
    updatedQueries.splice(index, 1);
    setQueries(updatedQueries);
  };

  const handleSubmit = () => {
    if (queries.length > 0) {
      onSubmit(queries);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddQuery();
    }
  };

  return (
    <div className={styles.container}>
      <h2>Add Queries</h2>
      <div className={styles.inputContainer}>
        <input type="text" value={query} onKeyPress={handleKeyPress} onChange={handleQueryChange} placeholder="Enter query" />
        <button onClick={handleAddQuery}>Add</button>
      </div>
      <ul>
        {queries.map((q, index) => (
          <li key={index}>
           <p>{q}</p> <button onClick={() => handleRemoveQuery(index)}>Remove</button>
          </li>
        ))}
      </ul>
      <button type="submit" onClick={handleSubmit}>
        Submit Queries
      </button>
    </div>
  );
};

export default QueryForm;
