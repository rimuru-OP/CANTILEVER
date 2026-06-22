import {Link} from "react-router-dom";

export default function Auth(){
    return(
        <>
            <div id="auth">
                <Link to="/login">
                    Login
                </Link>
                <Link to="/register">
                    Register
                </Link>
            </div>
        </>
    )
};