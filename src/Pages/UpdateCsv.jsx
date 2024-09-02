import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import CircularProgress from "@mui/material/CircularProgress";
import { Button, Alert, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import "../Style/HomePage.css";
import "../Style/UpdateData.css";

const UpdateCsv = () => {
  const [activeLink, setActiveLink] = useState(0);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [model, setModel] = useState();

  const handleChange = (event) => {
    setModel(event.target.value);
  };

  useEffect(() => {
    if (model) console.log(model);
  }, [model]);

  const handleNavClick = (index) => {
    setActiveLink(index);
    setPage(index);
  };

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const handleUpdateData = () => {
    setUpdateLoading(true);

    setTimeout(() => {
      setUpdateLoading(false);
    }, 3000);
  };

  useEffect(() => {
    document.querySelector(".container").classList.add("load");
  }, []);

  const handleNext = () => {
    setPage((prevPage) => {
      const nextPage = prevPage + 1;
      setActiveLink(nextPage);
      return nextPage;
    });
  };

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

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
                  Welcome to the data update process! This section will guide you through updating your existing data to keep your models and insights accurate. Follow the steps provided to ensure a smooth update process.
                </p>
                <ol>
                  <li>Prepare your CSV file with the necessary columns.</li>
                  <li>Upload the file in the next step.</li>
                  <li>Process the data, select a model, and train it using the updated data.</li>
                </ol>
                <Button
                  onClick={handleNext}
                  className="next-button"
                  variant="outlined"
                >
                  NEXT
                </Button>
              </div>
            )}

            {activeLink === 1 && (
              <div className="upload-csv">
                <p>
                  Please upload your CSV file. This file should contain all the required columns (e.g., Column1, Column2, Column3) necessary for updating your data.
                </p>
                <div className="upload-csv-result">
                  <Button
                    className="upload-file-button"
                    component="label"
                    variant="contained"
                    startIcon={<CloudUploadIcon />}
                  >
                    Upload file
                    <VisuallyHiddenInput
                      type="file"
                      onChange={handleFileUpload}
                      multiple
                    />
                  </Button>
                  {loading && (
                    <CircularProgress
                      style={{ padding: "0", marginBottom: "20px" }}
                    />
                  )}
                  {file && !loading && (
                    <Alert
                      style={{ padding: "0", marginBottom: "20px", width: "60%" }}
                      icon={<ErrorOutlineIcon fontSize="inherit" />}
                      severity="error"
                    >
                      File: "{file.name}" is missing required columns or is not in
                      the correct format. Please check your data and try again.
                    </Alert>
                  )}
                </div>
                <Button
                  onClick={handleNext}
                  className="next-button"
                  variant="outlined"
                >
                  NEXT
                </Button>
              </div>
            )}

            {activeLink === 2 && (
              <div className="update-data">
                <p>
                  Now that your file is uploaded, click the button below to update your data. This process will integrate the new data into your existing dataset.
                </p>
                <Button
                  className="update-data-button"
                  variant="outlined"
                  onClick={handleUpdateData}
                >
                  Update Data
                </Button>
                {updateLoading && <CircularProgress />}
                <Button
                  onClick={handleNext}
                  className="next-button"
                  variant="outlined"
                >
                  NEXT
                </Button>
              </div>
            )}

            {activeLink === 3 && (
              <div className="train-model">
                <p>
                  Select a model from the dropdown below to train with your updated data. Once you select a model, click "Train Model" to start the training process.
                </p>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Model</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={model}
                    label="Model"
                    onChange={handleChange}
                  >
                    <MenuItem value={10}>XGBoost</MenuItem>
                    <MenuItem value={20}>Random Forest</MenuItem>
                    <MenuItem value={30}>Linear Regressor</MenuItem>
                  </Select>
                </FormControl>
                <div className="train-model-buttons">
                  <Button variant="contained">Train Model</Button>
                  <Button variant="outlined">Finish</Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="update-data-right-side">
        <motion.img
          className="update-data-default-car"
          src="default-car.png"
          alt="Default Car"
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
