import React, { useEffect, useState } from "react";
import { Page, Layout, Key } from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useTranslation } from "react-i18next";
import { useAuthenticatedFetch } from "../hooks";
import 'bootstrap/dist/css/bootstrap.min.css';
import { ProductsCard } from "../components";
import { data } from "@shopify/app-bridge/actions/Modal";

export default function HomePage() {
  const { t } = useTranslation();
  const fetch = useAuthenticatedFetch();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products");
      const data = await response.json();
      setProducts(data.products);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setIsLoading(false);
    }
  };
  console.log(products);
  const img = products.map((item) => item.node.images.edges[0].node.originalSrc);
  console.log(img);
  const imgsrc = img.edges;
  console.log(imgsrc);
  


  return (
    <div>
      {/* <Page narrowWidth>
        <TitleBar title={t("HomePage.title")} primaryAction={null} />
        <Layout>
          <Layout.Section>
            <ProductsCard></ProductsCard>
          </Layout.Section>
        </Layout>
      </Page > */}
      <div>
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Status</th>
              <th scope="col">Images</th>
              <th scope="col">Price</th>
              <th scope="col">Category</th>
              <th scope="col">Description</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item, index) => (
              <tr key={item.node.id}>
                <th scope="row">{index + 1}</th>
                <td>{item.node.id}</td>
                <td>{item.node.title}</td>
                <td>{item.node.status}</td>
                <td>
                  <img src={item.node.images.edges[0].node.originalSrc} alt="Product" style={{ width: '100px' }} />
                </td>
                <td>{item.node.variants.edges[0].node.price} $</td>
                <td>{item.node.productType}</td>
                <td>{item.node.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


    </div>
  );
}
