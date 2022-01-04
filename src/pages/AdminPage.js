import { React, useEffect, useState } from "react";
import Layout from "../components/Layout";
import {
  collection,
  getDocs,
  setDoc,
  doc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../FireConfig";
import { ImBin } from "react-icons/im";
import { FaEdit } from "react-icons/fa";
import { Modal, Tabs, Tab } from "react-bootstrap";
import { toast } from "react-toastify";

export default function AdminPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({
    name: "",
    price: 0,
    imageURL: "",
    category: "",
  });
  useEffect(() => {
    getData();
  }, []);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [add, setAdd] = useState(false);
  const [orders, setOrders] = useState([]);

  const editHandler = (item) => {
    setProduct(item);
    setShow(true);
  };

  async function getData() {
    try {
      setLoading(true);
      const productss = await getDocs(collection(db, "products"));
      const productsArray = [];
      productss.forEach((doc) => {
        const obj = {
          id: doc.id,
          ...doc.data(),
        };
        productsArray.push(obj);
        setLoading(false);
      });
      setProducts(productsArray);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }

  useEffect(() => {
    getOrderData();
  }, []);

  async function getOrderData() {
    try {
      setLoading(true);
      const result = await getDocs(collection(db, "orders"));

      const ordersArray = [];
      result.forEach((doc) => {
        ordersArray.push(doc.data());
        setLoading(false);
      });
      console.log(ordersArray);
      setOrders(ordersArray);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }

  const updateProduct = async () => {
    try {
      await setDoc(doc(db, "products", product.id), product);
      handleClose();
      toast.success("Product updated successfully");
      window.location.reload();
    } catch (err) {
      toast.error("Product update failed");
    }
  };

  const addProduct = async () => {
    try {
      await addDoc(collection(db, "products"), product);
      handleClose();
      toast.success("Product added successfully");
      window.location.reload();
    } catch (err) {
      toast.error("Product add failed");
    }
  };

  const addHandler = () => {
    setAdd(true);
    handleShow();
  };

  const deleteProduct = async (item) => {
    try {
      await deleteDoc(doc(db, "products", item.id));
      toast.success("Product deleted successfully");
      getData();
    } catch (err) {
      toast.error("Product deleted failed");
    }
  };

  return (
    <Layout loading={loading}>
      <Tabs
        defaultActiveKey="products"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="products" title="Products">
          <div className="d-flex justify-content-between">
            <h3 className="phead">Product List</h3>
            <button onClick={addHandler} className="pbtn">Add Product</button>
          </div>
          <table className="table mt-4 tba">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item) => {
                return (
                  <tr>
                    <td>
                      <img src={item.imageURL} alt="" height="80" width="80" />
                    </td>
                    <td>{item.name}</td>
                    <td>{item.category}</td>
                    <td>{item.price}</td>
                    <td>
                      <FaEdit
                        color="darkblue"
                        onClick={() => editHandler(item)}
                        className="ic"
                      />
                      <ImBin
                        color="darkred"
                        className="ic"
                        onClick={() => deleteProduct(item)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>
                {add === true ? "Add a product" : "Edit product information"}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {" "}
              <div className="register-form">
                <input
                  type="text"
                  value={product.name}
                  className="form-control"
                  placeholder="name"
                  onChange={(e) =>
                    setProduct({ ...product, name: e.target.value })
                  }
                />
                <input
                  type="text"
                  value={product.imageURL}
                  className="form-control"
                  placeholder="image url"
                  onChange={(e) =>
                    setProduct({ ...product, imageURL: e.target.value })
                  }
                />
                <input
                  type="text"
                  value={product.category}
                  className="form-control"
                  placeholder="category"
                  onChange={(e) =>
                    setProduct({ ...product, category: e.target.value })
                  }
                />
                <input
                  type="number"
                  value={product.price}
                  className="form-control"
                  placeholder="price"
                  onChange={(e) =>
                    setProduct({ ...product, price: Number(e.target.value) })
                  }
                />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <button className="p-btnn" onClick={handleClose}>
                Close
              </button>
              {add ? (
                <button className="p-btnn" onClick={addProduct}>
                  Save
                </button>
              ) : (
                <button className="p-btnn" onClick={updateProduct}>
                  Save
                </button>
              )}
            </Modal.Footer>
          </Modal>
        </Tab>
        <Tab eventKey="orders" title="Orders">
          <h3 className="phead">Order List</h3>
          {orders.map((order) => {
            return (
              <table className="table mt-4 order tba">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {order.cartItems.map((item) => {
                    return (
                      <tr>
                        <td>
                          <img
                            src={item.imageURL}
                            alt=""
                            height="80"
                            width="80"
                          />
                        </td>
                        <td>{item.name}</td>
                        <td>{item.price}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            );
          })}
        </Tab>
      </Tabs>
    </Layout>
  );
}
