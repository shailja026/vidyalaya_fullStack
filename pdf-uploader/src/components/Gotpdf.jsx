import React, { useState } from "react";

import { Document, Page } from "react-pdf";

import "./fileuploader.css";
function Gotpdf({ data }) {

  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };



  return (
    <div className="pdfContaine">
     

      <div className="document1">
      <p>
        Page {pageNumber} of {numPages}
      </p>
        <Document
          file={data}
          onLoadSuccess={onDocumentLoadSuccess}

        >
          {Array.apply(null, Array(numPages))
          .map((x, i) => i + 1)
          .map((page) => {
            return (
              <Page
                pageNumber={page}
                renderTextLayer={false}
                renderAnnotationLayer={false}
              />
            );
          })}
        </Document>

        
      </div>
    </div>
  );
}

export default Gotpdf;
