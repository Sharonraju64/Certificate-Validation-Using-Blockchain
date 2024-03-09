import React, { useState, useEffect } from 'react';
import './certificate.css';
import PendingIcon from "@mui/icons-material/Pending";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import api from "../../api/api";
import QRCode from 'qrcode.react';
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";
import { useNavigate } from "react-router-dom";

const Certificate1 = ({
    student_name,
    reg_no,
    ref_no,
    fathers_name,
    date_of_issue,
    grade,
    image,
    institute_name,
    logo,
    address,
    course,
    userRole,
    id,
    certificate_status,
    setCertificateUpdate,
    certificate_hash,
    handleRequestVerification
}) => {
    const [showform, setShowform] = useState(false);
    const [qdata, setQdata] = useState("");
    useEffect(() => {
        setShowform(true);
        setQRData();
        console.log(setCertificateUpdate);
    });
    const navigate = useNavigate();

    const setQRData = () => {
        var name = student_name;
        var reg = reg_no;
        var father_name = fathers_name;
        var refno = ref_no;
        var dateofissue = date_of_issue;
        var Grade = grade;
        var institutename = institute_name;

        var url =
            "Name: " +
            name +
            "\n" +
            "Reg No: " +
            reg +
            "\n" +
            "Ref No: " +
            refno +
            "\n" +
            "Father Name: " +
            father_name +
            "\n" +
            "Date of Issue: " +
            dateofissue +
            "\n" +
            "Grade: " +
            Grade +
            "\n" +
            "Company: " +
            institutename
        setQdata(url);
    }

    const handleCertificateAddBlockchain = async (certificateId) => {
        if (typeof window.ethereum === "undefined") {
          console.error("Please install MetaMask.");
          return;
        }
    
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const account = accounts[0];
    
        const data = {
          account: account,
        };
    
        api
          .post(`/add-certificate/${certificateId}`, data)
          .then((response) => {
            setCertificateUpdate(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
        console.log(certificateId);
        console.log(data);
    };
    
    const handleCertificateVerifyCertificate = async (certificate_hash, id) => {
        if (typeof window.ethereum === "undefined") {
          console.error("Please install MetaMask.");
          return;
        }
    
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const account = accounts[0];
    
        const data = {
          account: account,
          certificate_id: id,
        };
        api
          .put(`/verify-certificate/${certificate_hash}`, data)
          .then((response) => {
            setCertificateUpdate(response.data);
            console.log(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
    };
    
    
    const handleDownloadPDF = (id) => {
        console.log(id);
        navigate('/print',{state:{certificateid:id}})
        /*const input = document.querySelector(".certificate");
    
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
    
            const pdf = new jsPDF({
                orientation: "landscape",
                unit: "mm",
                format: "a4",
                compress: true,
            });
    
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth() - 6; // subtract 3mm on each side
            const pdfHeight = pdf.internal.pageSize.getHeight() - 6; // subtract 3mm on each side
            const imgWidth = imgProps.width;
            const imgHeight = imgProps.height;
        
            const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
        
            const centerX = (pdfWidth - imgWidth * ratio) / 2 + 3; // add 3mm left margin
            const centerY = (pdfHeight - imgHeight * ratio) / 2 + 3; // add 3mm top margin
        
            pdf.addImage(
                imgData,
                "PNG",
                centerX,
                centerY,
                imgWidth * ratio,
                imgHeight * ratio,
                null,
                "FAST"
            );
        
            pdf.save("certificate.pdf");
        });*/
    };

    /*const fetchData = async () => {
        try {
            const response = localStorage.getItem('data');
            console.log(response);

            setFormData(JSON.parse(response));
            setShowform(true);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };*/

    const pseudoElementStyles = {
        content: '""',
        top: 150,
        left: 0,
        bottom: 0,
        right: 0,
        position: 'absolute',
        backgroundRepeat:'no-repeat',
        backgroundImage: `url(${logo})`,
        backgroundSize: '100%',
        zIndex: -1,
        opacity: 0.10,
    };


    return (
        <>
            {showform && (
                <div className="flex justify-center">
                    <div className="certificate-container">
                        <div className="certificate">
                            <div style={pseudoElementStyles}></div>
                            <div className="certificate-body">
                                <div>
                                    <div className="headtxt">
                                        {institute_name}
                                    </div>
                                    <p className="certificate-title font-bold">
                                        {address}
                                    </p>
                                    <div className="flex justify-center">
                                        <img src={logo} className="logo" alt="" height="130" width="130" />
                                    </div>
                                    <div className="water-mark-overlay"></div>
                                </div>
                                <div className="flex items-center">
                                    <div className='flex-1 w-32 text-lg text-left'>
                                        Ref. No.: {ref_no ? <strong>  {ref_no}  </strong> : ""}
                                    </div>
                                    <div className="flex-1 w-32 pl-40">
                                        <img className='image'
                                            src={image}
                                            alt='Student'
                                            style={{
                                                borderRadius:
                                                    "15px",
                                            }}
                                            loading="lazy"
                                        />
                                    </div>
                                </div>
                                <h4 className="mt-1 mb-2">Certificate of Achievement Awarded to</h4>
                                <p className="text-lg text-center text-blue-600 italic mb-2">
                                    Mr / Ms. {student_name ? <strong className="ml-7">  {student_name}  </strong> : ""}
                                </p>
                                <p className="text-lg text-center text-blue-600 italic mb-2">
                                    S/o / D/o. {fathers_name ? <strong className="ml-7">  {fathers_name}  </strong> : "_"}
                                </p>
                                <p className="text-lg text-center text-blue-600 italic mb-2">
                                    <span>
                                        having fulfilled the academic requirements and passed the
                                    </span>
                                </p>
                                <p className="text-lg text-center text-blue-600 italic mb-2">
                                    <span>
                                    examination held during 2023 in {grade ? <strong className="ml-7">  {grade}  </strong> : ""}
                                    </span>
                                </p>
                                <p className="text-lg text-center text-blue-600 italic">
                                    has this day been admitted by the executive council to the degree of 
                                </p>
                                <p className="degree text-lg text-center mt-3 italic text-900 font-bold">
                                    Bachelor of Technology
                                </p>
                                <p className="text-lg text-center ml-2 mt-2 text-sm">
                                    {course}
                                </p><br />
                                <p className="text-lg text-left text-blue-600 italic">
                                <span>
                                    HTNo: {reg_no ? <strong>  {reg_no}  </strong> : ""}
                                </span><br />
                                <span>
                                    Date: {date_of_issue ? <strong>  {date_of_issue}  </strong> : ""}
                                </span>
                            </p>
                            </div>
                            <div className="three-columns-grid">
                                <div>
                                    <p>
                                        Authorized Signatory
                                    </p>
                                </div>
                                <div>
                                    <p>
                                        Seal
                                    </p>
                                </div>
                                <div>
                                    <div >
                                        <QRCode value={qdata} className="qrcode" />
                                    </div>
                                </div>

                                <div>
                                    <p>
                                        Course Co-ordinator
                                    </p>
                                </div>
                            </div>
                            <div className="footer">
                                {/* {certificate_hash && <p>certificate hash {certificate_hash}. </p>} */}
                                {certificate_status === "unverified" && userRole !== "school" && (
                                    <button
                                    onClick={() => {
                                        handleRequestVerification(id);
                                    }}
                                    >
                                    verification request
                                    </button>
                                )}
                                {userRole === "school" && !certificate_hash && (
                                    <button
                                    onClick={() => {
                                        handleCertificateAddBlockchain(id);
                                    }}
                                    >
                                    Add certificate to blockchain
                                    </button>
                                )}
                                {userRole === "school" && certificate_hash && (
                                    <button
                                    onClick={() => {
                                        handleCertificateVerifyCertificate(certificate_hash, id);
                                    }}
                                    >
                                    verify certificate
                                    </button>
                                )}
                                {certificate_status === "pending" && userRole !== "school" && (
                                    <PendingIcon />
                                )}
                                {certificate_status === "verified" && <VerifiedUserIcon />}
                            </div>
                        </div>
                        {certificate_status === "verified" && (
                            <button onClick={()=>{
                                handleDownloadPDF(id)
                            }}>Download PDF</button>
                        )}
                    </div>
                </div>
            )}
        </>

    );
}

export default Certificate1;
