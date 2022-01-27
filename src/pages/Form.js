import React, { useState } from "react";

//destructure out props, including router prop history
const Form = ({ initialCompany, handleSubmit, buttonLabel, history }) => {
  ////////////////
  // The Form Data State
  ////////////////
  // Initiallize the form with the initial state
  const [formData, setFormData] = useState(initialCompany);

  //////////////////////////
  // Functions
  //////////////////////////

  // Standard React Form HandleChange Function
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  // Function to run when form is submitted
  const handleSubmisson = (event) => {
    //prevent form refresh
    event.preventDefault();
    //pass formData to handleSubmit prop function
    handleSubmit(formData);
    //push user back to main page
    history.push("/");
  };

  
  return (
    <form onSubmit={handleSubmisson}>
      <input
        type="text"
        onChange={handleChange}
        value={formData.rank}
        name="rank"
      />
      <input
        type="text"
        onChange={handleChange}
        value={formData.name}
        name="name"
      />
      <input
        type="text"
        onChange={handleChange}
        value={formData.marketCap}
        name="marketCap"
      />
      <input
        type="text"
        onChange={handleChange}
        value={formData.country}
        name="country"
      />
      <input type="submit" value={buttonLabel} />
    </form>
  );
};

export default Form;