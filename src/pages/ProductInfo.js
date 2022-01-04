import { React, useEffect, useState } from "react";
import Layout from "../components/Layout";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../FireConfig";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
export default function ProductInfo() {
  const [product, setProduct] = useState();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    getData();
  }, []);

  const { cartItems } = useSelector((state) => state.cartReducer);
  async function getData() {
    try {
      setLoading(true);
      const productTemp = await getDoc(doc(db, "products", params.productId));
      setProduct(productTemp.data());
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  return (
    <Layout loading={loading}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            {product && (
              <div>
                <p className="pi-name">
                  <b>{product.name}</b>
                </p>
                <div className="pi-imgc">
                  <img src={product.imageURL} alt="" className="pi-image" />
                </div>
                <hr />
                <p>{product.description}</p>
                <div className="p-btn justify-content-end mt-3">
                  <button className="pi-btnn" onClick={()=> addToCart(product)}>Add to cart</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
