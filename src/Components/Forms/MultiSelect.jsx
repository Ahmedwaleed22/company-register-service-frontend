// Packages
import React from 'react';
import Select from 'react-select';

const MultiSelect = ({valueList, onChange, options, maxLimit = 4}) => {
  return (
    <Select
      value={valueList}
      isMulti
      onChange={onChange}
      options={options}
      isOptionDisabled={(option) => valueList.length >= maxLimit}
    />
  );
};

export default MultiSelect