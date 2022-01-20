import { useState } from "react";
import {Link} from "react-router-dom"

function Index(props) {
  // state to hold formData
  const [newForm, setNewForm] = useState({
    rank: "",
    name: "",
    marketCap: "",
    country: ""

  });

  // handleChange function for form
  const handleChange = (event) => {
    setNewForm({ ...newForm, [event.target.name]: event.target.value });
  };

  // handle submit function for form
  const handleSubmit = (event) => {
    event.preventDefault();
    props.createRankings(newForm);
    setNewForm({
        rank: "",
        name: "",
        marketCap: "",
        country: ""
    });
  };

  // loaded function
  const loaded = () => {
    return props.rankings.map((company) => (
      <div key={company._id} className="company">
        <Link to={`/rankings/${company._id}`}><h1>{company.name}</h1></Link>
        <img src={company.image} alt={company.name} />
        <h3>{company.title}</h3>
      </div>
    ));
  };

  const loading = () => {
    return <h1>Loading...</h1>;
  };
  return (
    <section>
      <form onSubmit={handleSubmit}>
      <input
          type="text"
          value={newForm.rank}
          name="rank"
          placeholder="rank"
          onChange={handleChange}
        />
        <input
          type="text"
          value={newForm.image}
          name="image"
          placeholder="image URL"
          onChange={handleChange}
        />
        <input
          type="text"
          value={newForm.name}
          name="name"
          placeholder="name"
          onChange={handleChange}
        />
        <input
          type="text"
          value={newForm.marketCap}
          name="marketCap"
          placeholder="marketCap"
          onChange={handleChange}
        />
       
        <input
          type="text"
          value={newForm.country}
          name="country"
          placeholder="country"
          onChange={handleChange}
        />
        
        <input type="submit" value="Create a Company" />
      </form>
      {/* {props.rankings ? loaded() : loading()} */}
    </section>
  );
}

export default Index;