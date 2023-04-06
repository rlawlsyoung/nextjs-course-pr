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

export const getStaticProps = () => {
  return {
    props: {
      products: [
        { id: 1, title: "Product 1" },
        { id: 2, title: "Product 2" },
      ],
    },
  };
};

export default Homepage;
