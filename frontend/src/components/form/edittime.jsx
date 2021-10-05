import React from "react";

function EditTime(){
    return(
        <form className="edit-time">
            <div style={{display:'flex',flexDirection:'column', marginTop:'100px', alignItems:'center'}}>
                <h1 className="labels">EDIT TIME</h1>
                
            </div>
            <div style={{display:'flex',flexDirection:'row'}}>
            <button type={"submit"} className="add-time"> ADD 30 MINUTES </button>
            <p></p>
                </div>
                <div style={{display:'flex',flexDirection:'row'}}>
                <button type={"submit"} className="add-time"> ADD 1 HOUR </button>
              </div>
              <div style={{display:'flex',flexDirection:'row'}}>
                <button type={"submit"} className="add-time"> ADD 2 HOURS </button>
                
            </div>
            
            </form>
          
    )

}
export default EditTime;