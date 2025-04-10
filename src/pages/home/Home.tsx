
import llama from "../LLamarada.svg";
const Home = () => {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", WebkitAlignItems: "center" }}>
      <h1 style={{
        fontSize: "4rem"
      }}>Sistema Hotelero</h1>
      < img src={llama} alt="" />
    </div>
  );
};

export default Home;
