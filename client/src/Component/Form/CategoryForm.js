import React from "react";

const CategoryForm = ({ HandleSubmit, value, SetValue }) => {
  return (
    <>
      <form>
        <input
          type="text"
          value={value}
          onChange={(e) => SetValue(e.target.value)}
          placeholder="Enter New category"
        />
        <button type="submit"  className="btn btn-primary">Submit</button>
      </form>
    </>
  );
};

export default CategoryForm;
