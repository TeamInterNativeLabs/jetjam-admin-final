import { useEffect } from "react";
import { Link } from "react-router-dom";
import { error } from "../../Assets/images";
import "./style.css";

const Error = () => {

    useEffect(() => {
        document.title = 'JetJams | Error 404';
    }, [])

    return (
        <>
            <div className="errorContent">
                <img src={error} alt="Error" />
                <h2>404</h2>
                <h3>Page not found</h3>
                <Link to={'/dashboard'} className='text-white'>Back to Website</Link>
            </div>
        </>
    );
};

export default Error