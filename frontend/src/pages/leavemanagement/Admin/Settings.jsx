import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AdminNav from '../../../Components/Nav/adminNav';

const Settings = () => {
  const [showLookupForm, setShowLookupForm] = useState(false);
  const [showHolidaysForm, setShowHolidaysForm] = useState(false);
  const [showLsetupForm, setShowLsetupForm] = useState(false);

  // Lookups state
  const [lookups, setLookups] = useState([]);
  const [LookupsT, setLookupsType] = useState('');
  const [LookupN, setLookupName] = useState('');
  const [isUpdateModeLookup, setIsUpdateModeLookup] = useState(false);
  const [lookupToUpdate, setLookupToUpdate] = useState(null);

  // Holidays state
  const [holidays, setHolidays] = useState([]);
  const [date, setDate] = useState('');
  const [holidayName, setHolidayName] = useState('');
  const [description, setDescription] = useState('');
  const [isUpdateModeHoliday, setIsUpdateModeHoliday] = useState(false);
  const [holidayToUpdate, setHolidayToUpdate] = useState(null);

  // Leave setup state
  const [lsetup, setLsetup] = useState([]);
  const [setupType, setSetupType] = useState('');
  const [company, setCompany] = useState('');
  const [duration, setDuration] = useState('');
  const [maxCarryForward, setMaxCarryForward] = useState('');
  const [isUpdateModeLsetup, setIsUpdateModeLsetup] = useState(false);
  const [lsetupToUpdate, setLsetupToUpdate] = useState(null);

  useEffect(() => {
    fetchLookups();
    fetchHolidays();
    fetchLsetup();
  }, []);

  const fetchLookups = () => {
    axios
      .get('http://localhost:8175/LookLeave/')
      .then((result) => setLookups(result.data))
      .catch((err) => console.log(err));
  };

  const fetchHolidays = () => {
    axios
      .get('http://localhost:8175/Holidays/')
      .then((result) => setHolidays(result.data))
      .catch((err) => console.log(err));
  };

  const fetchLsetup = () => {
    axios
      .get('http://localhost:8175/Lsetup/')
      .then((result) => setLsetup(result.data))
      .catch((err) => console.log(err));
  };

  // Handle lookup form submission
  const submitLookup = (e) => {
    e.preventDefault();
    if (isUpdateModeLookup && lookupToUpdate) {
      axios
        .put(`http://localhost:8175/LookLeave/update/${lookupToUpdate._id}`, {
          LookupsT,
          LookupN,
        })
        .then((result) => {
          console.log(result);
          setIsUpdateModeLookup(false);
          setLookupToUpdate(null);
          setLookupsType('');
          setLookupName('');
          fetchLookups();
        })
        .catch((err) => console.log(err));
    } else {

      const newl = {
        LookupsT,
        LookupN,
      };

      console.log(newl);
      axios
        .post('http://localhost:8175/LookLeave/create', newl)
        .then((result) => {
          console.log(result);
          fetchLookups();
        })
        .catch((err) => console.log(err));
    }
  };

  // Handle holiday form submission
  const submitHoliday = (e) => {
    e.preventDefault();
    if (isUpdateModeHoliday && holidayToUpdate) {
      axios
        .put(`http://localhost:8175/Holidays/update/${holidayToUpdate._id}`, {
          date,
          holidayName,
          description,
        })
        .then((result) => {
          console.log(result);
          setIsUpdateModeHoliday(false);
          setHolidayToUpdate(null);
          setDate('');
          setHolidayName('');
          setDescription('');
          fetchHolidays();
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .post('http://localhost:8175/Holidays/create', {
          date,
          holidayName,
          description,
        })
        .then((result) => {
          console.log(result);
          fetchHolidays();
        })
        .catch((err) => console.log(err));
    }
  };

  // Handle leave setup form submission
  const submitLsetup = (e) => {
    e.preventDefault();
    if (isUpdateModeLsetup && lsetupToUpdate) {
      axios
        .put(
          `http://localhost:8175/Lsetup/update/${lsetupToUpdate._id}`,
          {
            setupType,
            company,
            duration,
            maxCarryForward,
          }
        )
        .then((result) => {
          console.log(result);
          setIsUpdateModeLsetup(false);
          setLsetupToUpdate(null);
          setSetupType('');
          setCompany('');
          setDuration('');
          setMaxCarryForward('');
          fetchLsetup();
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .post('http://localhost:8175/Lsetup/create', {
          setupType,
          company,
          duration,
          maxCarryForward,
        })
        .then((result) => {
          console.log(result);
          fetchLsetup();
        })
        .catch((err) => console.log(err));
    }
  };

  // Handle edit functions
  const handleEditLookup = (lookup) => {
    setLookupToUpdate(lookup);
    setLookupsType(lookup.LookupsT);
    setLookupName(lookup.LookupN);
    setIsUpdateModeLookup(true);
  };

  const handleEditHoliday = (holiday) => {
    setHolidayToUpdate(holiday);
    setDate(holiday.date);
    setHolidayName(holiday.holidayName);
    setDescription(holiday.description);
    setIsUpdateModeHoliday(true);
  };

  const handleEditLsetup = (Lsetup) => {
    setLsetupToUpdate(Lsetup);
    setSetupType(Lsetup.setupType);
    setCompany(Lsetup.company);
    setDuration(Lsetup.duration);
    setMaxCarryForward(Lsetup.maxCarryForward);
    setIsUpdateModeLsetup(true);
  };

  // Handle delete functions
  const handleDeleteLookup = (id) => {
    axios
      .delete(`http://localhost:8175/LookLeave/delete/${id}`)
      .then((response) => {
        console.log(response);
        fetchLookups();
      })
      .catch((error) => {
        console.error('Error deleting lookup:', error);
      });
  };

  const handleDeleteHoliday = (id) => {
    axios
      .delete(`http://localhost:8175/Holidays/delete/${id}`)
      .then((response) => {
        console.log(response);
        fetchHolidays();
      })
      .catch((error) => {
        console.error('Error deleting holiday:', error);
      });
  };

  const handleDeleteLsetup = (id) => {
    axios
      .delete(`http://localhost:8175/Lsetup/delete/${id}`)
      .then((response) => {
        console.log(response);
        fetchLsetup();
      })
      .catch((error) => {
        console.error('Error deleting Leave Setups:', error);
      });
  };

  // Handle cancel functions
  const handleCancelLookup = () => {
    setIsUpdateModeLookup(false);
    setLookupToUpdate(null);
    setLookupsType('');
    setLookupName('');
  };

  const handleCancelHoliday = () => {
    setIsUpdateModeHoliday(false);
    setHolidayToUpdate(null);
    setDate('');
    setHolidayName('');
    setDescription('');
  };

  const handleCancelLsetup = () => {
    setIsUpdateModeLsetup(false);
    setLsetupToUpdate(null);
    setSetupType('');
    setCompany('');
    setDuration('');
    setMaxCarryForward('');
  };

  return (
    <div>
      <AdminNav />
      <div className="ml-48 max-w-5xl mt-24">
        <div className="ml-20">
          <h1 className="text-xl font-bold mb-4">Settings</h1>
          <h3 className="text-lg font-semibold mb-2">
            Setup Company Status here
          </h3>
          <ul className="list-disc pl-6">
            <li>
              <Link
                to="#"
                className="text-blue-500 hover:underline"
                onClick={() => setShowLsetupForm(true)}
              >
                Leave Setup
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="text-blue-500 hover:underline"
                onClick={() => setShowHolidaysForm(true)}
              >
                Company Holidays
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="text-blue-500 hover:underline"
                onClick={() => setShowLookupForm(true)}
              >
                Lookup Types
              </Link>
            </li>
          </ul>
        </div>

        {/* Lookup form */}
        {showLookupForm && (
          <>
            <form name="" onSubmit={submitLookup}>
              <h3>{isUpdateModeLookup ? 'Update Lookup' : 'Create Lookup'}</h3>
              <div>
                <div>
                  <label htmlFor="">Lookup Type</label>
                  <select
                    value={LookupsT}
                    onChange={(e) => setLookupsType(e.target.value)}
                  >
                    <option value="Annual Leave">Annual Leave</option>
                    <option value="Casual Leave">Casual Leave</option>
                    <option value="Official Leave">Official Leave</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="">Lookup Name</label>
                  <input
                    type="text"
                    name="LookupN"
                    value={LookupN}
                    onChange={(e) => setLookupName(e.target.value)}
                    placeholder="HR department"
                  />
                </div>
              </div>

              <div className="flex mr-5 justify-between">
                <button
                  className="w-30 mx-10 my-2"
                  type="button"
                  onClick={handleCancelLookup}
                >
                  Cancel
                </button>
                <button className="w-30 mx-10 my-2" type="submit">
                  {isUpdateModeLookup ? 'Update' : 'Add'}
                </button>
              </div>
            </form>

            <div className="overflow-x-auto">
              <table className="table-auto w-full">
                <thead>
                  <tr>
                    <th className="px-4 py-2">Lookup Type</th>
                    <th className="px-4 py-2">Lookup Name</th>
                    <th className="px-4 py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {lookups.map((lookup) => (
                    <tr key={lookup._id} className="bg-gray-100">
                      <td className="border px-4 py-2">{lookup.LookupsT}</td>
                      <td className="border px-4 py-2">{lookup.LookupN}</td>
                      <td className="border px-4 py-2">
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                          onClick={() => handleEditLookup(lookup)}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                          onClick={() => handleDeleteLookup(lookup._id)}
                        >
                          Delete
                        </button>
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
            <form name="Holiday" onSubmit={submitHoliday}>
              <h3>
                {isUpdateModeHoliday
                  ? 'Update Company Holiday'
                  : 'Create Company Holiday'}
              </h3>
              <h4>Manage company holidays here</h4>

              <div>
                <div>
                  <label htmlFor="">Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="">Holiday Name</label>
                  <input
                    type="text"
                    value={holidayName}
                    onChange={(e) => setHolidayName(e.target.value)}
                    placeholder="Holiday name"
                  />
                </div>

                <div>
                  <label htmlFor="">Description</label>
                  <textarea
                    rows="5"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe here"
                  />
                </div>
              </div>
              <div className="flex mr-5 justify-center">
                <button
                  className="w-30 mx-10 my-2"
                  type="button"
                  onClick={handleCancelHoliday}
                >
                  Cancel
                </button>
                <button className="w-30 mx-10 my-2" type="submit">
                  {isUpdateModeHoliday ? 'Update' : 'Add'}
                </button>
              </div>
            </form>

            <div className="overflow-x-auto">
              <table className="table-auto w-full">
                <thead>
                  <tr>
                    <th className="px-4 py-2">Date</th>
                    <th className="px-4 py-2">Holiday Name</th>
                    <th className="px-4 py-2">Description</th>
                    <th className="px-4 py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {holidays.map((holiday) => (
                    <tr key={holiday._id} className="bg-gray-100">
                      <td className="border px-4 py-2">{holiday.date}</td>
                      <td className="border px-4 py-2">
                        {holiday.holidayName}
                      </td>
                      <td className="border px-4 py-2">
                        {holiday.description}
                      </td>
                      <td className="border px-4 py-2">
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                          onClick={() => handleEditHoliday(holiday)}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                          onClick={() => handleDeleteHoliday(holiday._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* Leave setup form */}
        {showLsetupForm && (
          <>
            <form name="" onSubmit={submitLsetup}>
              <h3>
                {isUpdateModeLsetup
                  ? 'Update Leave Setup'
                  : 'Create Leave Setup'}
              </h3>
              <div>
                <div>
                  <label htmlFor="">Setup Type</label>
                  <select
                    value={setupType}
                    onChange={(e) => setSetupType(e.target.value)}
                  >
                    <option value="Company">Company</option>
                    <option value="Individual">Individual</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="">Company</label>
                  <select
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                  >
                    <option value="Annual">Annual</option>
                    <option value="Casual">Casual</option>
                    <option value="Official">Offical</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="">Duration</label>
                  <input
                    type="number"
                    name="Duration"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="Duration"
                  />
                </div>
                <div>
                  <label htmlFor="">Max Carry Forward Leaves</label>
                  <input
                    type="number"
                    name="Max_CarryF"
                    value={maxCarryForward}
                    onChange={(e) => setMaxCarryForward(e.target.value)}
                    placeholder=" Enter Leaves"
                  />
                </div>
              </div>

              <div className="flex mr-5 justify-center">
                <button
                  className="w-30 mx-10 my-2"
                  type="button"
                  onClick={handleCancelLsetup}
                >
                  Cancel
                </button>
                <button className="w-30 mx-10 my-2" type="submit">
                  {isUpdateModeLsetup ? 'Update' : 'Add'}
                </button>
              </div>
            </form>

            <div className="overflow-x-auto">
              <table className="table-auto w-full">
                <thead>
                  <tr>
                    <th className="px-4 py-2">Setup Type</th>
                    <th className="px-4 py-2">Company</th>
                    <th className="px-4 py-2">Duration</th>
                    <th className="px-4 py-2">Max Carry Forward Leaves</th>
                    <th className="px-4 py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {lsetup.map((lsetup) => (
                    <tr key={lsetup._id} className="bg-gray-100">
                      <td className="border px-4 py-2">{lsetup.setupType}</td>
                      <td className="border px-4 py-2">{lsetup.company}</td>
                      <td className="border px-4 py-2">{lsetup.duration}</td>
                      <td className="border px-4 py-2">
                        {lsetup.maxCarryForward}
                      </td>
                      <td className="border px-4 py-2">
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                          onClick={() => handleEditLsetup(lsetup)}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                          onClick={() => handleDeleteLsetup(lsetup._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Settings;
