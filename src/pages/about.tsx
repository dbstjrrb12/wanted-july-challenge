import { useRouter } from '../utils/useRouter';

const About = () => {
  const { push } = useRouter();
  const onClick = () => {
    push('/');
  };

  return (
    <div>
      <h2>about</h2>
      <button onClick={onClick}>go home</button>
    </div>
  );
};

export default About;
