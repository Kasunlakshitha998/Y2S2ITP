import React, {useState} from "react"

function AddAFormForm() {

    return (

      <div>
    <form>

  <div className="form-group">

    <label for="name">Appointer name</label>
    <input type="text" Name="form-control" id="name" aria-describedby="emailHelp" placeholder="Enter Your name"/>

     </div>

  <div className="form-group">

    <label for="age">Age</label>
    <input type="text" class="form-control" id="age" placeholder="Enter age"/>

  </div>

  <div className="form-group">

    <label for="gender">Gender</label>
    <input type="text" Name="form-control" id="gender" placeholder="Enter Gender"/>

  </div>
  
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
</div>
    );
}

export default AddAFormForm;
