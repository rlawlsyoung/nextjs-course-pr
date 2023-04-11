import { GetServerSideProps } from "next";

interface UserProfilePageProps {
  username: "string";
}

const UserProfilePage: React.FC<UserProfilePageProps> = ({ username }) => {
  return <div>{username}</div>;
};

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      username: "Max",
    },
  };
};

export default UserProfilePage;
