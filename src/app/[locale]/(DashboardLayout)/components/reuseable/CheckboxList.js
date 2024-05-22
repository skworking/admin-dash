import React from 'react';
import { Checkbox } from 'antd';

function CheckboxList({ obj, filters, setFilters }) {
  return (
    <div className={`${Object.keys(obj)?.length > 5 ? 'h-[200px] overflow-auto' : 'h-auto'}`}>
      {Object.entries(obj).map(([product, count]) => (
        <div key={product} className="p-1 flex gap-2">
          <Checkbox
            className="w-full"
            key={product}
            value={product}
            checked={filters.includes(product)}
            onChange={(e) => {
                const updatedFilters = isChecked
                    ? filters.filter(value => value !== item)
                    : [...filters, item];
                setFilters(prevFilters => ({
                    ...prevFilters,
                    [filterType]: updatedFilters
                }));
            }}
          >
            {`${product} (${count})`}
          </Checkbox>
        </div>
      ))}
    </div>
  );
}

export default CheckboxList;
