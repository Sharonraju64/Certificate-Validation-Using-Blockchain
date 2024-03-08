import React, { useState, useEffect } from 'react';
import './certificate.css';
//import { useParams } from 'react-router-dom';
import QRCode from 'qrcode.react';
//import { useNavigate } from "react-router-dom";

function Certificate1() {
    //const { id } = useParams();
    const [showform, setShowform] = useState(false);
    //const baseURL = process.env.REACT_APP_API_URL;
    //const navigate = useNavigate();
    const [qdata, setQdata] = useState("");
    //const postimgURL = process.env.REACT_APP_POST_URL;
    const [formData, setFormData] = useState({
        name: '',
        reg_no: '',
        fathers_name: '',
        to: '',
        ref_no: '',
        from: '',
        centre_head: '',
        contact_no: '',
        date_of_issue: '',
        grade: '',
        image: '',
        company_name: '',
        logo: '',
        services: '',
        address: '',
        phone: '',
        email: '',
        website: '',
        pan: '',
        uan: '',
        gst: '',
        topics: '',
    });


    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        setQRData();
    }, [formData]);

    function setQRData() {
        var name = formData.name;
        var reg_no = formData.reg_no;
        var fathers_name = formData.fathers_name;
        var to = formData.to;
        var ref_no = formData.ref_no;
        var from = formData.from;
        var centre_head = formData.centre_head;
        var date_of_issue = formData.date_of_issue;
        var grade = formData.grade;
        var company_name = formData.company_name;
        // var logo = formData.logo;
        // var services = formData.services;
        // var address = formData.address;
        // var phone = formData.phone;
        var email = formData.email;
        var website = formData.website;

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
            "From: " +
            from +
            "\n" +
            "To: " +
            to +
            "\n" +
            "Date of Issue: " +
            date_of_issue +
            "\n" +
            "Grade: " +
            grade +
            "\n" +
            "Company: " +
            company_name +
            "\n" +
            "Email: " +
            email +
            "\n" +
            "Website: " +
            website +
            "\n" +
            "Chairman: " +
            centre_head;


        setQdata(url);

    }

    const fetchData = async () => {
        try {
            const response = localStorage.getItem('data');
            console.log(response);

            setFormData(JSON.parse(response));
            setShowform(true);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const pseudoElementStyles = {
        content: '""',
        top: 150,
        left: 0,
        bottom: 0,
        right: 0,
        position: 'absolute',
        backgroundRepeat:'no-repeat',
        backgroundImage: `url(${formData.logo})`,
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
                                        {formData.company_name}
                                    </div>
                                    {/*<p className="certificate-title text-blue-700 font-bold">
                                        <strong>{formData.services}</strong>
                                    </p>*/}
                                    <p className="certificate-title font-bold">
                                        {formData.address}
                                        {/*<br />
                                        Ph. : {formData.phone}
                                        <br />
            E-mail: {formData.email}, Website: {formData.website}*/ }
                                    </p>
                                    <div className="flex justify-center">
                                        <img src={formData.logo} className="logo" alt="" height="90" width="90" />
                                    </div>
                                    <div className="water-mark-overlay"></div>
                                </div>
                                <div className="flex items-center">
                                    <div className='flex-1 w-32 text-lg text-left'>
                                        Ref. No.: {formData.ref_no ? <strong>  {formData.ref_no}  </strong> : ""}
                                    </div>
                                    <div className="flex-1 w-32 pl-40">
                                        <img className='image'
                                            src={formData.image}
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
                                    Mr / Ms. {formData.name ? <strong className="ml-7">  {formData.name}  </strong> : ""}
                                </p>
                                <p className="text-lg text-center text-blue-600 italic mb-2">
                                    S/o / D/o. {formData.fathers_name ? <strong className="ml-7">  {formData.fathers_name}  </strong> : "_"}
                                </p>
                                <p className="text-lg text-center text-blue-600 italic mb-2">
                                    {/*<span>
                                        Registration No. {formData.reg_no ? <strong className="ml-7">  {formData.reg_no}  </strong> : ""}
                                            </span>*/}
                                    <span>
                                        having fulfilled the academic requirements and passed the
                                    </span>
                                </p>
                                <p className="text-lg text-center text-blue-600 italic mb-2">
                                    <span>
                                    examination held during 2023 in {formData.grade ? <strong className="ml-7">  {formData.grade}  </strong> : ""}
                                    </span>
                                    {/*<span>
                                        Held From {formData.from ? <strong className="ml-7">  {formData.from}  </strong> : ""}
                                        </span>*/}
                                </p>
                                <p className="text-lg text-center text-blue-600 italic">
                                    has this day been admitted by the executive council to the degree of {/*{formData.to ? <strong className="ml-7">  {formData.to}  </strong> : "_"}*/}
                                </p>
                                <p className="degree text-lg text-center mt-3 italic text-900 font-bold">
                                    Bachelor of Technology
                                </p>
                                <p className="text-justify ml-2 mt-2 text-sm">
                                    {/*formData.topics*/}
                                </p><br />
                                {/*<p className="text-justify ml-2 mt-2 text-sm">
                                    <span>For, </span>
                                    <span className="font-bold text-lg">{formData.company_name}</span>
                                </p>*/}
                                <p className="text-lg text-left text-blue-600 italic">
                                <span>
                                    HTNo: {formData.reg_no ? <strong>  {formData.reg_no}  </strong> : ""}
                                </span><br />
                                <span>
                                    Date: {formData.date_of_issue ? <strong>  {formData.date_of_issue}  </strong> : ""}
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
                            {/*<div className="mt-3 flex justify-center p-1">
                                <div className="bg-red-300 text-center p-2 rounded-lg mx-2">
                                    <div className="font-bold text-lg">GRADE A+</div>
                                    <div className="font-semibold text-lg">85% & ABOVE</div>
                                </div>
                                <div className="bg-blue-300 text-center p-2 rounded-lg mx-2">
                                    <div className="font-bold text-lg">GRADE A</div>
                                    <div className="font-semibold text-lg">75% & ABOVE</div>
                                </div>
                                <div className="bg-yellow-300 text-center p-2 rounded-lg mx-2">
                                    <div className="font-bold text-lg">GRADE B</div>
                                    <div className="font-semibold text-lg">60% & ABOVE</div>
                                </div>
                                <div className="bg-green-300 text-center p-2 rounded-lg mx-2">
                                    <div className="font-bold text-lg">GRADE C</div>
                                    <div className="font-semibold text-lg">45% to 59%</div>
                                </div>
                            </div>*/}
                        </div>
                    </div>
                </div>
            )}
        </>

    );
}

export default Certificate1;
