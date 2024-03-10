import React from "react";
import { useNavigate } from "react-router-dom";
import student from '../utils/354637.png';
import institute from '../utils/3212.png';
import office from '../utils/12324.png';
import Footer from "../components/Footer/Footer";

function Home(){

    const navigate = useNavigate();
    const handlestudent = ()=>{
        navigate('/user/signup')
    }
    const handleinstitute = ()=>{
        navigate('/school/signup')
    }
    const handleverifier = ()=>{
        navigate('/admin/signup')
    }

    return(
        <div className="size-full w-full h-full text-lg text-center border bg-gradient-to-r from-cyan-500 to-blue-500">
            <h3 className="text-5xl text-center p-10 text-white ">Welcome to E-Certify</h3>
            <h3 className="text-3xl p-5">Choose Your Role</h3>
            <div className="flex items-stretch">
                <div className="size-max border-4 border-blue-400 m-5 ml-40 bg-blue-100">
                    <div className="m-10 w-58">
                        <img className="w-44 p-5"
                            src={student}
                            alt="Student"
                        >
                        </img>
                        <button className="p-5 py-4 px-6"
                            onClick={handlestudent}
                        >
                            Student
                        </button>
                    </div>
                </div>
                <div className="size-max border-4 border-blue-400 m-5 ml-40 bg-blue-100">
                    <div className="m-10 h-60">
                        <img className="w-48 h-40 pt-5"
                            src={institute}
                            alt="institute"
                        >
                        </img><div className="p-2">
                        <button className="pt-5 py-4 px-6"
                            onClick={handleinstitute}
                        >
                            Institute
                        </button></div>
                    </div>
                </div>
                <div className="size-max border-4 border-blue-400 m-5 ml-40 bg-blue-100">
                    <div className="m-10 w-58">
                        <img className="w-44 p-5"
                            src={office}
                            alt="Verifier"
                        >
                        </img>
                        <button className="p-5 py-4 px-6"
                            onClick={handleverifier}
                        >
                            Verifier
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
        
    );
}

export default Home;