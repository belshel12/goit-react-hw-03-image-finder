import { Dna } from 'react-loader-spinner';

const Loader = () => {
  return (
    <span>
      <Dna
        visible={true}
        height="80"
        width="80"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
      />
    </span>
  );
};

export default Loader ;
