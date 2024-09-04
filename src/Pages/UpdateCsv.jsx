import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import CircularProgress from "@mui/material/CircularProgress";
import {
  Button,
  Alert,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import "../Style/HomePage.css";
import "../Style/UpdateData.css";
import Checkbox from "@mui/material/Checkbox";
import Papa from "papaparse";
import CheckIcon from "@mui/icons-material/Check";

const UpdateCsv = () => {
  const [activeLink, setActiveLink] = useState(0);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [model, setModel] = useState();

  const [modelLoading, setModelLoading] = useState(false);
  const [modelTrainedMessage, setModelTrainedMessage] = useState("");

  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateMessage, setUpdateMessage] = useState("");

  const [columnsMatch, setColumnsMatch] = useState(null);
  const predefinedColumns = [
    "createdat",
    "displacement",
    "doors",
    "fuel",
    "kilowatts",
    "location",
    "manufacturer",
    "mileage",
    "model",
    "price",
    "title",
    "year",
    "color",
    "cruisecontrol",
    "drivetrain",
    "emissionstandard",
    "parkingsensors",
    "rimsize",
    "transmission",
    "type",
    "aircondition",
    "navigation",
    "registration",
  ];

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);
    setLoading(true);

    Papa.parse(uploadedFile, {
      header: true,
      complete: (result) => {
        let fileColumns = result.meta.fields;
        fileColumns = fileColumns.map((col) => col.toLowerCase());
        const allColumnsMatch = predefinedColumns.every((col) =>
          fileColumns.includes(col)
        );

        setColumnsMatch(allColumnsMatch);
        setLoading(false);
      },
      error: (error) => {
        console.error("Error parsing CSV:", error);
        setLoading(false);
      },
    });
  };

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

  const handleUpload = async () => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch("http://127.0.0.1:5000/upload_csv", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Failed to upload file");
        } else {
          return "successful";
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  useEffect(() => {
    file && console.log(file);
  }, [file]);

  const handleUpdateData = async () => {
    setUpdateLoading(true);
    try {
      await handleUpload();
      setUpdateMessage("Updating your data was successful!");
    } catch (err) {
      console.error("error updating data: ", err);
      setUpdateMessage("Error Updateing data!");
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleTrainModel = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/train_model", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ model: model }),
      });

      if (!response.ok) {
        throw new Error("Failed to train model");
      }
      const result = await response.json()
      console.log("metrics: ",result.metrics)

      return result;
    } catch (err) {
      console.error(err);
    }
  };

  const handleTraining = async () => {
    setModelLoading(true);
    try {
      await handleTrainModel();
      setModelTrainedMessage("New model trained successfully!");
    } catch (err) {
      console.error("Error in training model: ", err);
      setModelTrainedMessage("Failed to train new model! :(");
    } finally {
      setModelLoading(false);
    }
  };

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
                  Welcome to the data update process! This section will guide
                  you through updating your existing data to keep your models
                  and insights accurate. Follow the steps provided to ensure a
                  smooth update process.
                </p>
                <ol>
                  <li>Prepare your CSV file with the necessary columns.</li>
                  <li>Upload the file in the next step.</li>
                  <li>
                    Process the data, select a model, and train it using the
                    updated data.
                  </li>
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
                  Please upload your CSV file. This file should contain all the
                  required columns (e.g., Column1, Column2, Column3) necessary
                  for updating your data.
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
                      style={{
                        padding: "0",
                        marginBottom: "20px",
                        width: "60%",
                      }}
                      icon={
                        !columnsMatch ? (
                          <ErrorOutlineIcon fontSize="inherit" />
                        ) : (
                          <CheckIcon fontSize="inherit" />
                        )
                      }
                      severity={columnsMatch ? "success" : "error"}
                    >
                      {!columnsMatch
                        ? `File: "${file.name}" is missing required columns or is not
                      in the correct format. Please check your data and try
                      again.`
                        : `File: "${file.name} was successfuly uploaded!`}
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
                  Now that your file is uploaded, click the button below to
                  update your data. This process will integrate the new data
                  into your existing dataset.
                </p>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Button
                    className="update-data-button"
                    variant="outlined"
                    onClick={handleUpdateData}
                    disabled={!columnsMatch}
                  >
                    Update Data
                  </Button>
                  {updateLoading && (
                    <CircularProgress
                      style={{ padding: "0", marginBottom: "20px" }}
                    />
                  )}
                  {!updateLoading && updateMessage && (
                    <Alert
                      style={{
                        padding: "0",
                        marginBottom: "20px",
                        width: "60%",
                      }}
                      icon={
                        updateMessage !==
                        "Updating your data was successful!" ? (
                          <ErrorOutlineIcon fontSize="inherit" />
                        ) : (
                          <CheckIcon fontSize="inherit" />
                        )
                      }
                      severity={
                        updateMessage === "Updating your data was successful!"
                          ? "success"
                          : "error"
                      }
                    >
                      {updateMessage !== "Updating your data was successful!"
                        ? "There was an error updating your data! :("
                        : "Your data was updated succesfully!"}
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

            {activeLink === 3 && (
              <div className="train-model">
                <p>
                  Select a model from the dropdown below to train with your
                  updated data. Once you select a model, click "Train Model" to
                  start the training process.
                </p>
                <FormControl className="model-selector" fullWidth>
                  <InputLabel id="demo-simple-select-label">Model</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={model}
                    label="Model"
                    onChange={handleChange}
                  >
                    <MenuItem value="xgboost">XGBoost</MenuItem>
                    <MenuItem value="random_forest">Random Forest</MenuItem>
                  </Select>
                </FormControl>
                <div className="train-model-buttons">
                  <div className="checkbox-container">
                    <Checkbox disabled checked={file} />
                    <span>Uploaded data</span>
                  </div>
                  <div className="checkbox-container">
                    <Checkbox disabled checked={model} />
                    <span>Selected model</span>
                  </div>
                  {modelLoading && (
                    <CircularProgress
                      style={{ padding: "0", marginBottom: "20px" }}
                    />
                  )}
                  {!modelLoading && modelTrainedMessage && (
                    <Alert
                      style={{
                        padding: "0",
                        marginBottom: "20px",
                        width: "60%",
                      }}
                      icon={
                        modelTrainedMessage !==
                        "New model trained successfully!" ? (
                          <ErrorOutlineIcon fontSize="inherit" />
                        ) : (
                          <CheckIcon fontSize="inherit" />
                        )
                      }
                      severity={
                        modelTrainedMessage ===
                        "New model trained successfully!"
                          ? "success"
                          : "error"
                      }
                    >
                      {modelTrainedMessage === "New model trained successfully!"
                        ? "New model trained successfully!"
                        : "Failed to train new model! :("}
                    </Alert>
                  )}
                  <Button
                    onClick={handleTraining}
                    disabled={!model || !file}
                    variant="contained"
                  >
                    Train Model
                  </Button>
                  <Button variant="outlined">Back to home</Button>
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
