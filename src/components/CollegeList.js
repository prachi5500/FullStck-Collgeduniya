import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useColleges } from '../App';
import { useNews } from '../App';

function CollegeList() {
  const { colleges } = useColleges();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStream, setFilterStream] = useState('');

  // const [filterCity, setFilterCity] = useState('');

  // Inside CollegeList Component
  const { news } = useNews();

  // Carousel images
  const images = [
    'https://images.unsplash.com/photo-1599634874901-e919c4fe1400?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aWl0JTIwcm9vcmtlZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600',
    'https://images.unsplash.com/photo-1700989101178-e87b2f45dec7?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGpudSUyMHVuaXZlcnNpdHl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600',
    'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1400'
  ];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Hash change for course nav
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      const streamMap = {
        'engineering': 'Engineering', 'management': 'Management',
        'medical': 'Medical', 'commerce': 'Commerce',
        'science': 'Science', 'arts': 'Arts', 'law': 'Law'
      };
      setFilterStream(streamMap[hash] || '');
    };
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  // Stream data with icons
  const streams = [
    { name: 'Engineering', icon: '👷', count: colleges.filter(c => c.stream === 'Engineering').length, subs: 'BE/B.Tech' },
    { name: 'Management', icon: '📊', count: colleges.filter(c => c.stream === 'Management').length, subs: 'MBA/PGDM' },
    { name: 'Commerce', icon: '💰', count: colleges.filter(c => c.stream === 'Commerce').length, subs: 'B.Com' },
    { name: 'Arts', icon: '🎨', count: colleges.filter(c => c.stream === 'Arts').length, subs: 'BA' },
    { name: 'Medical', icon: '🩺', count: colleges.filter(c => c.stream === 'Medical').length, subs: 'MBBS' },
    { name: 'Law', icon: '⚖️', count: colleges.filter(c => c.stream === 'Law').length, subs: 'LLB' },
    { name: 'Science', icon: '🔬', count: colleges.filter(c => c.stream === 'Science').length, subs: 'B.Sc' }
  ];

  const filteredColleges = colleges.filter(c =>
    (c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.location.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (!filterStream || c.stream === filterStream)
    // 
    // (filterCity ? c.location === filterCity : true)
  );

  const handleStreamClick = (stream) => {
    setFilterStream(stream);
    window.location.hash = stream.toLowerCase();
  };

  return (
    <div>
      {/* HERO SECTION */}
      <div
        className="hero-section"
        style={{ backgroundImage: `url(${images[currentImageIndex]})` }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">Find Over 25000 Colleges in India</h1>
          <div className="hero-search-box">
            <input
              type="text"
              className="hero-search-input"
              placeholder="Search for colleges, exams, courses and more..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            <button className="hero-search-btn">Search</button>
          </div>
          <button className="hero-counsel-btn">Need Counselling</button>



          <div className="news-marquee">
            <div className="marquee-content">
              {news.map(item => (
                <span key={item.id} className="marquee-item">
                  {item.title}
                </span>
              ))}
            </div>
          </div>

          <div className="hero-slider-indicator">
            {currentImageIndex + 1}/{images.length}
          </div>
        </div>
      </div>

      {/* STUDY GOAL SECTION */}
      <section className="study-goal-section">
        <h2 className="study-goal-title">Select Your Study Goal</h2>
        <div className="study-goal-cards">
          {streams.map(stream => (
            <div
              key={stream.name}
              className="study-goal-card"
              onClick={() => handleStreamClick(stream.name)}
            >
              <span className="study-goal-icon">{stream.icon}</span>
              <h3 className="study-goal-name">{stream.name}</h3>
              <p className="study-goal-count">{stream.count} Colleges</p>
              <p className="study-goal-sub">{stream.subs}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SEARCH FILTER */}
      <div className="search-section">
        <input
          type="text"
          className="search-input"
          placeholder="Search by name or location"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <select
          className="filter-select"
          value={filterStream}
          onChange={e => setFilterStream(e.target.value)}
        >
          <option value="">All Streams</option>
          {streams.map(s => (
            <option key={s.name} value={s.name}>{s.name}</option>
          ))}
        </select>
      </div>

      {/* COLLEGE LIST */}
      {filteredColleges.length === 0 ? (
        <div className="empty-state">
          <h3>No colleges found</h3>
          <p>Try adjusting your search or filter</p>
        </div>
      ) : (
        <div className="college-list">
          {filteredColleges.map(college => (
            <div key={college.id} className="college-card">
              <img src={college.image} alt={college.name}
                style={{
                  width: '100%',
                  height: '180px',
                  objectFit: 'cover',
                  borderRadius: '12px',
                  marginBottom: '10px'
                }}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/300x180?text=No+Image'; // fallback
                }} />
              <div className="card-content">
                <span className={`stream-badge stream-${college.stream.toLowerCase()}`}>
                  {college.stream}
                </span>
                <h3>{college.name}</h3>
                <p>Location: {college.location}</p>
                <p>Fees: {college.fees}</p>
                <div>
                  {'★'.repeat(college.rating || 0)}{'☆'.repeat(5 - (college.rating || 0))}
                </div>
                <Link to={`/college/${college.id}`}>
                  <button className="view-details-btn">View Details</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CollegeList;