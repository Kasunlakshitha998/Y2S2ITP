import React, {useState} from "react";
import Axios from 'axios';

export default function AddAForm() {
  const [image, setImage] = useState(null);

  function handleImage(e) {
    console.log(e.target.files);
    setImage(e.target.files[0]);
  }

  function handleApi() {
    const formData = new FormData();
    formData.append('image', image);

    Axios.post('url', formData)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.error('Error uploading image:', error);
      });
  }

  return (
    <div className="container">
      <form>
        <h2>Appointment For Repair Services</h2>
        <div className="form-group">
          <label htmlFor="name">Appointer name</label>
          <input type="text" className="form-control" id="name" aria-describedby="emailHelp" placeholder="Enter Your name"/>
        </div>
        <div className="form-group">
          <label htmlFor="age">Age</label>
          <input type="text" className="form-control" id="age" placeholder="Enter age"/>
        </div>
        <div className="form-group">
          <label htmlFor="gender">Gender</label>
          <input type="text" className="form-control" id="gender" placeholder="Enter Gender"/>
        </div>
        <div className="form-group">
          <input type="file" className="form-control-file" name="file" onChange={handleImage}/>
          <button type="button" onClick={handleApi}>Add Receipt</button>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}
