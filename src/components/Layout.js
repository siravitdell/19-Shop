import React from "react";
import Header from "./Header";
import Loader from "./Loader";

export default function Layout(props) {
  return (
    <div>
      {props.loading && <Loader />}
      <Header />
      <div className="content">{props.children}</div>
    </div>
  );
}
