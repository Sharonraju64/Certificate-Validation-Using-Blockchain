import { useRef } from "react";
import { useState, useEffect } from "react";
import api from "../../api/api";
import { useReactToPrint } from "react-to-print";
import Certificate1 from "./Certificate1";
import { useLocation } from "react-router-dom";


const PrintForm = ()=> {
    const [certificate, setCertificate] = useState([]);
    const componentRef = useRef();
    const location = useLocation();
    const id = location.state.certificateid;
    console.log(id);

    useEffect(()=>{
        api
        .get(`/certificate/${id}`)
        .then((response) => {
            setCertificate(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
    })

    const printRecord = () => {
        console.log("Print record..");
        handlePrint();
    };

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <>
            <div className="printcontainer">
                <div className="flex">
                    <div className="mt-4 ml-3" style={{ maxWidth: "70px" }}>
                        <div onClick={printRecord} className="bg-transparent cursor-pointer hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded">
                            Print
                        </div>
                    </div>
                </div>


                <div ref={componentRef} style={{ marginLeft: "20px", marginRight: "20px", marginTop: "0px" }}>
                    <div>
                        {/* <PatnaToolsCertificate /> */}
                        {
                            <Certificate1 {...certificate} />
                        }
                    </div>
                </div>
                <div className="flex justify-end">
                    <div
                        onClick={printRecord}
                    >
                    </div>
                </div>
            </div>
        </>
    );
}

export default PrintForm;
