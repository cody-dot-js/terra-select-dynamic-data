import React, { useState, useCallback } from 'react';
import { render } from 'react-dom';
import Base from 'terra-base';
import Select from 'terra-form-select';
import useFetch from './useFetch';
import randomData from './randomData';

function Example() {
  const { data, isLoading, doFetch } = useFetch('', []);
  const [selectedObjects, setSelectedObjects] = useState([]);

  const handleSearch = useCallback((searchValue) => {
    doFetch(searchValue);
  }, [doFetch]);

  const onSelect = useCallback((value) => {
    const selected = randomData.find(item => item.value === value);
    setSelectedObjects(s => [...s, selected]);
  }, []);

  const onDeselect = useCallback((value) => {
    setSelectedObjects(s => s.filter((o => o.value !== value)));
  }, []);

  return (
    <Base locale="en">
      <p>isLoading? {isLoading.toString()}</p>
      <Select
        variant="multiple"
        onSearch={handleSearch}
        onSelect={onSelect}
        onDeselect={onDeselect}
      >
        {data.map(({ display, value }) => <Select.Option key={value} value={value} display={display} />)}
      </Select>
      <div>
        <h2>List of selected objects:</h2>
        <ul>
          {selectedObjects.map(({ value, display }) => (
            <li key={value}>
              display: <strong>{display}</strong> | value: <strong>{value}</strong>
            </li>
          ))}
        </ul>
      </div>
    </Base>
  );
}

render(<Example />, document.getElementById('root'));
