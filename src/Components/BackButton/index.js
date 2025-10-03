import { useNavigate } from "react-router";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import './style.css'

const BackButton = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1)
  };

  return (
    <button className="backButton me-2" onClick={goBack}>
      <FontAwesomeIcon icon={faArrowLeft} />
    </button>
  );
};

export default BackButton;
