import React from 'react';


const SearchBox = ({value, onChange}) => (
	<input 
		type="text" 
		className="search-box" 
		value={value}
		onChange={e => onChange(e.target.value)}
	/>
);


export default SearchBox;