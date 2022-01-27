import {useEffect, useState} from "react";
import {Route, Switch, Link} from 'react-router-dom';
import Form from "../pages/Form";
import Index from "../pages/Index";
import SingleCompany from "../pages/SingleCompany";
import BarChart from "./BarChart";



function Main(props){
    const [rankings, setRankings] = useState(null);
    const [company, setCompany] = useState(null)

    const URL = "https://investors-app-api.herokuapp.com/rankings/"; 

    const getRankings = async () => {
        const response = await fetch(URL);
        const data = await response.json();
        console.log(data)
        setRankings(data);
    };
    
     

    const createRankings = async (company) => {
        await fetch(URL, { method: "post", 
                           headers: {"Content-Type": "application/json"}, 
                           body: JSON.stringify(company), 
                        });
       getRankings();                 
    };

    const getTargetCompany = (company) => {
        setCompany(company);
        props.history.push("/edit")
      };
      
    //   // Function to edit  on form submission
      const updateCompany = async (company) => {
          console.log("edit")
        const response = await fetch(URL + company._id + "/", {
          method: "put",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(company),
        });
       
    //     // get updated list 
        getRankings();
      };
      
      const deleteCompany = async (company) => {
        const response = await fetch(URL + company._id , {
          method: "delete",
        });
      console.log("push")
    //     // get updated list 
        getRankings();
        props.history.push("/");
      };

    useEffect(() => getRankings(), []);
    
    const loading = () => {
        return <h1>Loading...</h1>;
      };
    return (
            <main>
                <Switch>
                    <Route exact path="/" render={(routerProps) => <Index {...routerProps} rankings={rankings} createRankings= {createRankings}/>} />
                    
                    {/* <Route path="/new" render={(routerProps) => <Main {...routerProps} initialCompany={nullCompany} handleSubmit={addRankings} buttonLabel="create company" /> } /> */}
                    <Route path="/edit" render={(routerProps) => <Form {...routerProps} initialCompany={company} handleSubmit={updateCompany} buttonLabel="update company"/> } />   
                    
                    <Route path="/rankings/:id" render={(routerProps) => <SingleCompany {...routerProps} rankings={rankings} edit={getTargetCompany} deleteCompany={deleteCompany} match={routerProps.match}/> } /> 
                    {/* <Route path="/rankings/:id" 
                render={(rp) => ( 
                    <SingleCompany {...rp}/>)}/> */}

                </Switch>



            </main>
        )
    } 
  
  export default Main