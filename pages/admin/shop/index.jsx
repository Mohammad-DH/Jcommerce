import Link from "next/link";
import React from "react";

export default function index() {
  return (
    <div>
      <Link href="shop/products">product management</Link>
      <br />
      <Link href="shop/categories">category management</Link>
    </div>
  );
}
