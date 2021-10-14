import React from 'react'
// import { Map, GoogleApiWrapper } from 'google-maps-react';

const mapStyles = {
    width: '550px',
    height: '500px'
};

function GoogleMap(){
    return(
        <div style={{width:'550px', height:'450px', overflow:'hidden'}}>
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

<<<<<<< HEAD
// export default GoogleApiWrapper({
//     apiKey: process.env.GOOGLE_API_KEY
// })(GoogleMap);

export default GoogleMap;
=======
//apiKey: "AIzaSyAu6tPcAGxeqak8qrBXkl6UHUtOgL8bkuM"

export default GoogleApiWrapper({
    apiKey: ""
<<<<<<< HEAD
})(GoogleMap);
>>>>>>> parent of 231eca2 (Issue #25 - Landing Page)
=======
})(GoogleMap);
>>>>>>> parent of bff07a5 (Issue #36 - Google Map API)
