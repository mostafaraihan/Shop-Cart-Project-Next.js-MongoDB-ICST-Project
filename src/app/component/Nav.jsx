"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useCart } from "./CartContext";
import { useState } from "react";
import "./css/Nav.css";

const Nav = () => {
  const { data: session } = useSession();
  const { cart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => signOut({ callbackUrl: "/" });

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* LOGO LEFT */}
        <Link href="/" className="logo">
          Raihan Interactive Shop
        </Link>
        {/* MENU CENTER */}
        <ul className={menuOpen ? "active" : ""}>
          <li>
            <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
          </li>
          <li>
            <Link href="/shop" onClick={() => setMenuOpen(false)}>Shop</Link>
          </li>
          <li>
            <Link href="/cart" onClick={() => setMenuOpen(false)}>Cart ({cart.length})</Link>
          </li>

          {/* MOBILE BUTTONS */}
          {menuOpen && (
            <>
              {session ? (
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              ) : (
                <>
                  <li>
                    <Link href="/login" onClick={() => setMenuOpen(false)}>Login</Link>
                  </li>
                  <li>
                    <Link href="/register" onClick={() => setMenuOpen(false)}>Sign Up</Link>
                  </li>
                </>
              )}
            </>
          )}
        </ul>

        {/* BUTTONS RIGHT */}
        <div className="navbar-right">
          {session ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <>
              <Link href="/login">Login</Link>
              <Link href="/register">Sign Up</Link>
            </>
          )}
        </div>

        {/* HAMBURGER */}
        <div
          className={`hamburger ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
