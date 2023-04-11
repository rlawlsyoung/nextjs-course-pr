import { GetServerSideProps } from "next";

interface UserIdPageProps {
  id: string;
}

const UserIdPage: React.FC<UserIdPageProps> = ({ id }) => {
  return <h1>{id}</h1>;
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const userId = params?.uid;
  return {
    props: {
      id: "userid-" + userId,
    },
  };
};

export default UserIdPage;
