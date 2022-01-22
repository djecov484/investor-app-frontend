import React from "react";
import { Link } from "react-router-dom";

// import  DeleteModal  from "../components/DeleteModal";

// destructuring the props needed to get our post, including router prop match
const SingleCompany = (props) => {
  const id =(props.match.params.id); //get the id from url param
  console.log(id)
  const company = props.rankings.find((company) => { return (company._id === id)});
  console.log(company)

  ////////////////////
  // Styles
  ///////////////////
  const div = {
    textAlign: "center",
    border: "3px solid green",
    width: "80%",
    margin: "30px auto",
    color: "black"
  };

 const deleteItem = ()=> {
   props.deleteCompany(company)
   props.history.push("/rankings")
 }
  return (
    <div style={div}>
      <h1>{company.rank}</h1>
      <h2>{company.name}</h2>
      <h2>{company.marketCap}</h2>
      <h2>{company.country}</h2> 
      <button onClick={(event) => props.edit(company)}>Edit</button>
      <button onClick={(event) => deleteItem()}>Delete</button>
      
   
      
      <Link to="/rankings">
        <button>Go Back</button>
      </Link>
    </div>
  );
};

export default SingleCompany;