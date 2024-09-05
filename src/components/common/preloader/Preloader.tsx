import loader from "../../../assets/preloader.svg";

export const Preloader = () => {
  return (
    <div style={{width: '50px', height: '50px'}}>
      <img src={loader} alt='loader' style={{maxWidth: '100%'}}/>
    </div>
  )
};
