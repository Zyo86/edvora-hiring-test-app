import React from "react";

const ProductFilterSelect = (props) => {
  const {
    stateNames,
    cityNames,
    productNames,
    products,
    state,
    city,
    handleFilterValueChange,
  } = props;
  return (
    <React.Fragment>
      <div className="edvora-product-filter-container">
        <h4>Filters</h4>
        <div className="edvora-select-wrapper">
          <select
            name="products"
            id="products"
            value={products || "Products"}
            onChange={handleFilterValueChange}
          >
            <option value="Products" disabled>
              Products
            </option>
            {productNames.map((product) => (
              <option key={product} value={product}>
                {product}
              </option>
            ))}
          </select>
        </div>

        <div className="edvora-select-wrapper">
          <select
            name="state"
            id="state"
            value={state || "State"}
            onChange={handleFilterValueChange}
          >
            <option value="State" disabled>
              State
            </option>
            {stateNames.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        <div className="edvora-select-wrapper">
          <select
            name="city"
            id="city"
            value={city || "City"}
            onChange={handleFilterValueChange}
          >
            <option value="City" disabled>
              City
            </option>
            {cityNames.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProductFilterSelect;
