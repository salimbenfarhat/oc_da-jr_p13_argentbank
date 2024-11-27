// src/pages/Dashboard/index.jsx
import React from 'react';
import '../Dashboard/index.scss';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

function Dashboard() {
  return (
    <>
    <Header />
    <div className="dashboard-container">
      <h1>This is a dashboard</h1>
    </div>
    <Footer />
    </>
  );
}

export default Dashboard;