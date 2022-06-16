import Cargando from 'components/loading/Cargando';
/* import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';

const ViewPdf = (pdfFile) => {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    return (
        <div style={{ margin: '20px' }}>
            <Document
                file={pdfFile}
                loading={<Cargando />}
                onLoadSuccess={onDocumentLoadSuccess}
                noData={
                    <div style={{ float: 'left', marginLeft: '50%', marginTop: '10%' }}>
                        Algo
                    </div>}
                error="Error"
            >
                {
                    new Array(numPages + 1).fill('').map((item, index) => {
                        return <div><Page noData={null} width={1436} key={index} pageNumber={index} /><br /></div>;
                    })}
            </Document>
        </div>
    );
}

export default ViewPdf; */

import React from 'react';
import PDFViewer from 'mgr-pdf-viewer-react';

const ViewPdf = (pdfFile) => {
    return (
        <>
            {pdfFile != null ?
                <PDFViewer document={{
                    connection: pdfFile
                }} /> : <></>}
        </>
    );
}

export default ViewPdf;