import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Certificate1 from "../../components/AddCertificate/Certificate1";
import Footer from "../../components/Footer/Footer";
import api from "../../api/api";
import "./VerifyCertificate.css";

export default function VerifyCertificate() {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const [id, setId] = useState("");
  const [certificate, setCertificate] = useState(null);
  const [notVerified, setNotVerified] = useState(false);
  const [verified, setVerified] = useState(false);

  const handleLogOut = () => {
    localStorage.removeItem("appCertificate");
    navigate("/");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    api
      .get(`/get-certificate/${inputValue}`)
      .then((response) => {
        if (response?.data?.success === true) {
          setVerified(true);
          setId(response?.data?.certificate_data?.certificate_id);
          console.log(id);
          console.log(response?.data?.certificate_data?.certificate_id);
        } else {
          setNotVerified(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setNotVerified(true);
      })
      .finally(() => {
        setInputValue("");
      });
    api
      .get(`/certificate/${id}`)
      .then((response) => {
          setCertificate(response.data);
    })
    .catch((error) => {
          console.log(error);
    })
    setInputValue("");
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Enter certificate hash"
            />
            <button type="submit">Check</button>
          </div>
          <p>
            To verify your certificate, please enter your certificate hash in
            the input field below and click on the Check button.
          </p>
          {notVerified && (
            <p className="not-verified">Certificate not verified</p>
          )}
          {verified && (
            <p className="verified">Certificate is verified</p>
          )}
          <button
            onClick={() => {
              handleLogOut();
            }}
            //className="log_out"
        >
          Log out
        </button>
        </form>
        <div>
          {certificate && (
            <Certificate1 {...certificate} />
          )}
        </div>
        {/*certificate && (
          <div className="certificate">
            <div className="header">
              <h1>Certificate of Completion</h1>
            </div>
            <div className="content">
              <p>This certificate is presented to</p>
              <h2>{certificate?.student_name}</h2>
              <p>for successfully completing the following course:</p>
              <h3>{certificate?.school_major}</h3>
              <p>
                with a major in {certificate?.school_major} and a concentration
                in {certificate?.school_department}.
              </p>
              <p>Completed in {school_location}.</p> 
              <p>Date of completion: {completion_data}</p>
            </div>
            <div className="footer">
              <p>This certificate is issued by {certificate?.school_name}.</p>
            </div>
          </div>
        )*/}
      </div>
      <Footer />
    </>
  );
}
