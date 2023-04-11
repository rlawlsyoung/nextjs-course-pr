import { GetServerSideProps } from "next";

interface UserProfilePageProps {
  username: "string";
}

const UserProfilePage: React.FC<UserProfilePageProps> = ({ username }) => {
  return <div>{username}</div>;
};

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
  res,
}) => {
  console.log(req, "req");
  console.log(res, "res");

  return {
    props: {
      username: "Max",
    },
  };
};

export default UserProfilePage;
