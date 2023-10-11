import React, { useState, useEffect } from "react";
import "./fileuploader.css";
import { pdfjs } from "react-pdf";

import Gotpdf from "./Gotpdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

function FileUploader() {
  const [selectedfile, setSelectedFile] = useState(null);
  const [errMessage, setErrMessage] = useState("");
  const [name, setName] = useState("");
  const [data, setData] = useState([]);
  const [pdf, setPdf] = useState("");

  //  file selction in pdf formets=============================================================;

  const handleFileSelected = (e) => {
    const file = e.target.files[0];
    

    if (file && file.type === "application/pdf") {
      const fileName = file.name.toLowerCase();
      if (fileName.endsWith(".pdf") || fileName.endsWith("application/pdf")) {
        setSelectedFile(file);
        setErrMessage("");
      } else {
        setSelectedFile("");
        setErrMessage("Please select a PDF file");
      }
    }
  };

  // form submission----------------------------------------------------------------------------------------------------------------
  const handleSubmit = (e) => {
    e.preventDefault();
    if(selectedfile === null || name ===""){
      alert("Please select a file")
    }
    const formData = new FormData();
    formData.append("name", name);
    formData.append("file", selectedfile);
    console.log(formData);
    fetch("http://localhost:7000/uploadPdf", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        // alert("Uploaded file successfully");
        setName("");
        setSelectedFile(null);
        
      })
      .catch((err) => console.log(err));
    setName("");
    setSelectedFile(null);
   
  };

  //  getting data from the server ----------------------------------------------------------------

  const fetchData = () => {
    fetch("http://localhost:7000/getPdf", {
      // mode: "no-cors",
      method: "GET"
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((err) => console.log(err));
  };

  // render the ui whenever data is updating=============================================
  useEffect(()=>{
    fetchData()
  },[])

  const showPdf = (pdf, id) => {
   
   const data1 =  data.find((d , i) => d.id === id);
    window.open(`${pdf}`, "_blank", "noreferrer");
    setPdf(data1.pdf);
    console.log(data1);
  };

  return (
    <div className="mainUi">
      <h5 className="heading">Upload your file</h5>
      <form onSubmit={handleSubmit} className="form">
        <label htmlFor="PdfName">
          PdfName
          <input
            type="text"
            name="PdfName"
            id="PdfName"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label htmlFor="fileUplode" className="fileLabel">
          Upload File
          <input
            type="file"
            id="fileUplode"
            accept=".pdf"
            onChange={handleFileSelected}
            name="pdfUploaded"
            encType="multipart/form-data"
            className="file"
          />
        </label>
        <p style={{ color: "red" }}>{errMessage}</p>
        <button type="submit" className="upload">
          Upload
        </button>
      </form>

      {/* to display the selected pdf as pages */}

      {data && (
        <>
          <div>
            <h5>Review Pdfs</h5>
            <div className="outerbox">
              {data.map((el, index) => {
                return (
                  <div className="pdfContainer" key={index}>
                    <h5>Name : {el.name}</h5>
                    <button
                      onClick={() => showPdf(el.pdf , el.id)}
                      className="viewPdf"
                      
                    >
                      Show pdf
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
          <Gotpdf data={pdf} />
        </>
      )}
    </div>
  );
}

export default FileUploader;
