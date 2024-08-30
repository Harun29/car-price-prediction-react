import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "../Style/HomePage.css";
import "../Style/UpdateData.css";

const UpdateCsv = () => {
  const [activeLink, setActiveLink] = useState(0);

  const handleNavClick = (index) => {
    setActiveLink(index);
  };

  useEffect(() => {
    // Add the "load" class to the container after the component mounts
    document.querySelector(".container").classList.add("load");
  }, []);

  return (
    <div className="update-data-container">
      <div className="update-data">
        <div className="container preload">
          <h1>Update Your Data</h1>
          <nav>
            <a
              href="#"
              className={activeLink === 0 ? "active" : ""}
              onClick={() => handleNavClick(0)}
            >
              <i className="fa fa-home"></i><span>Instructions</span>
            </a>
            <a
              href="#"
              className={activeLink === 1 ? "active" : ""}
              onClick={() => handleNavClick(1)}
            >
              <i className="fa fa-briefcase"></i><span>Upload CSV</span>
            </a>
            <a
              href="#"
              className={activeLink === 2 ? "active" : ""}
              onClick={() => handleNavClick(2)}
            >
              <i className="fa fa-user-secret"></i><span>Update Data</span>
            </a>
            <a
              href="#"
              className={activeLink === 3 ? "active" : ""}
              onClick={() => handleNavClick(3)}
            >
              <i className="fa fa-send"></i><span>Update Model</span>
            </a>
            <div className="line"></div>
          </nav>
        </div>
      </div>
      <div className="update-data-right-side">
        <motion.img
          className="update-data-default-car"
          src="default-car.png"
          alt=""
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  );
};

export default UpdateCsv;
