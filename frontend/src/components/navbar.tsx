import "./style.css";

import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <Link to={"/image/create"}>Add Image</Link>
    </div>
  );
};

export default Navbar;
