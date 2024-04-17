// eslint-disable-next-line no-unused-vars
import React from "react";
import { useParams } from "react-router";

function ProductDetail() {
  const params = useParams();

  return <div>Id product: {params.id}</div>;
}

export default ProductDetail;
