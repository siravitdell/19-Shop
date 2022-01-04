import React, { useState } from "react";
import Layout from "../components/Layout";
import { useSelector } from "react-redux";
import { ImBin } from "react-icons/im";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../FireConfig";
import { toast } from "react-toastify";

export default function CartPage() {
  const { cartItems } = useSelector((state) => state.cartReducer);
  const dispatch = useDispatch();
  const [totalAmount, setTotalAmout] = useState(0);
  const [show, setShow] = useState(false);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [postcode, setPostcode] = useState("");
  const [phone, setPhone] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    let temp = 0;
    cartItems.forEach((cartItem) => {
      temp = temp + cartItem.price;
    });
    setTotalAmout(temp);
  }, [cartItems]);
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);
  const deleteFromCart = (product) => {
    dispatch({ type: "DELETE_FROM_CART", payload: product });
  };

  const deleteFromCart2 = (product) => {
    dispatch({ type: "DONE", payload: product });
  };

  const placeOrder = async () => {
    const addressInfo = {
      name,
      address,
      postcode,
      phone,
    };
    console.log(addressInfo);

    const orderInfo = {
      cartItems,
      addressInfo,
      email: JSON.parse(localStorage.getItem("currentUser")).user.email,
      userid: JSON.parse(localStorage.getItem("currentUser")).user.uid,
    };

    try {
      const result = await addDoc(collection(db, "orders"), orderInfo);
      toast.success("Order placed successfully");
      localStorage.setItem("cartItems", JSON.stringify([]));
      deleteFromCart2([])
      console.log(result)
      handleClose()
    } catch (err) {
      console.log(err);
      toast.error("Order failed");
    }
  };

  return (
    <Layout>
      <table className="table mt-4">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => {
            return (
              <tr>
                <td>
                  <img src={item.imageURL} alt="" height="80" width="80" />
                </td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>
                  <ImBin onClick={() => deleteFromCart(item)}  className="clogo"/>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="d-flex justify-content-end">
        <h1 className="total-amount">Total amount = <span className="tta">{totalAmount} USD</span></h1>
      </div>
      <div className="d-flex justify-content-end">
        <button className="p-btnnn" onClick={handleShow}>
          Place Order
        </button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add your address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="register-form">
            <div>Name</div>
            <input
              type="text"
              className="form-control"
              placeholder="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <div className="sp">Address</div>
            <textarea
              type="text"
              className="form-control"
              placeholder="address"
              rows={3}
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            />
            <div className="sp">Postcode</div>
            <input
              type="number"
              className="form-control"
              placeholder="postcode"
              value={postcode}
              onChange={(e) => {
                setPostcode(e.target.value);
              }}
            />
            <div className="sp">Phone</div>
            <input
              type="number"
              className="form-control"
              placeholder="phone"
              value={[phone]}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="p-btnn" onClick={handleClose}>
            Close
          </Button>
          <Button className="p-btnn" onClick={placeOrder}>
            Order
          </Button>
        </Modal.Footer>
      </Modal>
    </Layout>
  );
}
