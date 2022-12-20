import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, InputGroup, FormControl, Button, Row, Card} from 'react-bootstrap';
import {useState, useEffect } from "react";
import useAuth from "../useAuth.jsx"
import Header from "./Header.jsx"

//const CLIENT_ID = "eee6212ac836476a9ac3733fa623ecc4";
//const CLIENT_SECRET = "4ecd2073a4294284874860b2e29205da";

function Homescreen({code}) {
const accessToken2 = useAuth(code);

//searching mechanism
const [searchInput, setSearchInput] = useState("");
const [albums, setAlbums] = useState([]);
const [topSongs, setTopSongs] = useState([])
const [topArtists, setTopArtists] = useState([])

//initilizing API call/getting the access token from spotify
//had code here, but don't need at after more precise auth useage

//Search
async function search() {
//console.log("search for " + searchInput)


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
    //console.log(data.items)
    setTopSongs(data.items)

  });

  var myArtists = await fetch(TOP_ARTISTS_ENDPOINT, tracks)
  .then(response => response.json())
  .then(data => {
    console.log(data.items)
    setTopArtists(data.items)
  })
  
}






   return (<div>
   <Header />
      <Container className="top-things" style={{textAlign: 'center', display: 'grid', paddingRight: '0', marginRight: '0'}}>
        <Container >

          <Button className="info-gather btn btn-info" onClick={topTracks}> Show your top songs and artists</Button>
          <div ><h1  style={{
            color: 'white',
            borderBottomStyle: "solid",
            borderBottomWidth: "2px",
            borderBottomColor: "white"
            
            
            }}>Top Songs</h1></div>
          
          <Row className={"mx-2 row row-cols-2"}>
            {topSongs.map(song => {
              return (
               <div style={{ color: '#14FFEC'}} className={"Songs-card"}>
                <div> <img className='card-img' style={{width: '250px', borderRadius: '50%'}} src={song.album.images[0].url}></img></div>
                <div>
                  <div>{song.name}</div>
                  <div>{song.artists[0].name}</div>
                </div>
              </div>

             )
           })}
         </Row>
    </Container>
    <Container  style={{paddingTop: '35px'}}>
    <div className="home-h1"><h1  style={{
      color: 'white',
      borderBottomStyle: "solid",
      borderBottomWidth: "2px",
      borderBottomColor: "white",
    }}>Top Songs</h1></div>
      
    <Row  className={" mx-2 row row-cols-2 "}>
      {topArtists.map(artist => {
        return (
            <div style={{color: '#14FFEC'}} className={"Songs-card"}>
              <div> <img className='card-img' style={{width: '250px', height: '250px', borderRadius: '50%'}} src={artist.images[0].url}></img></div>
              <div>
               <div>{artist.name}</div>
               <div>{artist.genres[0]}</div>
              </div>
            </div>
          

          )
        })}
      </Row>
    </Container>
    <div className="search-div" >

        <InputGroup  className="mb-1" size="md">
          <FormControl 
            placeholder="search"
            type="input"
            onKeyPress={event => {
              if (event.key === "Enter") {
                search();
              }
            }}
            onChange={event => setSearchInput(event.target.value)}
          />
        </InputGroup>
      
      <Row className="mx-2 row row-cols-2">
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
      </Container>
      </div> )
   
}

export default Homescreen;