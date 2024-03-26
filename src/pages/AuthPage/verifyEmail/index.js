import React, { useEffect } from "react";
import emailVerify from "../../../Assets/Images/emailVerify.png";
import { handleApiRequest } from "../../../services/handleApiRequest";
import { resendVerificationEmail, verifyEmail } from "../../../redux/auth/thunk";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { successMsg } from "../../../utils/toastMsg";

export default function VerifyEmail() {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const token = params.get("token");
  const email = params.get("email");

  const handleVerifyEmail = async () => {
    const response = await handleApiRequest(verifyEmail, { token });
    if (response.status) {
      successMsg("Email verified!!");
      navigate("/login");
    }
  };

  const handleREsendEmail = async () => {
    const response = await handleApiRequest(resendVerificationEmail, { email });
    if (response.status) {
      successMsg("Verification email is sent!");
    }
  };

  useEffect(() => {
    handleVerifyEmail();
  }, []);

  return (
    <div className="text-center my-5">
      {/* <h2>Hold tightly!</h2> */}
      <img src={emailVerify} className="emailVerificationImage" />
      <h2 className="fw-bold">VERIFYING EMAIL</h2>
      <p className="fw-bold mb-0">We are verifying that the email you registered is valid.</p>
      <p className="fw-bold">Please wait until we process your request.</p>
      <div className="d-flex justify-content-center gap-10">
        <Button className="mainDarkColor rounded-pill" onClick={() => handleREsendEmail()}>
          Resend Email
        </Button>
        {/* <Button
          variant=""
          className="outlineBtn rounded-pill"
          onClick={() => navigate("/contactus")}
        >
          CONTACT US
        </Button> */}
      </div>
    </div>
  );
}
