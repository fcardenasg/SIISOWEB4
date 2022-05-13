/* import { useState } from 'react'

// Import Worker
import { Worker } from '@react-pdf-viewer/core';
// Import the main Viewer component
import { Viewer } from '@react-pdf-viewer/core';
// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css'; */
// default layout plugin
/* import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'; */
// Import styles of default layout plugin
/* import '@react-pdf-viewer/default-layout/lib/styles/index.css'; */

const ViewPdf = (props) => {
    /* const defaultLayoutPluginInstance = defaultLayoutPlugin(); */

    return (
        <div>
            {/* <form>
                <label><h5>{props.title}</h5></label>

                <input type='file' className="form-control"
                    onChange={props.handleFile}></input>
                {props.pdfError && <span className='text-danger'>{props.pdfError}</span>}

            </form>

            <h5>View PDF</h5>
            <div className="viewer">
                {props.pdfFile && (
                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.12.313/build/pdf.worker.min.js">
                        <Viewer fileUrl={props.pdfFile}
                            plugins={[defaultLayoutPluginInstance]}></Viewer>
                    </Worker>
                )}
                {!props.pdfFile && <>No file is selected yet</>}
            </div> */}
        </div>
    );
}

export default ViewPdf;