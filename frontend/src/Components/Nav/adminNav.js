import React from 'react';
import { Link } from 'react-router-dom';

function adminNav() {
  return (
    <>
    <Link className="adminDash" to="/admin">
      Admin dashboard
    </Link>
    </>
  );
}

export default adminNav;
