import "./App.css";
import ProductFilterSelect from "./components/ProductFilterSelect";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductCarousel from "./components/ProductCarousel";

function App() {
  const [response, setResponse] = useState({
    data: [],
    productNames: [],
    cityNames: [],
    stateNames: [],
  });
  const [responseDataBackupForFiltering, setResponseDataBackupForFiltering] =
    useState([]);
  const [loading, setLoading] = useState(false);
  const [filtersApplied, updateFiltersApplied] = useState({
    products: "",
    state: "",
    city: "",
  });

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    setLoading(true);
    axios
      .get("https://assessment-edvora.herokuapp.com")
      .then((response) => {
        let states = [],
          cities = [],
          products = [];
        response.data.forEach((item) => {
          if (states.indexOf(item.address.state) === -1) {
            states.push(item.address.state);
          }
          if (cities.indexOf(item.address.city) === -1) {
            cities.push(item.address.city);
          }
          if (products.indexOf(item.product_name) === -1) {
            products.push(item.product_name);
          }
        });
        setResponse({
          data: response.data,
          productNames: [...products],
          cityNames: [...cities],
          stateNames: [...states],
        });
        setResponseDataBackupForFiltering(response.data);
      })
      .catch((error) => {
        console.log(error);
        setResponse({
          data: [],
          productNames: [],
          cityNames: [],
          stateNames: [],
        });
      })
      .finally(() => setLoading(false));
  }

  const handleFilterValueChange = (e) => {
    const { name, value } = e.target;

    updateFiltersApplied((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    setResponse((prevState) => ({
      ...prevState,
      data: responseDataBackupForFiltering.filter(
        (item) =>
          (filtersApplied.products === ""
            ? item.product_name !== ""
            : item.product_name === filtersApplied.products) &&
          (filtersApplied.state === ""
            ? item.address.state !== ""
            : item.address.state === filtersApplied.state) &&
          (filtersApplied.city === ""
            ? item.address.city !== ""
            : item.address.city === filtersApplied.city)
      ),
    }));
  }, [filtersApplied]);

  const filteredProductNames = response.data.reduce((acc, productItem) => {
    if (acc.indexOf(productItem.product_name) === -1) {
      acc.push(productItem.product_name);
    }
    return acc;
  }, []);

  return (
    <div className="Edvora-app">
      <header className="Edvora-app-header">
        <main>
          <div className="left-container">
            <ProductFilterSelect
              {...response}
              {...filtersApplied}
              handleFilterValueChange={handleFilterValueChange}
            />
          </div>

          <div className="right-container">
            <h2>Edvora</h2>
            <h4>Products</h4>
            {!loading ? (
              filteredProductNames.length > 0 ? (
                filteredProductNames.map((product) => (
                  <ProductCarousel
                    productDetails={response.data.filter(
                      (item) => item.product_name === product
                    )}
                    productName={product}
                  />
                ))
              ) : (
                <div className="no-data-message">
                  No data available based on filtered criteria
                </div>
              )
            ) : (
              <div className="no-data-message">Loading data...</div>
            )}
          </div>
        </main>
      </header>
    </div>
  );
}

export default App;
