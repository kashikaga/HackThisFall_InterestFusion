import { useNavigate } from "react-router-dom";
function PageNotFound() {
  const navigate = useNavigate();
  return (
    <div className=" flex flex-col justify-center  items-center h-screen">
      <h1 className="text-purple-50000 font-bold text-[250px]">Oops!</h1>
      <h3 className="font-bold text-2xl mt-6">404 - PAGE NOT FOUND</h3>
      <h5 className="font-medium text-xl mt-6 text-center">
        The page you are looking for might have been removed
        <br />
        had its name changed or is temporarily unavailable
      </h5>
      <button
        className="rounded-lg px-8 py-2 mt-5 bg-blue-500"
        onClick={() => {
          navigate("/");
        }}
      >
        GO TO HOMEPAGE
      </button>
    </div>
  );
}
export default PageNotFound;
