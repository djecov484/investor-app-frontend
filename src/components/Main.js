import {useEffect, useState} from "react";
import {Route, Switch, Link} from 'react-router-dom';
import Index from "../pages/Index";
import Show from "../pages/Show";
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

    useEffect(() => getRankings(), []);
    
    const loading = () => {
        return <h1>Loading...</h1>;
      };
    return (
        <main>
              <Switch>
                <Route exact path="/rankings">
                <Index rankings={rankings} createRankings={createRankings}/>
                </Route>
                <Route path="/rankings/:id" 
                render={(rp) => ( 
                    <Show {...rp}/>)}/>
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
                         <Link to="/rankings/:id"><th scope="row">{i.name}</th></Link>
                         <th scope="row">{i.marketCap}</th>
                         <th scope="row">{i.country}</th>
                       
                    </tr>
                    
                  )
                })}
                
            </tbody>

        </table>

            
           
        </main>
    )
  } 
  
  export default Main