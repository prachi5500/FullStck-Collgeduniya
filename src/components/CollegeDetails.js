import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useColleges } from '../App';

function CollegeDetails() {
  const { id } = useParams();
  const { colleges } = useColleges();
  const college = colleges.find(c => c.id === parseInt(id));

  // USER RATING STATE
  const [userRating, setUserRating] = useState(0)

  if (!college) return <div style={{ textAlign: 'center', padding: '50px' }}>College not found</div>;

  const renderStars = (rating) => {
    return (
      <div style={{ color: '#f39c12', fontSize: '1.5rem' }}>
        {'★'.repeat(rating)}{'☆'.repeat(5 - rating)}
      </div>
    );
  };

  return (
    <div className="college-details" style={{ padding: '20px', maxWidth: '900px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <img src={college.image} alt={college.name} style={{
        width: '100%', height: '300px', objectFit: 'cover', borderRadius: '12px', marginBottom: '20px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
      }}
        onError={(e) => {
          e.target.src = 'https://via.placeholder.com/800x350?text=College+Image+Not+Found';
        }} />
      <h2 style={{ margin: '0 0 10px 0', fontSize: '2.2rem', color: '#2c3e50' }}>{college.name}</h2>

      {/*  */}
      {/* RATING STARS */}
      <div style={{ margin: '10px 0' }}>
        <strong>Rating: </strong>
        {renderStars(college.rating || 0)}
        <span style={{ marginLeft: '10px', fontSize: '1.1rem', color: '#555' }}>
          {college.rating || 0}/5
        </span>
      </div>
      {/*  */}

      {/* USER RATING SECTION */}
      <div style={{
        background: '#f8f9fa',
        padding: '20px',
        borderRadius: '12px',
        margin: '25px 0',
        border: '1px solid #dee2e6'
      }}>
        <h3 style={{ margin: '0 0 15px 0', color: '#2c3e50' }}>Rate this College</h3>
        <p style={{ margin: '0 0 10px 0', color: '#555' }}>Your feedback helps others!</p>

        <div style={{ fontSize: '2rem' }}>
          {[1, 2, 3, 4, 5].map(star => (
            <span
              key={star}
              style={{
                cursor: 'pointer',
                color: star <= userRating ? '#f39c12' : '#ccc',
                transition: 'color 0.2s',
                marginRight: '5px'
              }}
              onClick={() => setUserRating(star)}
              onMouseEnter={(e) => {
                if (!userRating) e.target.style.color = '#f39c12';
              }}
              onMouseLeave={(e) => {
                if (!userRating) e.target.style.color = '#ccc';
              }}
            >
              ★
            </span>
          ))}
        </div>

        {userRating > 0 && (
          <p style={{ margin: '10px 0 0 0', color: '#27ae60', fontWeight: 'bold' }}>
            You rated: {userRating} star{userRating > 1 ? 's' : ''}
          </p>
        )}
      </div>




      <p><strong>Stream:</strong> {college.stream}</p>
      <p><strong>Location:</strong> {college.location}</p>
      <p><strong>Fees:</strong> {college.fees}</p>
      <p><strong>Ranking:</strong> {college.ranking}</p>
      <p><strong>Cutoff:</strong> {college.cutoff}</p>
      <p><strong>Rating:</strong> {college.rating}</p>
      <p><strong>Campus Size:</strong> {college.campusSize}</p>
      <p><strong>Established:</strong> {college.established}</p>
      <p><strong>Students:</strong> {college.students}</p>
      <p><strong>Affiliation:</strong> {college.affiliation}</p>
      <p><strong>Courses:</strong> {college.courses}</p>
      <p><strong>Facilities:</strong> {college.facilities}</p>
      <p><strong>Description:</strong> {college.description}</p>
    </div>
  );
}






export default CollegeDetails;