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
         <div>
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" required/>
    </div>

    <div>
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required/>
    </div>

    <div>
        <label for="telephone">Telephone:</label>
        <input type="tel" id="telephone" name="telephone" required/>
    </div>

    <div>
        <label for="phoneType">Phone Type:</label><br/>
        <input type="checkbox" id="phoneType" name="phoneType"/>
        <label for="phoneType">Android</label><br/>
        <input type="checkbox" id="phoneType" name="phoneType"/>
        <label for="phoneType">Apple</label><br/>
        <input type="checkbox" id="phoneType" name="phoneType"/>
        <label for="phoneType">Windows</label>
    </div>

    <div>
        <label for="serviceType">Service Type:</label><br/>
        <input type="checkbox" id="serviceType" name="serviceType"/>
        <label for="serviceType">Display Services</label><br/>
        <input type="checkbox" id="serviceType" name="serviceType"/>
        <label for="serviceType">Motherboad Services</label><br/>
        <input type="checkbox" id="serviceType" name="serviceType"/>
        <label for="serviceType">Other Servicves</label>
    </div>

    <div>
        <label for="date">Date:</label>
        <input type="date" id="date" name="date" required/>
    </div>

    <div>
        <label for="description">Description:</label>
        <textarea id="description" name="description" required></textarea>
    </div>

        <div className="form-group">
          <input type="file" className="form-control-file" name="reciept" for="reciept" onChange={handleImage}/>
          <button type="button" onClick={handleApi}>Add Receipt</button>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}
