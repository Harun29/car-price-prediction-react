import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import CircularProgress from "@mui/material/CircularProgress";
import "../Style/HomePage.css";
import "../Style/UpdateData.css";

const UpdateCsv = () => {
  const [activeLink, setActiveLink] = useState(0);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);

  const handleNavClick = (index) => {
    setActiveLink(index);
  };

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);
    setLoading(true);

    // Simulate file upload time
    setTimeout(() => {
      setLoading(false);
    }, 2000); // 2 seconds for demo
  };

  const handleUpdateData = () => {
    setUpdateLoading(true);
    // Simulate data update process
    setTimeout(() => {
      setUpdateLoading(false);
    }, 3000); // 3 seconds for demo
  };

  useEffect(() => {
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
              <i className="fa fa-home"></i>
              <span>Instructions</span>
            </a>
            <a
              href="#"
              className={activeLink === 1 ? "active" : ""}
              onClick={() => handleNavClick(1)}
            >
              <i className="fa fa-briefcase"></i>
              <span>Upload CSV</span>
            </a>
            <a
              href="#"
              className={activeLink === 2 ? "active" : ""}
              onClick={() => handleNavClick(2)}
            >
              <i className="fa fa-user-secret"></i>
              <span>Update Data</span>
            </a>
            <a
              href="#"
              className={activeLink === 3 ? "active" : ""}
              onClick={() => handleNavClick(3)}
            >
              <i className="fa fa-send"></i>
              <span>Update Model</span>
            </a>
            <div className="line"></div>
          </nav>
        <div className="update-data-content">
          {activeLink === 0 && (
            <div className="instructions">
              <p>
                Updating old data is essential to ensure that your models and
                insights are accurate and relevant. To update your data, follow
                these steps:
              </p>
              <ol>
                <li>Upload your CSV file with the required columns.</li>
                <li>Click "Update Data" to process the uploaded file.</li>
                <li>Select and train a model based on the updated data.</li>
              </ol>
            </div>
          )}

          {activeLink === 1 && (
            <div className="upload-csv">
              <input type="file" onChange={handleFileUpload} />
              <p>
                Please ensure your file contains the required columns: [Column1,
                Column2, Column3].
              </p>
              {loading && <CircularProgress />}
              {file && !loading && (
                <p>File "{file.name}" uploaded successfully.</p>
              )}
            </div>
          )}

          {activeLink === 2 && (
            <div className="update-data">
              <button onClick={handleUpdateData}>Update Data</button>
              {updateLoading && <CircularProgress />}
              {!updateLoading && !loading && <a href="/">Go to Home</a>}
            </div>
          )}

          {activeLink === 3 && (
            <div className="train-model">
              <label>Select Model:</label>
              <select>
                <option value="model1">Model 1</option>
                <option value="model2">Model 2</option>
              </select>
              <button>Train Model</button>
              {/* Add loading state here if needed */}
            </div>
          )}
        </div>
        </div>
        {/* Moved content below the navigation */}
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
