import React, { useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, InputGroup, FormControl, Button, Row} from 'react-bootstrap';
import {useState} from "react";
import useAuth from "./useAuth.jsx"







//const CLIENT_ID = "eee6212ac836476a9ac3733fa623ecc4";
//const CLIENT_SECRET = "4ecd2073a4294284874860b2e29205da";

function Homescreen({code}) {
const accessToken2 = useAuth(code);

//searching mechanism
const [searchInput, setSearchInput] = useState("");
const [albums, setAlbums] = useState([]);
const [topSongs, setTopSongs] = useState([])
const [topArtists, setTopArtists] = useState([])
const [hoverIndex, setHoverIndex] = useState(-1);
const [screenWidth, setScreenWidth] = useState(window.innerWidth);



//initilizing API call/getting the access token from spotify
//had code here, but don't need at after more precise auth useage

//Search
async function search() {



//artist ID using GET request
var searchParameters = {
method: 'GET',
headers: {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer ' + accessToken2
}

}
var artistID = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=artist' , searchParameters)
.then(response => response.json())
.then(data => {return data.artists.items[0].id})

//console.log("artist id is " + artistID);

//Get request with Artist ID grab all albums from said artist
var returnedAlbums = await fetch('https://api.spotify.com/v1/artists/' + artistID + '/albums' + '?include_groups=album&market=US&limit=10' , searchParameters)
.then(response => response.json())
.then(data => {
  //console.log(data);
  setAlbums(data.items);
});
//Display those albums to the user
}
//console.log(albums);

const TOP_TRACKS_ENDPOINT = 'https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=10&offset=0'

const TOP_ARTISTS_ENDPOINT = 'https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=20&offset=0'

//these are the functions for calling the information needed to get top tracks and artists

async function topTracks() {
  var tracks = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + accessToken2
    }
  }
  
  var myTracks = await fetch(TOP_TRACKS_ENDPOINT, tracks)
  .then(response => response.json())
  .then(data => {
    console.log(data.items)
    setTopSongs(data.items)

  });

  var myArtists = await fetch(TOP_ARTISTS_ENDPOINT, tracks)
  .then(response => response.json())
  .then(data => {
    //console.log(data.items)
    setTopArtists(data.items)
  })
   
  
}

//button text in certain display

useEffect(() => {
  function handleResize() {
    setScreenWidth(window.innerWidth);
  }
  window.addEventListener('resize', handleResize);
  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);


let buttonText;
if(screenWidth < 600) {
  buttonText = "generate songs/artists"
} else {
  buttonText = "generate your top songs and artists!"
}

let rowSize;
if(screenWidth < 600) {
  rowSize = "mx-1 row row-cols-1";
} else if (screenWidth > 600) {
  rowSize = "mx-2 row row-cols-2";
}



//main page

   return (<div>
   <div className="header">

    <i className="header-icon icon fa-brands fa-spotify"></i>
    <h1 className="head-title"> Spotify React</h1>
    <Button style={{backgroundColor: "#333333"}} className="info-gather btn btn-dark" onClick={topTracks}>{buttonText}</Button> 
      <div class="wave"></div>
      <div class="wave"></div>
      <div class="wave"></div>
  </div>
  
<div className="search-div" >

<InputGroup  className="mb-1" size="sm">
  <FormControl 
    placeholder="search any artist's released albums"
    type="input"
    style={{
        backgroundColor: "rgba(255, 255, 255, 0.8)", 
        border: "1px solid #ccc",
        color: "#333"
      }}
    onKeyPress={event => {
      if (event.key === "Enter") {
        search();
      }
    }}
    onChange={event => setSearchInput(event.target.value)}
  />
</InputGroup>

<Row  className="mx-2 row row-cols-2">
  {albums.map( (album, i) => {
    return (<div syle={{width: '100px'}} className={"searchCards"} key={i}>
              <div key={i + 3}> <img className="search-img" src={album.images[0].url} /></div>
               <div key={i + 2}>
                <div key={i + 1} ><p>{album.name}</p></div>
              </div>
            </div>
        
    )
  })}
</Row>
</div> 
   
   
   
   
      <Container className="top-things" style={{textAlign: 'center', display: 'grid', paddingRight: '0', marginRight: '0'}}>
        <Container style={{paddingRight: "0"}}>
        
          
        




          
          
          <div ><h1  style={{
            color: 'white',
            borderBottomStyle: "solid",
            borderBottomWidth: "2px",
            borderBottomColor: "white"
            
            
            }}>Top Songs</h1></div>
          
          <Row className={rowSize}>
            {topSongs.map((song, index) => {
              return (
               <div  style={{ color: '#14FFEC'}} className={"Songs-card"} key={song.id + 1}>
                <div> <img 
                onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(-1)}
                style={{
                width: index === hoverIndex ? '260px' : '250px',
                borderRadius: '50%',
                cursor: index === hoverIndex ? "pointer" : "default"
                }}
                 className={"card-img"} 
                 src={song.album.images[0].url} 
                 key={song.id}></img></div>
                <div>
                  <div >{song.name}</div>
                  <div >{song.artists[0].name}</div>
                </div>
              </div>

             )
           })}
         </Row>
    </Container>
    <Container  style={{paddingTop: '35px', paddingRight: "0"}}>
    <div className="home-h1"><h1  style={{
      color: 'white',
      borderBottomStyle: "solid",
      borderBottomWidth: "2px",
      borderBottomColor: "white",
    }}>Top Artists</h1></div>
      
    <Row  className={rowSize}>
      {topArtists.map((artist, index) => {
        return (
            <div key={artist.id} style={{color: '#14FFEC'}} className={"Songs-card"}>
              <div> <img
                onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(-1)}
                style={{
                width: index === hoverIndex ? '260px' : '250px',
                height: index === hoverIndex ? "260px" : "250px",
                borderRadius: '50%',
                cursor: index === hoverIndex ? "pointer" : "default"
                }}
               className='card-img'  
               src={artist.images[0].url}>

               </img></div>
              <div>
               <div>{artist.name}</div>
               <div>{artist.genres[0]}</div>
              </div>
            </div>
          

          )
        })}
      </Row>
    </Container>
   
      </Container>


      </div> )
   
}

export default Homescreen;