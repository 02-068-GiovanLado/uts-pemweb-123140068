// src/components/SearchForm.jsx
import React, { useState } from 'react';

const departments = [
  { id: '', name: 'All Departments' },
  { id: 1, name: 'American Decorative Arts' },
  { id: 3, name: 'Ancient Near Eastern Art' },
  { id: 4, name: 'Arms and Armor' },
  { id: 5, name: 'Arts of Africa, Oceania, and the Americas' },
  { id: 6, name: 'Asian Art' },
  { id: 9, name: 'Drawings and Prints' },
  { id: 10, name: 'Egyptian Art' },
  { id: 11, name: 'European Paintings' },
  { id: 12, name: 'European Sculpture and Decorative Arts' },
  { id: 13, name: 'Greek and Roman Art' },
  { id: 14, name: 'Islamic Art' },
  { id: 17, name: 'Medieval Art' },
  { id: 19, name: 'Photographs' },
  { id: 21, name: 'Modern Art' },
];

const SearchForm = ({ onSearch }) => {
  const [keyword, setKeyword] = useState('');
  const [departmentId, setDepartmentId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ keyword, departmentId });
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="keyword">Keyword</label>
        <input
          id="keyword"
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="e.g. sunflowers, cat, vase"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="department">Department</label>
        <select
          id="department"
          value={departmentId}
          onChange={(e) => setDepartmentId(e.target.value)}
        >
          {departments.map((d) => (
            <option key={d.id} value={d.id}>{d.name}</option>
          ))}
        </select>
      </div>

      <button type="submit">Search Artworks</button>
    </form>
  );
};

export default SearchForm;