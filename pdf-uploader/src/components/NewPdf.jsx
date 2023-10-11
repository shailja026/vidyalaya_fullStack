import React,{useState , useEffect} from 'react'
import pdfjs from 'pdfjs-dist';
import jsPDF from 'jspdf';

function NewPdf({pdf}) {
    const [selectedPages, setSelectedPages] = useState([]);
    const [downloadLink, setDownloadLink] = useState('');
 
  
    const handlePageSelect = (e, pageNum) => {
      if (e.target.checked) {
        setSelectedPages([...selectedPages, pageNum]);
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
  
      const addPageToNewPdf = async (pageNum) => {
        try {
          const page = await pdf.getPage(pageNum);
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
          if (pageNum < pdf.numPages) {
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
      <div className="App">
        <h1>PDF Page Extractor</h1>
        {/* <input type="file" accept=".pdf" onChange={handleFileChange} /> */}
        {pdf && (
          <div>
            <h2>Select Pages to Extract</h2>
            {Array.from({ length: pdf.numPages }, (_, i) => i + 1).map((pageNum) => (
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
            <button onClick={handleExtractPages}>Extract Selected Pages</button>
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

export default NewPdf