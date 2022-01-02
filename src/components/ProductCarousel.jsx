import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

const handleDragStart = (e) => e.preventDefault();

const responsive = {
  0: { items: 1 },
  568: { items: 2 },
  1024: { items: 3 },
};

const headerStyle = {
  borderBottom: "2px solid rgba(203, 203, 203, 0.5)",
  paddingBottom: "10px",
  marginTop: "20px",
  fontWeight: "normal",
  fontSize: "20px",
  lineHeight: "23px",
  color: "#FFFFFF",
};

const ProductCarousel = (props) => {
  const { productDetails } = props;

  const items = productDetails.map((item) => (
    <div className="item" data-value="1" onDragStart={handleDragStart}>
      <img src={item.image} alt={item.discription} />
      <div className="product-name">{item.product_name}</div>
      <div className="brand-name">{item.brand_name}</div>
      <div className="price"><span className="dollar">$</span> {item.price}</div>
      <div className="location-date">
        <span>{item.address.city}</span>
        <span>Date: {item.date.split("T")[0]}</span>
      </div>
      <div className="description">{item.discription}</div>
    </div>
  ));

  return (
    <>
      <h3 style={headerStyle}>{props.productName}</h3>
      <div className="alice-carousel-container">
        <AliceCarousel
          mouseTracking
          keyboardNavigation
          items={items}
          responsive={responsive}
          controlsStrategy="alternate"
        />
      </div>
    </>
  );
};

export default ProductCarousel;
