import buildClient from '../api/build-client';

const LandingPage = ({ currentUser }) => {
  return currentUser ? <h1>You're signed in</h1> : <h1>You're NOT signed in</h1>
};

export const getServerSideProps = async (context) => {
  const client = buildClient(context);
  const { data } = await client.get('/api/users/currentuser');

  console.log('LANDING PAGE:', data);
  return {
    props: data
  };
};

export default LandingPage;
