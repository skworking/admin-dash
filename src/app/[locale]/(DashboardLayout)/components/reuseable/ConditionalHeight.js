import React from 'react';

function ConditionalHeight({ obj }) {
  const length = Object.keys(obj)?.length;
  const className = length && length > 5 ? 'h-[200px] overflow-auto' : 'h-auto';

 
}

export default ConditionalHeight;