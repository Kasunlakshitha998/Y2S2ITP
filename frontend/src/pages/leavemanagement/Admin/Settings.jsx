
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../../../Components/Leave_Management/Admin/Sidebar';
import { Link } from 'react-router-dom';
import "./Settings.scss";

export const Settings = () => {
  const [showLookupForm, setShowLookupForm] = useState(false);
  const [showHolidaysForm, setShowHolidaysForm] = useState(false);
  const [showLsetupForm, setLsetupForm] = useState(false);
  const [Lookups, setLookups] = useState([]);
  const [LookupsT, setLookupType] = useState('');
  const [LookupN, setLookupName] = useState('');
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [lookupToUpdate, setLookupToUpdate] = useState(null);
  const [HolidaysToUpdate, setHolidaysToUpdate] = useState(null);

  const [Holidays, setHolidays] = useState([]);
  const [Date, setDate] = useState('');
  const [Hname, setHname] = useState('');
  const [Description, setDescription] = useState('');

  const [Lsetup, setLsetup] = useState([]);
  const [SetupT, setSetupT] = useState('');
  const [ Company, setCompany] = useState('');
  const [Duration, setDuration] = useState('');
  const [  Max_CarryF, setMax_CarryF] = useState('');
  const [LsetupToUpdate, setLsetupToUpdate] = useState(null);
  
 
  



  useEffect(() => {
    fetchLookups();
    fetchHolidays();
    fetchLsetup();
  }, []);

  const fetchLookups = () => {
    axios.get("http://localhost:8175/Lookups/")
      .then(result => setLookups(result.data))
      .catch(err => console.log(err));
  };

  const fetchHolidays = () => {
    axios.get("http://localhost:8175/Holidays/")
      .then(result => setHolidays(result.data))
      .catch(err => console.log(err));
  };

  const fetchLsetup = () => {
    axios.get("http://localhost:8175/Lsetup/")
      .then(result => setLsetup(result.data))
      .catch(err => console.log(err));
  };


  const submitLsetup = (e) => {
    e.preventDefault();
    if (isUpdateMode) {
      axios.put(`http://localhost:8175/Lsetup/update/${LsetupToUpdate._id}`, {  SetupT,
      Company,
      Duration,
      Max_CarryF, })
        .then(result => {
          console.log(result);
          setIsUpdateMode(false);
          setLsetupToUpdate(null);
          setSetupT('');
          setCompany('');
          setDuration('');
          setMax_CarryF('');
          fetchLsetup(); 
        })
        .catch(err => console.log(err));
    } else {
      axios.post("http://localhost:8175/Lsetup/create", { SetupT,
      Company,
      Duration,
      Max_CarryF, })
        .then(result => {
          console.log(result);
          fetchLsetup(); 
        })
        .catch(err => console.log(err));
    }
  };

  const submitLookup = (e) => {
    e.preventDefault();
    if (isUpdateMode) {
      axios.put(`http://localhost:8175/Lookups/update/${lookupToUpdate._id}`, { LookupsT, LookupN })
        .then(result => {
          console.log(result);
          setIsUpdateMode(false);
          setLookupToUpdate(null);
          setLookupType('');
          setLookupName('');
          fetchLookups(); 
        })
        .catch(err => console.log(err));
    } else {
      axios.post("http://localhost:8175/Lookups/create", { LookupsT, LookupN })
        .then(result => {
          console.log(result);
          fetchLookups(); 
        })
        .catch(err => console.log(err));
    }
  };

 // Inside handleEditHoliday function
const handleEditHoliday = (holiday) => {
  setHolidaysToUpdate(holiday);
  setDate(holiday.Date);
  setHname(holiday.Hname);
  setDescription(holiday.Description);
  setIsUpdateMode(true);
};

const handleEditLsetup = (Lsetup) => {
  setLsetupToUpdate(Lsetup);
  setSetupT(Lsetup.SetupT)
  setCompany(Lsetup.Company);
  setDuration(Lsetup.Duration);
  setMax_CarryF(Lsetup.Max_CarryF);
  setIsUpdateMode(true);
};

// Inside submitHoliday function
const submitHoliday = (e) => {
  e.preventDefault();
  if (isUpdateMode && HolidaysToUpdate) {
    axios.put(`http://localhost:8175/Holidays/update/${HolidaysToUpdate._id}`, { Date, Hname, Description })
      .then(result => {
        console.log(result);
        setIsUpdateMode(false);
        setHolidaysToUpdate(null);
        setDate('');
        setHname('');
        setDescription('');
        fetchHolidays(); 
      })
      .catch(err => console.log(err));
  } else {
    axios.post("http://localhost:8175/Holidays/create", { Date, Hname, Description })
      .then(result => {
        console.log(result);
        fetchHolidays(); 
      })
      .catch(err => console.log(err));
  }
};

 

  const handleEditLookup = (lookup) => {
    setLookupToUpdate(lookup);
    setLookupType(lookup.LookupsT);
    setLookupName(lookup.LookupN);
    setIsUpdateMode(true);
  };

 

  const handleDeleteLookup = (id) => {
    axios.delete(`http://localhost:8175/Lookups/delete/${id}`)
      .then(response => {
        console.log(response);
        fetchLookups(); 
      })
      .catch(error => {
        console.error('Error deleting lookup:', error);
      });
  };

  const handleDeleteHoliday = (id) => {
    axios.delete(`http://localhost:8175/Holidays/delete/${id}`)
      .then(response => {
        console.log(response);
        fetchHolidays(); 
      })
      .catch(error => {
        console.error('Error deleting holiday:', error);
      });
  };

  const handleDeleteLsetup = (id) => {
    axios.delete(`http://localhost:8175/Lsetup/delete/${id}`)
      .then(response => {
        console.log(response);
        fetchLsetup(); 
      })
      .catch(error => {
        console.error('Error deleting Leave Setups:', error);
      });
  };
  const handleCancelLookup = () => {
    setIsUpdateMode(false);
    setLookupToUpdate(null);
    setLookupType('');
    setLookupName('');
  };

  const handleCancelHoliday = () => {
    setDate('');
    setHname('');
    setDescription('');
  };

  const handleCancelLsetup = () => {
    setIsUpdateMode(false);
    setLsetupToUpdate(null);
    setSetupT('');
    setCompany('');
    setDuration('');
    setMax_CarryF('');
    
  };

  return (
    <div>
      <Sidebar />
      <h1>Settings</h1>
      <h3>Setup Company Status here</h3>
      <ul>
        <li><Link to="#" onClick={() => setLsetupForm(true)}>Leave Setup</Link></li>
        <li><Link to="#" onClick={() => setShowHolidaysForm(true)}>Company Holidays</Link></li>
        <li><Link to="#" onClick={() => setShowLookupForm(true)}>Lookup Types</Link></li>
      </ul>

      {/* Lookup form */}
      {showLookupForm && (
        <>
          <form name='' className='formL' onSubmit={submitLookup}>
            <h3>{isUpdateMode ? 'Update Lookup' : 'Create Lookup'}</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="">Lookup Type</label>
                <select value={LookupsT} onChange={(e) => setLookupType(e.target.value)}>
                  <option value="Annual Leave">Annual Leave</option>
                  <option value="Casual Leave">Casual Leave</option>
                  <option value="Official Leave">Official Leave</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="">Lookup Name</label>
                <input type="text" name="LookupN" value={LookupN} onChange={(e) => setLookupName(e.target.value)} placeholder="HR department" />
              </div>
            </div>

            <button type="submit">{isUpdateMode ? 'Update' : 'Add'}</button>
            <button type="button" onClick={handleCancelLookup}>Cancel</button>
          </form>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Lookup Type</th>
                  <th>Lookup Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {Lookups.map((lookup) => (
                  <tr key={lookup._id}>
                    <td>{lookup.LookupsT}</td>
                    <td>{lookup.LookupN}</td>
                    <td>
                      <button onClick={() => handleEditLookup(lookup)}>Edit</button>
                      <button onClick={() => handleDeleteLookup(lookup._id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* Holiday form */}
      {showHolidaysForm && (
        <>
          <form name='Holiday' className='formL' onSubmit={submitHoliday}>
            <h3>{isUpdateMode ? 'Update Company Holiday' : 'Create Company Holiday'}</h3>
            <h4>Manage company holidays here</h4>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="">Date</label>
                <input type="date" value={Date} onChange={(e) => setDate(e.target.value)} />
              </div>

              <div className="form-group">
                <label htmlFor="">Holiday Name</label>
                <input type="text" value={Hname} onChange={(e) => setHname(e.target.value)} placeholder="Holiday name" />
              </div>

              <div className="form-group">
                <label htmlFor="">Description</label>
                <textarea rows="5" value={Description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe here" />
              </div>
            </div>

            <button type="submit">{isUpdateMode ? 'Update' : 'Add'}</button>
            <button type="button" onClick={handleCancelHoliday}>Cancel</button>
          </form>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Holiday Name</th>
                  <th>Description</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {Holidays.map((holiday) => (
                  <tr key={holiday._id}>
                    <td>{holiday.Date}</td>
                    <td>{holiday.Hname}</td>
                    <td>{holiday.Description}</td>
                    <td>
                      <button onClick={() => handleEditHoliday(holiday)}>Edit</button>
                      <button onClick={() => handleDeleteHoliday(holiday._id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* //Lsetup from */}

      {showLsetupForm && (
        <>
          <form name='' className='formL' onSubmit={submitLsetup}>
            <h3>{isUpdateMode ? 'Update Leave Setup' : 'Create Leave Setup'}</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="">Setup Type</label>
                <select value={SetupT} onChange={(e) => setSetupT(e.target.value)}>
                  <option value="Company">Company</option>
                  <option value="Individual">Individual</option>
                  
                </select>

                <label htmlFor="">Company</label>
                <select value={Company} onChange={(e) => setCompany(e.target.value)}>
                  <option value="Annual">Annual</option>
                  <option value="Casual">Casual</option>
                  <option value="Official">Offical</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="">Duration</label>
                <input type="number" name="Duration" value={Duration} onChange={(e) => setDuration(e.target.value)} placeholder="Duration" />
              </div>

              <div className="form-group">
                <label htmlFor="">Max Carry Forward Leaves</label>
                <input type="number" name="Max_CarryF" value={Max_CarryF} onChange={(e) => setMax_CarryF(e.target.value)} placeholder=" Enter Leaves" />
              </div>
            </div>

            <button type="submit">{isUpdateMode ? 'Update' : 'Add'}</button>
            <button type="button" onClick={handleCancelLsetup}>Cancel</button>
          </form>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Setup Type</th>
                  <th>Company</th>
                  <th>Duration</th>
                  <th>Max Carry Forward Leaves</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {Lsetup.map((Lsetup) => (
                  <tr key={Lsetup._id}>
                    <td>{Lsetup.SetupT}</td>
                    <td>{Lsetup.Company}</td>
                    <td>{Lsetup.Duration}</td>
                    <td>{Lsetup.Max_CarryF}</td>
                    <td>
                      <button onClick={() => handleEditLsetup(Lsetup)}>Edit</button>
                      <button onClick={() => handleDeleteLsetup(Lsetup._id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}


    </div>
  );
};

export default Settings;
