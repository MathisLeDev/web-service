import React from 'react';
import {useNavigate} from "react-router-dom";
import {logout} from "../../services/Authentication/AuthenticationService";

const Header = () => {
    const navigate = useNavigate()

    const handleSignout = () => {
        logout()
        navigate("/login")
    }
    return (
        <div className="navbar bg-base-300 flex flex-row justify-between">
            <a className="btn btn-ghost text-xl">Quotopia</a>

            <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                        <img
                            alt="Tailwind CSS Navbar component"
                            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"/>
                    </div>
                </div>
                <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                    <li>
                        <button className="btn btn-accent" onClick={handleSignout}>Logout</button>
                    </li>
                </ul>
            </div>

</div>
)
    ;
};

export default Header;