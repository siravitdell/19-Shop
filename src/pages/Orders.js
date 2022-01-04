import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { db } from "../FireConfig";
// import { collection, getDocs, where } from "firebase/firestore";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  // const userid = JSON.parse(localStorage.getItem('currentUser')).user.uid
  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    // try {
    //   setLoading(true);
    //   const result = await getDocs(
    //     collection(db, "orders")
    //   )

    //   const ordersArray = [];
    //   result.forEach((doc) => {
    //     ordersArray.push(doc.data());
    //     setLoading(false);
    //   });
    //   console.log(ordersArray);
    //   setOrders(ordersArray);
    // } catch (err) {
    //   console.log(err);
    //   setLoading(false);
    // }
    setLoading(true);
    const uid = JSON.parse(localStorage.getItem("currentUser")).user.uid;
    db.collection("orders")
      .where("userid", "==", uid)
      .onSnapshot((docs) => {
        var dell = [];
        docs.forEach((doc) => {
          dell = [...dell, doc.data()];
        });
        setOrders(dell);
        setLoading(false);
      });
  }

  return (
    <Layout loading={loading}>
      <h3 className="phead">Your orders</h3>
      {orders.map((order) => {
        return (
          <table className="table mt-4 order">
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
                      <img src={item.imageURL} alt="" height="80" width="80" />
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
    </Layout>
  );
}
