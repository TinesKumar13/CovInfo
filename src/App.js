import React,  { Component } from 'react';
import './App.css';
import {MenuItem, FormControl,Select} from "@material-ui/core";
import {useState,useEffect} from 'react';
import InfoBox from './InfoBox';
import Map from './Map';
import {Card,CardContent,Typography} from "@material-ui/core";
import Table from "./Table";
import {sortData} from "./util";
import LineGraph from "./LineGraph";
import "leaflet/dist/leaflet.css";
import Brightness2 from "@material-ui/icons/Brightness2";
import PieChart from './PieChart';
import InstagramIcon from '@material-ui/icons/Instagram';
import GitHubIcon from '@material-ui/icons/GitHub';
import FacebookIcon from '@material-ui/icons/Facebook';
import News from "./News";
import Topics from "./Topics";
import Cures from "./Cures";
import "./Api.css";
import Advice from "./Advice";




function App() {

const[countries, setCountries] = useState([]);

const [country, setCountry]= useState('worldwide');

const [countryInfo, setCountryInfo] = useState({});

const [tableData, setTableData] = useState([]);

const [casesType, setCasesType] = useState("cases");

const [mapCenter, setMapCenter] = useState({lat:34.80746, lng: -40.4796});

const [mapZoom,setMapZoom]= useState(3);

const [mapCountries,setMapCountries]= useState([]);

const [dark, setDark] = useState(true);
const [color,setColor] = useState("Gray");

// Start New Code Here

const [articles, setArticles] = useState([]); //Malaysian News API
const [topics,setTopics] = useState([]) //Get Latest Articles About Corona
const [cures, setCures] = useState([]) //Get Corona Cures
const apiKey = "cd65c41396574157a9f8c7412b0fde48";
const continent = "my";
const category = "health";
const topic = "corona virus";
const cure = "corona vaccine";

useEffect(() => { //This useEffect is for Corona Cure
  fetchCures();
},[])

const fetchCures = async () => { //This is to fetch Cures for Corona Virus
  await fetch(`https://newsapi.org/v2/top-headlines?q=${cure}&apiKey=${apiKey}`)
  .then((response) => response.json())
  .then((data) => {
      setCures(data.articles)
  })
}



useEffect(() => {     // This useEffect is for the Malaysian News API
  fetchData();
},[])

const fetchData = async () => { //This function is for the data of Malaysian News API
  await fetch(`https://newsapi.org/v2/top-headlines?country=${continent}&category=${category}&apiKey=${apiKey}`)
  .then((response) => response.json())
  
  .then((data) => {
  
      setArticles(data.articles)
  })

}

useEffect(() => {     // This useEffect is for the Corona Virus Articles
  fetchTopics();
},[])

const fetchTopics = async () => { //This function is for the data of Corona Virus Articles
  await fetch(`https://newsapi.org/v2/everything?q=${topic}&apiKey=${apiKey}`)
  .then((response) => response.json())
  
  .then((data) => {
  
      setTopics(data.articles)
  })

}





const generateKey = (pre) => {          //Generate Unique ID
return `${ pre }_${ new Date().getTime() }`;
}

// End Code Here

const Toggler = () => {
  setDark(!dark)
  
  if(dark==true){

    
setColor("Yellow")
document.body.style.backgroundColor = "#222831";
  }else{
    setColor("Gray")
    document.body.style.backgroundColor = "white";
  }
}





useEffect(() => {
  fetch("https://disease.sh/v3/covid-19/all")
  .then((response) => response.json())
  .then((data) => {
    setCountryInfo(data)
  })
},[])

useEffect (() => {

  const getCountriesData = async () => {
    await fetch (`https://disease.sh/v3/covid-19/countries`)
    .then((response) => response.json())
    .then((data) => {
      const countries = data.map((country) => (
        {
          name:country.country,
          value:country.countryInfo.iso2
        }
      ))
       const sortedData = sortData(data)
      setTableData(sortedData);
      setMapCountries(data);
      setCountries(countries)
    })
  }

  getCountriesData();

},[])


const onCountryChange = async (event) => {
  const countryCode = event.target.value
  setCountry(countryCode)


  const url = countryCode === 'worldwide' ? "https://disease.sh/v3/covid-19/all" : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

  await fetch(url)
  .then((response) => response.json())
  .then((data) => {
      setCountry(countryCode)
      setCountryInfo(data)
      if(countryCode !== "worldwide"){
        setMapCenter([data.countryInfo.lat, data.countryInfo.long])
        setMapZoom(4)
      }else{
        setMapCenter({lat: 34.80746, lng: -40.4796});
        setMapZoom(3);
      }
  })
}

console.log(countryInfo);



  return (
    
    <div className="app">
    
      <div className="app__left">
      
      <div className="app__header">
      
     <img className="rotate linear infinite" height="200" src={require('./images/virus.png')} />
     
      <h1>CovInfo</h1>
      
      
     <FormControl className="app__dropdown">
       
       <Select variant ="outlined" value={country} onChange={onCountryChange}>
         <MenuItem value="worldwide">WorldWide</MenuItem>
         {
           countries.map(country => (
             <MenuItem value={country.value}>{country.name}</MenuItem>
           ))
         }


      </Select>
       
     </FormControl>

     <Brightness2 className = "icon" onClick = {Toggler} style={{color}} />
    
     
    

     </div>

     <div className="app__stats">
          <InfoBox
            onClick={(e) => setCasesType("cases")}
            title="Coronavirus Cases"
            isRed
            active={casesType === "cases"}
            cases={countryInfo.todayCases}
            total={countryInfo.cases}
            />

          <InfoBox
            onClick={(e) => setCasesType("recovered")}
            title="Recovered"
            active={casesType === "recovered"}
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered}

          />
          <InfoBox
            onClick={(e) => setCasesType("deaths")}
            title="Deaths"
            isRed
            active={casesType === "deaths"}
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths}
          />
        </div>
        <Map
          countries={mapCountries}
          casesType={casesType}
          center={mapCenter}
          zoom={mapZoom}
        />
<div className = "api__section">
<div className="news">

<h2 className="first__Child">Healthcare News</h2>
{articles.map(article => (
    
  <News className="news" key={ generateKey(article.title) } title = {article.title} description ={article.description} image={article.urlToImage} url ={article.url}/>
  
))}

</div>

<div className="topics">
<h2 className="second__Child">Latest Reads On Corona</h2>
{topics.map(topic => (
    
    <Topics className="topics" key={ generateKey(topic.title) } title = {topic.title} description ={topic.description} image={topic.urlToImage} url ={topic.url}/>
    
  ))}

</div>

<div className="cures">
<h2 className="third__Child">Vaccine Development</h2>
{cures.map(cure => (
     
     <Cures classNames="cures" key={ generateKey(cure.url) } title = {cure.title} description ={cure.description} image={cure.urlToImage} url ={cure.url}/>
     
   ))}

</div>
</div>



      </div>

  


         <Card className="app__right">
           <CardContent>
             <h3>Live Cases</h3>
             <Table countries ={tableData}/>
             <h3 className="app__title">Worldwide New {casesType}</h3>
            <LineGraph casesType={casesType} />
            <h3 className="app__chart">Worlwide Statistics</h3>
            <PieChart className="chart" total ={countryInfo.cases} recovered={countryInfo.recovered} death ={countryInfo.deaths}/>
           </CardContent>

         </Card>

        
     
         <Advice/>
    
    
  


<div className="contact">
   <a href ="https://www.instagram.com/tinesh_13/?hl=ms"><InstagramIcon href ="https://www.instagram.com/tinesh_13/?hl=ms" style={{fontSize : 50, color: "palevioletred"}}/></a> 
   <a href="https://github.com/TinesKumar13"> <GitHubIcon  style={{fontSize : 50, color: "palevioletred"}}/></a>
   <a href="https://www.facebook.com/tinesh.antera"> <FacebookIcon  style={{fontSize : 50, color: "palevioletred"}}/></a>
</div>
 
  
  
     
       

       
    </div>


    

  
  );
}

export default App;
