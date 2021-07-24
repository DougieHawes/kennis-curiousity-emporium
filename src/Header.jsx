import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
      <nav>
        <ul>
          <li>
            <NavLink to="/jewellery">jewellery</NavLink>
          </li>
          <li>
            <NavLink to="/footwear">footwear</NavLink>
          </li>
          <li>
            <NavLink to="/utensils">utensils</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
