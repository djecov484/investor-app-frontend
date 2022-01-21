import {useEffect, useState} from "react";
import {Route, Switch, Link} from 'react-router-dom';
import Index from "../pages/Index";
import SingleCompany from "../pages/SingleCompany";
import BarChart from "./BarChart";



function Main(props){
    const [rankings, setRankings] = useState(null);

    const URL = "https://investors-app-api.herokuapp.com/rankings"; 

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

    // const getTargetCompany = (company) => {
    //     setTargetCompany(company);
    //     props.history.push("/edit")
    //   };
      
    //   // Function to edit  on form submission
      const updateCompany = async (company) => {
        const response = await fetch(URL + company.id + "/", {
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
        const response = await fetch(URL + company.id + "/", {
          method: "delete",
        });
      
    //     // get updated list 
        getRankings();
        props.history.push("/rankings");
      };

    useEffect(() => getRankings(), []);
    
    const loading = () => {
        return <h1>Loading...</h1>;
      };
    return (
            <main>
                    <Index rankings={rankings} createRankings={createRankings}/>
                <Switch>
                    <Route exact path="/rankings" />
                    {/* <Route path="/new" render={(routerProps) => <Main {...routerProps} initialCompany={nullCompany} handleSubmit={addRankings} buttonLabel="create company" /> } /> */}
                    {/* <Route path="/edit" render={(routerProps) => <Main {...routerProps} initialCompany={targetCompany} handleSubmit={updateComapny} buttonLabel="update company"/> } />   */} 
                    
                    <Route path="/rankings/:id" render={(routerProps) => <SingleCompany {...routerProps} rankings={rankings} edit={updateCompany} deleteCompany={deleteCompany}/> } /> 
                    {/* <Route path="/rankings/:id" 
                render={(rp) => ( 
                    <SingleCompany {...rp}/>)}/> */}
                </Switch>

                <div className="App-header">
                {rankings ?  <BarChart data={rankings} /> : loading()}
                </div>
            

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
                            <Link to= {"/rankings/"+ i.id} ><th scope="row">{i.name}</th></Link>
                            <th scope="row">{i.marketCap}</th>
                            <th scope="row">{i.country}</th>
                        
                        </tr>
                        
                    )
                    }  )  }
                    
                </tbody>

            </table>

            </main>
        )
    } 
  
  export default Main