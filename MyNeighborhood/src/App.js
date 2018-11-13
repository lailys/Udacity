import React, { Component } from 'react';
import './App.css';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import {DebounceInput} from 'react-debounce-input'
import escapeRegExp from 'escape-string-regexp';
import axios from 'axios';





class App extends Component {


     /**
    * states
  */



    state={
      matchingMarker:[],
      filteredMarkers:[],
      selectedLocations:[],
      showingInfoWindow: false,
      showingInfoWindow2:false,
      activeMarker: {},
      activeButton: {},
      selectedPlace:{},
      markerName:'',
      markerLocation:'',
      query:''
    }


    componentDidMount() {
       this.getVenues()
     }



     /**
    * function to get the matched locations and markers
   */



    getVenues = async () => {
        await axios.get('https://api.foursquare.com/v2/venues/search?client_id=RQIJIE0KSRV1TJTISKESDU5TI0BB4IKLIM0BIHV2KZAQVGTD&client_secret=ZYYG433Z3GYP2G25OKMT2QJ3BOS2NKCHPA431ZN4KYHGKPFS&v=20180323&ll=37.4463611,-122.16075230000001&query=coffee&radius=1000')
        .then(response => {
          const venues=response.data.response.venues

        const matchingMarker=venues.map((venue)=>{
          return{
            name:venue.name,
            lat:venue.location.lat,
            lng:venue.location.lng,
            id:venue.id,
            isVisible:true
          }
        })
            this.setState({matchingMarker})
          this.setState({selectedLocations:response.data.response.venues,
                         filteredMarkers:response.data.response.venues})

        }).catch(error => {
          console.log(error)
        })
    }



    /**
    * showing the InfoWindow by clicking on the marker
  */


    onMarkerClick = (e,marker) =>{
       let markerPosition={lat:marker.lat,lng:marker.lng}
            this.setState({activeMarker:markerPosition,
                            showingInfoWindow:true})
        this.state.selectedLocations.forEach((venue)=>{
          if(marker.id===venue.id){
              this.setState({
              markerName:venue.name,
              markerLocation:venue.location.formattedAddress
            })

          }
        }
  )
     }


     /**
    * showing the InfoWindow by clicking on the button related to the marker
  */


     onButtonClick= (e,button)=> {
            this.state.matchingMarker.forEach((marker)=>{
              if(marker.id===button.id)
              {
             this.onMarkerClick(e,marker)

              }
          })
      ;}



      /**
      * filtering the markers on the map and the sidebar list by searching the query
     * typed in the search input
    */


    locationFilter= (word) =>{
               const markers = this.state.selectedLocations;
               const match=new RegExp(escapeRegExp(word), "i")
               if (word) {
                         let results=[]
                         markers.forEach((marker)=>{
                              if (marker.error) {this.setState({filteredMarkers:this.state.selectedLocations})
                             }else{
                               if (match.test(marker.name)) {
                                 results.push(marker);
                               }
                             }
                              })
                              this.setState({filteredMarkers:results})
                    }
              else{
                    this.setState({filteredMarkers:this.state.selectedLocations})
            }
     }
  queryChange=async (word) =>{
       this.setState({query:word})
       await this.locationFilter(word)

     }



render() {


    /**
   * rendering the markers on the map
 */


    const markerList = this.state.matchingMarker.map((venue) => {
    return (<Marker key={venue.lat} name={venue.name} id={venue.id}
             position={{lat:venue.lat, lng:venue.lng}}
             onClick={(e)=>this.onMarkerClick(e,venue)} role='button' tabIndex="0"/>)
            })


      /**
     * rendering the buttons on the sidebar
    */


    const buttonList=this.state.filteredMarkers.map(i => {
    return( <button  tabIndex="0" className='button' key={ i.id} address={i.location.address}
    value={i.name}  onClick={(e)=>this.onButtonClick(e,i)}> {i.name}</button>)
    })


 return (


      <main id="container">

          <header id="header" tabIndex="0" >MY NEIGHBORHOOD MAP</header>

          <section id='scroll'>

                    <div id='map' >
                    <Map className='mapMap'
                         google={this.props.google}
                         initialCenter={{
                             lat: 37.4463611,
                             lng: -122.16075230000001
                              }}
                         zoom={15}>



                          { markerList}



                      <InfoWindow
                               options={{pixelOffset: new window.google.maps.Size(0,-40)}}
                               position={this.state.activeMarker}
                               visible={this.state.showingInfoWindow}>
                                 <div id='info'>
                                 <span className="venueName">{this.state.markerName}</span>
                                 <br/><br/>
                                 Address:<br/>{this.state.markerLocation}
                                 </div>
                      </InfoWindow>



                      </Map>
                      </div  >


                      <DebounceInput id='input1' type='text'
                                     value={this.state.query}
                                     placeholder='search location'
                                     onChange={(e) => this.queryChange(e.target.value)}
                                     tabIndex="0"/>

                    <div id='list'>
                     {buttonList}
                      </div>

            </section>

      </main>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyA45OMUI_gsIlA4xZ0gzwqfkC4s-eDhdOk')
})(App)
