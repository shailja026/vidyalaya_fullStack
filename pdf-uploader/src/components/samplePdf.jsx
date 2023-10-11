import React, { useState } from "react";
import jsPDF from 'jspdf';
import { Document, Page } from "react-pdf";

import "./fileuploader.css";
import pdfFile from "../main.pdf";


function SamplePdf({ data }) {
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [open, setOpen] = useState(false);
  const [selectedPages, setSelectedPages] = useState([]);
  const [downloadLink, setDownloadLink] = useState('');

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };
  const handlePageSelect = (e, pageNum) => {
    if (e.target.checked) {
      
      setSelectedPages([...selectedPages, pageNum]);
      console.log(selectedPages)
    } else {
      setSelectedPages(selectedPages.filter((page) => page !== pageNum));
    }
  };

const handleExtractPages = () => {
    if (selectedPages.length === 0) {
      alert('Please select at least one page to extract.');
      return;
    }
    const newPdf = new jsPDF();

    // adding pages to pdf file================================================================
    const addPageToNewPdf = async (pageNum) => {
      try {
        const page = await pdfFile.getPage(pageNum);
        const viewport = page.getViewport({ scale: 1 });
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        const renderContext = {
          canvasContext: ctx,
          viewport: viewport,
        };
        await page.render(renderContext).promise;
        newPdf.addPage([viewport.width, viewport.height]);
        newPdf.addImage(canvas.toDataURL('image/jpeg'), 'JPEG', 0, 0, viewport.width, viewport.height);
        if (pageNum < pdfFile.numPages) {
          await addPageToNewPdf(pageNum + 1);
        } else {
          const pdfBlob = newPdf.output('blob');
          const pdfUrl = URL.createObjectURL(pdfBlob);
          setDownloadLink(pdfUrl);
        }
      } catch (error) {
        console.error('Error adding page to new PDF:', error);
      }
    };

    addPageToNewPdf(1);
  };


  return (
    <div className="pdfContaine">
      {!open ? (
        <div style={{textAlign:"center" }}>
          <h4>Load Pdf Here</h4>
          <button onClick={()=>setOpen(!open)} className="btn">view pdf</button>
        </div>
      ) : (
        <div className="document">
          
          <button onClick={()=>setOpen(!open)} className="btn">Close pdf</button>
          <h3>OR</h3>
          <h2>Select Pages to Extract</h2>
          <center>
            <p style={{ color: "white" }}>
              Page {pageNumber} of {numPages}
            </p>
            <Document
              file={pdfFile}
              onLoadSuccess={onDocumentLoadSuccess}
              className="pdfLink  sampleDoc"
            >
              {Array.apply(null, Array(numPages))
                .map((x, i) => i + 1)
                .map((page) => {
                  return (
                    <div key={page}>
                      <Page pageNumber={page} className="page" />
                      <label>
                        <input
                          type="checkbox"
                          value={page}
                          checked={selectedPages.includes(page)}
                          onChange={(e) => handlePageSelect(e, page)}
                        />
                        Page {page}
                      </label>
                    </div>
                  );
                })}
            </Document>
           
          </center>
        </div>
      )}
    
       
        {pdfFile && open && (
          <div style={{textAlign:"center"}}>
            
            {Array.from({ length: pdfFile.numPages }, (_, i) => i + 1).map((pageNum) => (
              <label key={pageNum}>
                <input
                  type="checkbox"
                  value={pageNum}
                  checked={selectedPages.includes(pageNum)}
                  onChange={(e) => handlePageSelect(e, pageNum)}
                />
                Page {pageNum}
              </label>
            ))}
            <button onClick={handleExtractPages} className="btn">Extract Selected Pages</button>
          </div>
        )}
        {downloadLink && (
          <div>
            <h2>Download Extracted PDF</h2>
            <a href={downloadLink} download="extracted.pdf">
              Download PDF
            </a>
          </div>
        )}
      </div>

 
  );
}

export default SamplePdf;
