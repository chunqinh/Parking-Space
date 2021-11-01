import React, {useState} from 'react';

function AvailableParkingLots(){

    const [available, setAvailable] = useState(true);
    const [free, setFree] = useState(false);
    const [paid, setPaid] = useState(false);

    const showAvailable = () => setAvailable(!available);
    const showFree = () => setFree(!free);
    const showPaid = () => setPaid(!paid);

    return(
        <div>
            <div>
                <button onClick={showAvailable} className={available ? "dashboard-buttons active" : "dashboard-buttons"}>Available Lots</button>
                <button onClick={showFree} className={free ? "dashboard-buttons active" : "dashboard-buttons"}>Free Lots</button>
                <button onClick={showPaid} className={paid ? "dashboard-buttons active" : "dashboard-buttons"}>Paid Lots</button>
            </div>
            <div>
                {available
                ?
                    <div>Available</div>
                :
                    <></>
                }

                {free
                ?
                    <div>Free</div>
                :
                    <></>
                }
                {paid
                ?
                    <div>Paid</div>
                :
                    <></>
                }
            </div>
        </div>
    )
}

export default AvailableParkingLots;