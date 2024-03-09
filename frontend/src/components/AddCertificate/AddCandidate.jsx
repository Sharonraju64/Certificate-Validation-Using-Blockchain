import { useState, useRef, useEffect, useContext} from "react";
import { Typography, Box, Card } from "@mui/material";
//import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import { AuthContext } from "../../CustomHooks/Context/AuthProvider";
import Search from "../Search/Search";
import Certificate1 from "./Certificate1";
import MessagePopUp from "../MessagePopUp/MessagePopUp";

function AddCandidate(){
    const [image, setImage] = useState(null);
    //const [logo, setLogo] = useState(null);
    const hiddenFileInput = useRef(null);
    // const navigate = useNavigate();
    const { userId, userRole } = useContext(AuthContext);
    const [schoolId, setSchoolId] = useState("");
    const [studentId, setStudentId] = useState("");
    const [schoolSearchInputData, setSchoolSearchInputData] = useState(null);
    const [schoolSearchData, setSchoolSearchData] = useState(null);
    const [Name, SetName] = useState(null);
    //const [institutename, setInstituteName] = useState(null);
    const [certificateUploadData, setCertificateUploadData] = useState(null);
    const [verificationRequested, setVerificationRequested] = useState(false);
    const [signUpMessage, setSignUpMessage] = useState("");
    const [formData, setFormData] = useState({
        student_name: "",
        reg_no: "",
        fathers_name: "",
        ref_no: "",
        date_of_issue: "",
        grade: "",
        image: "",
        year_of_pass:"",
        institute_name: "VASIREDDY VENKATADRI INSTITUTE OF TECHNOLOGY",
        logo: "https://upload.wikimedia.org/wikipedia/commons/e/ec/VVIT_Logo.png",
        address: "NUMBUR - 522508, ANDHRA PRADESH, INDIA",
        course: "",
        school_id:""
    });

    useEffect(()=>{
        handleSchoolData();
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        /*if (userRole === "school") {
            setSchoolId(userId);
        }
        else{
            setSchoolId(schoolSearchInputData)
        }*/
        setFormData((formData) => ({
            ...formData,
            [name]: value,
            student_name: Name,
            school_id: schoolId
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        //localStorage.setItem('data', JSON.stringify(formData));
        // navigate("/print");
        console.log(formData);
        if (
            !formData.student_name ||
            !formData.reg_no ||
            !formData.fathers_name ||
            !formData.ref_no ||
            !formData.date_of_issue ||
            !formData.year_of_pass ||
            !formData.image ||
            !formData.school_id||
            !formData.course
        ) {
        setSignUpMessage("Please fill out all fields.");
        return;
        }
        if (userRole === "school") {
        api
            .post(`/users/${studentId}/certificates`, formData)
            .then((response) => {
            setCertificateUploadData(response.data);
            console.log(response.data);
            })
            .catch((error) => {
            console.log(error);
            });
        } else {
        api
            .post(`/users/${userId}/certificates`, formData)
            .then((response) => {
            setCertificateUploadData(response.data);
            console.log(response.data);
            })
            .catch((error) => {
            console.log(error);
            });
        }
    };

    const handleRequestVerification = (certificateId) => {
        setVerificationRequested(true);
        if (userRole === "school") {
          const verify = {
            certificate_status: "verified",
          };
    
          api
            .post(`/add-certificate/${certificateId}`, verify)
            .then((response) => {
              setCertificateUploadData(response.data);
              // console.log(response);
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          const verify = {
            certificate_status: "pending",
          };
    
          api
            .post(`/certificate/${certificateId}/request/verify`, verify)
            .then((response) => {
              setCertificateUploadData(response.data);
              // console.log(response);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      };

    const handleSchoolData = () => {
        api
          .get("/schools")
          .then((results) => {
            setSchoolSearchData(results.data);
          })
          .catch((error) => {
            console.log(error);
          });
      };


    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setImage(file);
        setFormData((formData) => ({
            ...formData,
            image: URL.createObjectURL(file),
        }));
    };
    // const handleLogoChange =(event) =>{
    //     const file1 = event.target.files[1];
    //     /*const file = new File([blob], imgname, {
    //         type: "image/png",
    //         lastModified: Date.now(),
    //     });*/
    //     setLogo(file1);
    //     setFormData((formData) => ({
    //         ...formData,
    //         logo: URL.createObjectURL(file1),
    //     }));
    // }
    

    const handleClick = (event) => {
        hiddenFileInput.current.click();
    };

    return (
        <>
            {signUpMessage && (
                <MessagePopUp message={signUpMessage} setMessage={setSignUpMessage} />
            )}
            <div className="bgcolor">
                <Box sx={{ display: "flex" }}>
                    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                        <Card
                            sx={{
                                width: "98%",
                                overflow: "hidden",
                                padding: "12px",
                            }}
                        >
                            <h3 className="school-search text-lg text-center">search for school by name</h3>
                            <Search
                            data={schoolSearchData}
                            setSchoolSearchInputData={setSchoolSearchInputData}
                            setSchoolId={setSchoolId}
                            setName={SetName}
                            setStudentId={setStudentId}
                            />
                            <Box height={10} />
                            <Typography variant="h3" align="center">
                                Add Details to Create Certificate
                            </Typography>
                            <div className="w-full max-w-md mx-auto my-10">
                                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                                    {/* Form fields */}
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="visitor_name">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={Name}
                                            onChange={handleChange}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        />

                                    </div>

                                    {/* Add more fields */}
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="company_name">
                                            Reg No
                                        </label>
                                        <input
                                            type="text"
                                            name="reg_no"
                                            value={formData.reg_no}
                                            onChange={handleChange}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        />
                                    </div>

                                    {/* Add more fields */}
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="company_name">
                                            Father's Name
                                        </label>
                                        <input
                                            type="text"
                                            name="fathers_name"
                                            value={formData.fathers_name}
                                            onChange={handleChange}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        />
                                    </div>
                                    {/* Add more fields */}
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="department">
                                            Ref No
                                        </label>
                                        <input
                                            type="text"
                                            name="ref_no"
                                            value={formData.ref_no}
                                            onChange={handleChange}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="whatsapp_no">
                                            Date of Issue
                                        </label>
                                        <input
                                            type="date"
                                            name="date_of_issue"
                                            value={formData.date_of_issue}
                                            onChange={handleChange}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="whatsapp_no">
                                            Grade
                                        </label>
                                        <input
                                            type="text"
                                            name="grade"
                                            value={formData.grade}
                                            onChange={handleChange}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="whatsapp_no">
                                            Year of Pass
                                        </label>
                                        <input
                                            type="text"
                                            name="year_of_pass"
                                            value={formData.year_of_pass}
                                            onChange={handleChange}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        />
                                    </div>
                                    {/*<div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="whatsapp_no">
                                            Logo URL
                                        </label>
                                        <input
                                            type="text"
                                            name="logo"
                                            value={formData.logo}
                                            onChange={handleChange}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        />
                                    </div> 
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="whatsapp_no">
                                            Address
                                        </label>
                                        <input
                                            type="text"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleChange}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        />
                                    </div>*/}
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="whatsapp_no">
                                            Course
                                        </label>
                                        <textarea
                                            name="course"
                                            value={formData.course}
                                            onChange={handleChange}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        ></textarea>
                                    </div>
                                    <div className="image-upload-container mb-10" style={{ maxWidth: "30%" }}>
                                        <div className="box-decoration">
                                            <label htmlFor="image-upload-input" className="image-upload-label">
                                                {image ? image.name : "Photo"}
                                            </label>
                                            <div onClick={handleClick} style={{ cursor: "pointer" }}>
                                                {image ? (
                                                    <img src={URL.createObjectURL(image)} alt="upload image" className="img-display-after" />
                                                ) : (
                                                    <img src="./photo.png" alt="upload image" className="img-display-before" />
                                                )}
                                                <input
                                                    id="image-upload-input"
                                                    type="file"
                                                    name="image"
                                                    onChange={handleImageChange}
                                                    ref={hiddenFileInput}
                                                    style={{ display: "none" }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    {/*<div className="image-upload-container mb-10" style={{ maxWidth: "30%" }}>
                                        <div className="box-decoration">
                                            <label htmlFor="image-upload-input" className="image-upload-label">
                                                {image ? image.name : "Institute Logo"}
                                            </label>
                                            <div onClick={handleClick} style={{ cursor: "pointer" }}>
                                                {image ? (
                                                    <img src={URL.createObjectURL(logo)} alt="upload image" className="img-display-after" />
                                                ) : (
                                                    <img src="./photo.png" alt="upload image" className="img-display-before" />
                                                )}
                                                <input
                                                    id="image-upload-input"
                                                    type="file"
                                                    name="image"
                                                    onChange={handleLogoChange}
                                                    ref={hiddenFileInput}
                                                    style={{ display: "none" }}
                                                />
                                            </div>
                                        </div>
                                    </div>*/}
                                    {/* Add other fields similarly */}
                                    {/* Submit button */}
                                    <div className="flex items-center justify-center">
                                        <button
                                            type="submit"
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mx-2"
                                        >
                                            Add Certificate
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </Card>
                    </Box>
                </Box>
            </div>
            {!verificationRequested && certificateUploadData && (
            <div className="certificate-user-data">
              <Certificate1
                {...certificateUploadData}
                handleRequestVerification={handleRequestVerification}
              />
            </div>
          )}
        </>
    );
};

export default AddCandidate;
