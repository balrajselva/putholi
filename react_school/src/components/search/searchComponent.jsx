import React from 'react';

export const SearchBox = ({placeholder , handleEvent}) => (

<input type = 'search' 

placeholder= {placeholder}
             onChange={handleEvent} />
 
);