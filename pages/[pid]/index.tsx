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
  if (!loadedProduct) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1>{loadedProduct.title}</h1> <p>{loadedProduct.description}</p>
    </>
  );
};

const getData = async () => {
  const filePath = path.join(process.cwd(), "data", "dummy-data.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData.toString());

  return data;
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const productId = params?.pid;

  const data = await getData();

  const product = data.products.find(
    (product: dataType) => product.id === productId
  );

  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      loadedProduct: product,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await getData();

  const ids = data.products.map((product: dataType) => product.id);

  const pathsWithParams = ids.map((id: string) => ({ params: { pid: id } }));

  return {
    paths: pathsWithParams,
    fallback: true,
  };
};

export default ProductDetailPage;
