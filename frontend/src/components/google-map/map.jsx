import React from 'react'
// import { Map, GoogleApiWrapper } from 'google-maps-react';

const mapStyles = {
    width: '550px',
    height: '500px'
};

function GoogleMap(){
    return(
        <div style={{width:'555px', height:'450px', overflow:'hidden'}}>
            {/*<Map*/}
            {/*    google={window.google}*/}
            {/*    zoom={15}*/}
            {/*    style={mapStyles}*/}
            {/*    initialCenter={*/}
            {/*        {*/}
            {/*            lat: 43.000809,*/}
            {/*            lng: -78.78897*/}
            {/*        }*/}
            {/*    }*/}
            {/*/>*/}
        </div>

    )
}

// export default GoogleApiWrapper({
//     apiKey: process.env.GOOGLE_API_KEY
// })(GoogleMap);

export default GoogleMap;