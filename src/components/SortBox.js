import React from 'react';


const SortBox = ({value, onChange}) => (
    <select 
        className="sort-box"
        value={value} 
        onChange={e => onChange(e.target.value)}
    >
        <option value={'latest'}>Latest</option>
        <option value={'oldest'}>Oldest</option>
        <option value={'a-z'}>A - Z</option>
        <option value={'z-a'}>Z - A</option>
        <option value={'price-asc'}>Price Ascending</option>
        <option value={'price-desc'}>Price Descending</option>
    </select>
);


export default SortBox;