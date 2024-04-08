import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {

    const { isAuthenticated, logout } = useAuth();

    return (
        <nav className="bg-zinc-700 my-3 flex justify-between py-5 px-10 rounded-lg">
            <h1 className="text-2x1 font-bold"> Players Manager</h1>
            <ul className="flex gap-x-2">
                {isAuthenticated ? (
                    <>
                        <li>
                            Welcome User
                        </li>
                        <li>
                            <Link to='/players/new'>Anade un jugador</Link>
                        </li>
                        <li>
                            <Link to="/login" onClick={() => {
                                logout();
                            }}>Logout</Link>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to='/login'>Login</Link>
                        </li>
                        <li>
                            <Link to='/register'>Register</Link>
                        </li>
                    </>
                )}
            </ul>




        </nav>
    );
}

export default Navbar;