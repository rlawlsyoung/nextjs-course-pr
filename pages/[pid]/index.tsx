import { GetStaticPaths, GetStaticProps } from "next";
import fs from "fs/promises";
import path from "path";

import { dataType } from "..";

interface ProductDetailPageProps {
  loadedProduct: dataType;
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  loadedProduct,
}) => {
  return (
    <>
      <h1>{loadedProduct.title}</h1> <p>{loadedProduct.description}</p>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const productId = params?.pid;

  const filePath = path.join(process.cwd(), "data", "dummy-data.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData.toString());

  const product = data.products.find(
    (product: dataType) => product.id === productId
  );

  return {
    props: {
      loadedProduct: product,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { pid: "p1" } }],
    fallback: "blocking",
  };
};

export default ProductDetailPage;
