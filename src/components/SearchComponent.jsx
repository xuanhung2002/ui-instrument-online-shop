import React from "react";
import { Input, Space } from "antd";
const { Search } = Input;
const onSearch = (value, _e, info) => console.log(info?.source, value);
function SearchComponent() {
  return (
    <div>
      <Search
        placeholder="Search..."
        allowClear
        onSearch={onSearch}
        size="large"
        style={{
          width: 500,
        }}
      />
    </div>
  );
}
export default SearchComponent;
