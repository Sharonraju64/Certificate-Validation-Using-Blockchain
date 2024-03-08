import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import PatnaToolsCertificate from "./Certificate1";
import { useNavigate } from "react-router-dom";


function PrintForm({ onClick, visitorData }) {
    const componentRef = useRef();
    const navigate = useNavigate();

    const printRecord = () => {
        console.log("Print record..");
        handlePrint();
    };

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const goBack = () => {
        navigate('/');
    };

    return (
        <>
            <div className="printcontainer">
                <div className="flex">
                    <div className="mt-4 ml-3" style={{ maxWidth: "70px" }}>
                        <div onClick={() => { goBack() }} className="bg-transparent cursor-pointer hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded">
                            Back
                        </div>
                    </div>
                    <div className="mt-4 ml-3" style={{ maxWidth: "70px" }}>
                        <div onClick={printRecord} className="bg-transparent cursor-pointer hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded">
                            Print
                        </div>
                    </div>
                </div>


                <div ref={componentRef} style={{ marginLeft: "20px", marginRight: "20px", marginTop: "0px" }}>
                    <div>
                        <PatnaToolsCertificate />
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
