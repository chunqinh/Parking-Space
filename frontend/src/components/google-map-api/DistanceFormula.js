// function distanceFormula(latitude1, longitude1, latitude2, longitude2){
//
//     //Radius of Earth
//     const radius =  6371000;
//
//     //Change PI into Radians
//     const latitude1InRadians = latitude1 * (Math.PI/180);
//     const latitude2InRadians = latitude2 * (Math.PI/180);
//
//     //Change in Longitude and Latitude
//     const changeInLatitude = (latitude2 - latitude1) * (Math.PI/180);
//     const changeInLongitude = (longitude2 - longitude1) * (Math.PI/180);
//
//     const sum = (Math.sin(changeInLatitude/2) * Math.sin(changeInLatitude/2)) +
//         (Math.cos(latitude1InRadians) * Math.cos(latitude2InRadians) * Math.sin(changeInLongitude/2) *
//             Math.sin(changeInLongitude/2))
//
//     const tanInverse = 2 * Math.atan(Math.sqrt(sum), Math.sqrt(1-sum));
//
//     return (radius * tanInverse)/1000;
//
// }
//
// const values = {
//     distanceFormula
// }
//
