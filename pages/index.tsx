import Link from "next/link";
import fs from "fs/promises";
import path from "path";

import { GetStaticProps } from "next";

export interface dataType {
  id: string;
  title: string;
  description: string;
}

interface HomepageProps {
  products: { id: number; title: string }[];
}

const Homepage: React.FC<HomepageProps> = ({ products }) => {
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <Link href={`/${product.id}`}>{product.title}</Link>
        </li>
      ))}
    </ul>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  console.log("re generating..");
  const filePath = path.join(process.cwd(), "data", "dummy-data.json");
  // cwd란 현재 작업 디렉토리를 뜻함. 참고로 현재 작업 디렉토리는 pages 폴더가 아닌 전체 프로젝트 폴더임
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData.toString());

  if (!data.products.length) {
    return { notFound: true };
  }

  return {
    props: {
      products: data.products,
    },
    revalidate: 10,
  };
};

export default Homepage;
