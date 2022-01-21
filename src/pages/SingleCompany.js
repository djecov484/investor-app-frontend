import React from "react";
import { Link } from "react-router-dom";

// import  DeleteModal  from "../components/DeleteModal";

// destructuring the props needed to get our post, including router prop match
const SingleCompany = ({ rankings, match, edit, deleteCompany}) => {
  const id = parseInt(match.params.id); //get the id from url param
  const company = rankings.find((company) => company._id === id);

  ////////////////////
  // Styles
  ///////////////////
  const div = {
    textAlign: "center",
    border: "3px solid green",
    width: "80%",
    margin: "30px auto",
    color: "white"
  };


  return (
    <div style={div}>
      <h1>{rankings.rank}</h1>
      <h2>{rankings.name}</h2>
      <h2>{rankings.marketCap}</h2>
      <h2>{rankings.country}</h2>
      <button onClick={(event) => edit(company)}>Edit</button>
      <button onClick={(event) => deleteCompany(company)}>Delete</button>
      
   
      
      <Link to="/rankings">
        <button>Go Back</button>
      </Link>
    </div>
  );
};

export default SingleCompany;