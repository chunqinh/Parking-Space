// import React, {useState} from 'react';
// //
// // const parking = {
// //     "Alumni A Lot" : [43.000716, -78.780223, true],
// //     "Alumni B Lot" : [43.001901, -78.77871, false],
// //     "Alumni C Lot" : [43.001909, -78.779976, true],
// //     "Arena Lot" : [43.000857, -78.779418, false],
// //     "Baird A Lot" : [42.998558, -78.784504, true],
// //     "Cooke A Lot" : [42.999437, -78.793216 ,true],
// //     "Cooke B Lot" : [42.998715, -78.793237, false],
// //     "Fronczak Lot" : [43.002425, -78.791424, false],
// //     "Hochstetter B Lot" : [42.99859, -78.790212, false],
// //     "Jarvis A Lot" : [43.003721, -78.788517, false],
// //     "Jarvis B Lot" : [43.003972, -78.786929, true],
// //     "Ketter Lot" :  [43.002466, -78.788838, true],
// //     "Park Hall Lot" : [42.999657, -78.788688, true]
// // }
//
// function AvailableParkingLots(){
//
//     const [available, setAvailable] = useState(true);
//     const [free, setFree] = useState(false);
//     const [paid, setPaid] = useState(false);
//
//     function handleLots(setLots){
//         if (setLots === "free"){
//             setFree(!free);
//         }
//         else if (setLots === "paid"){
//             setPaid(!paid);
//         }
//         else{
//             setAvailable(!available);
//         }
//
//         return 0;
//     }
//
//     return(
//         <div>
//             <div>
//                 <button onClick={()=>handleLots("available")} className={available ? "dashboard-buttons active" : "dashboard-buttons"}>Available Lots</button>
//                 <button onClick={()=>handleLots("free")} className={free ? "dashboard-buttons active" : "dashboard-buttons"}>Free Lots</button>
//                 <button onClick={()=>handleLots("paid")} className={paid ? "dashboard-buttons active" : "dashboard-buttons"}>Paid Lots</button>
//             </div>
//             <div>
//                 {available || free || paid ?
//                     !free && available && paid ?
//                         <div className="dashboard-parking-lots">
//                             {Object.entries(parking).map((key,value)=>{
//                                 if (!key[1][2]){
//                                     return (<div className="available-parking-lots">{key[0]}</div>)
//                                 }
//                             })}
//                         </div>
//                     : !paid && available && free ?
//                         <div className="dashboard-parking-lots">
//                             {Object.entries(parking).map((key,value)=>{
//                                 if (key[1][2]){
//                                     return (<div className="available-parking-lots">{key[0]}</div>)
//                                 }
//                             })}
//                         </div>
//                     : paid && !free && !available ?
//                             <div className="dashboard-parking-lots">
//                                 {Object.entries(parking).map((key,value)=>{
//                                     if (!key[1][2]){
//                                         return (<div className="available-parking-lots">{key[0]}</div>)
//                                     }
//                                 })}
//                             </div>
//                     : free && !paid && !available ?
//                             <div className="dashboard-parking-lots">
//                                 {Object.entries(parking).map((key,value)=>{
//                                     if (key[1][2]){
//                                         return (<div className="available-parking-lots">{key[0]}</div>)
//                                     }
//                                 })}
//                             </div>
//                     : <div className="dashboard-parking-lots">
//                         {Object.entries(parking).map((key,value)=>{
//
//                             return (<div className="available-parking-lots">{key[0]}</div>)
//
//                         })}
//                     </div>
//                     : <div>  </div>
//                 }
//             </div>
//         </div>
//     )
// }
//
// export default AvailableParkingLots;