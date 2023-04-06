import fs from "fs/promises";
import path from "path";

interface HomepageProps {
  products: { id: number; title: string }[];
}

const Homepage: React.FC<HomepageProps> = ({ products }) => {
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>{product.title}</li>
      ))}
    </ul>
  );
};

export const getStaticProps = async () => {
  const filePath = path.join(process.cwd(), "data", "dummy-data.json");
  // cwd란 현재 작업 디렉토리를 뜻함. 참고로 현재 작업 디렉토리는 pages 폴더가 아닌 전체 프로젝트 폴더임
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData.toString());

  return {
    props: {
      products: data.products,
    },
  };
};

export default Homepage;
