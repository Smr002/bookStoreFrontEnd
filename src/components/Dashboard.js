import React, { useEffect, useState } from 'react';
import SalesChart from './SalesChart';
import { getAllBooks } from '../api';

const Dashboard = () => {
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSalesData = async () => {
      setLoading(true);
      try {
        const books = await getAllBooks();
        
       
        const transformedData = books.map(book => ({
          date: book.name, 
          sales: book.noOfSell, 
        }));
        
        setSalesData(transformedData);
      } catch (err) {
        console.error("Failed to fetch sales data:", err);
        setError("Failed to load sales data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchSalesData();
  }, []);

  if (loading) return <div style={{ color: 'white' }}>Loading sales data...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div style={{ padding: '2rem', backgroundColor: '#121212' }}>
      <SalesChart salesData={salesData} />
    </div>
  );
};

export default Dashboard;
