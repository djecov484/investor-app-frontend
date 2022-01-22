import { useState } from "react";
import {Link} from "react-router-dom"
import BarChart from "../components/BarChart";

function Index(props) {
  // state to hold formData
  const [newForm, setNewForm] = useState({
    rank: "",
    name: "",
    marketCap: "",
    country: ""

  });

  let rankings = props.rankings

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
    return (
      <>
      <div className="App-header">
      {rankings ?  <BarChart data={rankings} /> : loading()}
      </div>
  
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
     
    </section>
 
  <table className="table">
      <thead>
          <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Market Cap</th>
              <th>Country</th>
          </tr>
      </thead>
      <tbody>
          {rankings?.map((i) => { 
          return(
              <tr>
                  <th scope="row">{i.rank}</th>
                  <Link to= {"/rankings/"+ i._id} ><th scope="row">{i.name}</th></Link>
                  <th scope="row">{i.marketCap}</th>
                  <th scope="row">{i.country}</th>
              
              </tr>
              
          )
          }  )  }
          
      </tbody>

  </table>
  </>
    );
  };

  const loading = () => {
    return <h1>Loading...</h1>;
  };
  return (
   <>
    
    {rankings ? loaded():loading()}
    </>
  )
   
  
}

export default Index;