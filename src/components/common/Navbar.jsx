import { useEffect, useState } from "react";
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai";
import { BsChevronDown } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Link, matchPath, useLocation } from "react-router-dom";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../../data/navbar-links";
import { apiConnector } from "../../services/apiconnector";
import { categories } from "../../services/apis";
import { ACCOUNT_TYPE } from "../../utils/constants";
import ProfileDropdown from "../core/Auth/ProfileDropdown";

function Navbar() {
  const [showDropDown, setShowDropDown] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart) || {};
  const location = useLocation();
  const [subLinks, setSubLinks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API);
        setSubLinks(res.data.data || []);
      } catch (error) {
        console.log("Could not fetch Categories.", error);
        setSubLinks([]); // fallback to empty array
      }
      setLoading(false);
    })();
  }, []);

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  return (
    <nav>
      {/* Example usage of totalItems with safe fallback */}
      <div>
        <AiOutlineShoppingCart />
        <span>{typeof totalItems === "number" ? totalItems : 0}</span>
      </div>

      {/* Example dropdown for categories */}
      <div>
        {loading ? (
          <span>Loading...</span>
        ) : subLinks && subLinks.length > 0 ? (
          <>
            {subLinks
              .filter(
                (subLink) =>
                  Array.isArray(subLink?.courses) && subLink.courses.length > 0
              )
              .map((subLink, i) => (
                <div key={i}>{subLink.name}</div>
              ))}
          </>
        ) : (
          <p>No Courses Found</p>
        )}
      </div>

      {/* Example NavbarLinks usage */}
      <ul>
        {NavbarLinks.map((link, idx) => (
          <li key={idx}>
            <Link to={link.path}>{link.title}</Link>
          </li>
        ))}
      </ul>

      {/* Example ProfileDropdown */}
      {token && user && <ProfileDropdown user={user} />}
    </nav>
  );
}

export default Navbar;
