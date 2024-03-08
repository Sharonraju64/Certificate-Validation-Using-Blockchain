import { useState, useRef, useEffect, useContext} from "react";
import { Typography, Box, Card } from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import { AuthContext } from "../../CustomHooks/Context/AuthProvider";
import Search from "../Search/Search";

function AddCandidate(){
    const [image, setImage] = useState(null);
    //const [logo, setLogo] = useState(null);
    const hiddenFileInput = useRef(null);
    const navigate = useNavigate();
    const { userId, userRole } = useContext(AuthContext);
    const [schoolId, setSchoolId] = useState("");
    const [studentId, setStudentId] = useState("");
    const [schoolSearchInputData, setSchoolSearchInputData] = useState(null);
    const [schoolSearchData, setSchoolSearchData] = useState(null);
    const [Name, SetName] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        reg_no: "",
        fathers_name: "",
        ref_no: "",
        date_of_issue: "",
        grade: "",
        image: "",
        company_name: "VASIREDDY VENKATADRI INSTITUTE OF TECHNOLOGY",
        logo: "https://upload.wikimedia.org/wikipedia/commons/e/ec/VVIT_Logo.png",
        address: "NUMBUR - 522508, ANDHRA PRADESH, INDIA",
        course: "",
    });

    useEffect(()=>{
        handleSchoolData();
        if (userRole === "school") {
            setSchoolId(userId);
        }
        else{
            setSchoolId(schoolSearchInputData)
        }
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((formData) => ({
            ...formData,
            [name]: value,
            name: Name
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        localStorage.setItem('data', JSON.stringify(formData));
        navigate("/print");
        console.log(formData);
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
                                            type="text"
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
                                    {/*<div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="whatsapp_no">
                                            Company Name
                                        </label>
                                        <input
                                            type="text"
                                            name="company_name"
                                            value={formData.company_name}
                                            onChange={handleChange}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        />
                                    </div>
                                    <div className="mb-4">
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

        </>
    );
};

export default AddCandidate;
