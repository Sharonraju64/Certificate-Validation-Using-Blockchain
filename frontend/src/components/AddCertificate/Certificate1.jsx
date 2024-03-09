import React, { useState, useEffect } from 'react';
import './certificate.css';
//import { useParams } from 'react-router-dom';
import QRCode from 'qrcode.react';
//import { useNavigate } from "react-router-dom";

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
    course
}) => {
    //const { id } = useParams();
    const [showform, setShowform] = useState(false);
    const [qdata, setQdata] = useState("");
    /*const [formData, setFormData] = useState({
        student_name: '',
        reg_no: '',
        fathers_name: '',
        ref_no: '',
        date_of_issue: '',
        grade: '',
        image: '',
        institute_name: '',
        logo: '',
        address: '',
        course: '',
    });*/


    /*useEffect(() => {
        fetchData();
    }, []);*/

    useEffect(() => {
        setQRData();
        setShowform(true);
    });

    const setQRData = () => {
        var name = student_name;
        var reg_no = reg_no;
        var fathers_name = fathers_name;
        var ref_no = ref_no;
        var date_of_issue = date_of_issue;
        var grade = grade;
        var institute_name = institute_name;

        var url =
            "Name: " +
            name +
            "\n" +
            "Reg No: " +
            reg_no +
            "\n" +
            "Ref No: " +
            ref_no +
            "\n" +
            "Father Name: " +
            fathers_name +
            "\n" +
            "Date of Issue: " +
            date_of_issue +
            "\n" +
            "Grade: " +
            grade +
            "\n" +
            "Company: " +
            institute_name
        setQdata(url);

    }

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
                        </div>
                    </div>
                </div>
            )}
        </>

    );
}

export default Certificate1;
