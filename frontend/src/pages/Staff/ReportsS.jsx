import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Myleaves.Scss';
import StaffNav from '../../Components/Nav/staffnav';
import Cookies from 'js-cookie';
import {
  PDFDownloadLink,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
} from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  heading: {
    fontSize: 20,
    marginBottom: 10,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
});

const calculateStatistics = (leaveRequests) => {
  const totalRequests = leaveRequests.length;

  if (totalRequests === 0) {
    return {
      totalRequests: 0,
      annualLeaves: 0,
      officialLeaves: 0,
      casualLeaves: 0,
      averageMaxLeaveDuration: 0,
      minDuration: 0,
      mostRequestsEmployee: 'N/A',
      leastRequestsEmployee: 'N/A',
      maxLeaveDuration: 0,
    };
  }

  const annualLeaves = leaveRequests.filter(
    (request) => request.LType === 'Annual'
  ).length;
  const officialLeaves = leaveRequests.filter(
    (request) => request.LType === 'Official'
  ).length;
  const casualLeaves = leaveRequests.filter(
    (request) => request.LType === 'Casual'
  ).length;
  const maxLeaveDurationSum = leaveRequests.reduce(
    (acc, request) => acc + parseInt(request.Lduration),
    0
  );
  const averageMaxLeaveDuration = maxLeaveDurationSum / leaveRequests.length;
  const minDuration = Math.min(
    ...leaveRequests.map((request) => parseInt(request.Lduration))
  );

  // Calculate which employee requested the most number of leave requests
  const requestCounts = leaveRequests.reduce((acc, request) => {
    acc[request.EmpID] = (acc[request.EmpID] || 0) + 1;
    return acc;
  }, {});
  const mostRequestsEmployeeID = Object.keys(requestCounts).reduce((a, b) =>
    requestCounts[a] > requestCounts[b] ? a : b
  );
  const leastRequestsEmployeeID = Object.keys(requestCounts).reduce((a, b) =>
    requestCounts[a] < requestCounts[b] ? a : b
  );

  // Find the maximum leave duration
  const maxLeaveDuration = Math.max(
    ...leaveRequests.map((request) => parseInt(request.Lduration))
  );

  const statistics = {
    totalRequests,
    annualLeaves,
    officialLeaves,
    casualLeaves,
    averageMaxLeaveDuration,
    minDuration,
    mostRequestsEmployee: mostRequestsEmployeeID,
    leastRequestsEmployee: leastRequestsEmployeeID,
    maxLeaveDuration,
  };

  return statistics;
};

const ReportPDF = ({ leaveRequests }) => {
  const stats = calculateStatistics(leaveRequests);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.heading}>Leave Requests Report</Text>
          {leaveRequests.map((request, index) => (
            <View key={index} style={{ marginBottom: 10 }}>
              <Text style={styles.text}>Name: {request.name}</Text>
              <Text style={styles.text}>Email: {request.Email}</Text>
              <Text style={styles.text}>Contact: {request.Contact}</Text>
              <Text style={styles.text}>
                Designation: {request.Destination}
              </Text>
              <Text style={styles.text}>Leave Date From: {request.LDateF}</Text>
              <Text style={styles.text}>Leave Date To: {request.LdateT}</Text>
              <Text style={styles.text}>Leave Type: {request.LType}</Text>
              <Text style={styles.text}>
                Leave Duration: {request.Lduration} days
              </Text>
              <Text style={styles.text}>Remarks: {request.remarks}</Text>
              <Text style={styles.text}>
                Supervisor Name: {request.Sup_name}
              </Text>
              <Text style={styles.text}>
                Supervisor Designation: {request.Sup_des}
              </Text>
              <Text style={styles.text}>Backup Person: {request.Backup}</Text>
            </View>
          ))}
          <View style={{ marginTop: 20 }}>
            <Text style={styles.heading}>Statistics</Text>
            <Text style={styles.text}>
              Total Requests: {stats.totalRequests}
            </Text>
            <Text style={styles.text}>Annual Leaves: {stats.annualLeaves}</Text>
            <Text style={styles.text}>
              Official Leaves: {stats.officialLeaves}
            </Text>
            <Text style={styles.text}>Casual Leaves: {stats.casualLeaves}</Text>
            <Text style={styles.text}>
              Average Leave Duration: {stats.averageMaxLeaveDuration.toFixed(2)}{' '}
              days
            </Text>
            <Text style={styles.text}>
              Minimum Leave Duration: {stats.minDuration} days
            </Text>
            <Text style={styles.text}>
              Most Requests by Employee: {stats.mostRequestsEmployee}
            </Text>
            <Text style={styles.text}>
              Least Requests by Employee: {stats.leastRequestsEmployee}
            </Text>
            <Text style={styles.text}>
              Maximum Leave Duration: {stats.maxLeaveDuration} days
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

const MyLeaves = () => {
  const userId = Cookies.get('userId');
  const [leaveRequests, setLeaveRequests] = useState([]);


  const fetchLeaveRequests = async () => {
    try {
      const response = await axios.get('http://localhost:8175/Leave/');
      setLeaveRequests(response.data);
    } catch (error) {
      console.error('Error fetching leave requests:', error);
    }
  };

  useEffect(() => {
    fetchLeaveRequests();
  }, []);



  const filteredLeaveRequests = leaveRequests.filter(
    (request) => request.EmpID === userId
  );

  return (
    <>
      <StaffNav />
      <div className="table-container mr-5 ml-48 mt-20">
        <div className="ml-48 mt-20 mb-5">
          <PDFDownloadLink
            document={<ReportPDF leaveRequests={filteredLeaveRequests} />}
            fileName="LeaveRequestsReport.pdf"
          >
            {({ loading }) =>
              loading ? (
                <button className="bg-blue-500 text-white py-2 px-4 rounded">
                  Loading Report...
                </button>
              ) : (
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Download Report
                </button>
              )
            }
          </PDFDownloadLink>
        </div>
        
      </div>
    </>
  );
};

export default MyLeaves;