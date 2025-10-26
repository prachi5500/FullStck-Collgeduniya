
import React, { useState, useEffect, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CollegeList from './components/CollegeList';
import CollegeDetails from './components/CollegeDetails';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import UserRegister from './components/UserRegister';
import UserLogin from './components/UserLogin';
import axios from 'axios';

const API_URL = 'http://localhost:5001';
const CollegeContext = createContext();
const NewsContext = createContext();

// SAMPLE COLLEGES (Fallback)
const sampleColleges = [
  {
    _id: 'fallback1',
    name: 'IIT Delhi',
    stream: 'Engineering',
    location: 'Delhi',
    fees: '₹2,00,000/year',
    ranking: 1,
    cutoff: 95,
    rating: 5,
    campusSize: '320 acres',
    established: 1961,
    students: 8000,
    affiliation: 'Autonomous',
    courses: 'B.Tech, M.Tech, PhD',
    facilities: 'Hostels, Labs, Library',
    description: 'Premier engineering institute.',
    image: 'https://in.pinterest.com/pin/iit-delhi-wallpaper--276127020897701635/'
  },
  {
    _id: 'fallback2',
    name: 'AIIMS',
    stream: 'Medical',
    location: 'Delhi',
    fees: '₹1,000/year',
    ranking: 1,
    cutoff: 98,
    rating: 4.9,
    campusSize: '200 acres',
    established: 1956,
    students: 5000,
    affiliation: 'Autonomous',
    courses: 'MBBS, MD, Nursing',
    facilities: 'Hospital, Labs',
    description: 'Top medical college.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400'
  },
  {
    _id: 'fallback3',
    name: 'NLS Bangalore',
    stream: 'Law',
    location: 'Bangalore',
    fees: '₹3,00,000/year',
    ranking: 1,
    cutoff: 90,
    rating: 4.8,
    campusSize: '23 acres',
    established: 1987,
    students: 600,
    affiliation: 'Bar Council of India',
    courses: 'BA LLB, LLM',
    facilities: 'Moot Court, Library',
    description: 'Leading law school.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'
  }
];

// COLLEGE PROVIDER
// export const CollegeProvider = ({ children }) => {
//   const [colleges, setColleges] = useState([]);
//   const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

//   useEffect(() => {
//     const fetchColleges = async () => {
//       try {
//         const res = await axios.get(`${API_URL}/colleges`);
//         setColleges(res.data);
//       } catch (error) {
//         console.error('Fetch Error:', error.message);
//         const saved = localStorage.getItem('colleges');
//         setColleges(saved ? JSON.parse(saved) : sampleColleges);
//       }
//     };
//     fetchColleges();
//   }, []);
export const CollegeProvider = ({ children }) => {
  const [colleges, setColleges] = useState([]);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); // ⬅️ Ye add karo

  useEffect(() => {
    const fetchColleges = async () => {
      setLoading(true); // ⬅️ Start loading
      try {
        const res = await axios.get(`${API_URL}/colleges`);
        setColleges(res.data);
      } catch (error) {
        console.error('Fetch Error:', error.message);
        const saved = localStorage.getItem('colleges');
        setColleges(saved ? JSON.parse(saved) : sampleColleges);
      } finally {
        setLoading(false); // ⬅️ Stop loading
      }
    };
    fetchColleges();
  }, []);




  useEffect(() => {
    localStorage.setItem('colleges', JSON.stringify(colleges));
  }, [colleges]);

  const addCollege = async (collegeData) => {
    try {
      const { id, _id, ...data } = collegeData;
      const res = await axios.post(`${API_URL}/colleges`, data);
      setColleges(prev => [...prev, res.data]);
    } catch (error) {
      console.error('ADD ERROR:', error.response?.data || error.message);
      alert('Failed to add college!');
    }
  };

  const editCollege = async (updatedCollege) => {
    try {
      const id = updatedCollege._id || updatedCollege.id;
      await axios.put(`${API_URL}/colleges/${id}`, updatedCollege);
      setColleges(prev => prev.map(c => c._id === id ? updatedCollege : c));
    } catch (error) {
      console.error('EDIT ERROR:', error.response?.data || error.message);
      alert('Failed to edit college!');
    }
  };

  const deleteCollege = async (id) => {
    if (window.confirm('Delete this college?')) {
      try {
        await axios.delete(`${API_URL}/colleges/${id}`);
        setColleges(prev => prev.filter(c => c._id !== id));
      } catch (error) {
        console.error('DELETE ERROR:', error.response?.data || error.message);
        alert('Failed to delete!');
      }
    }
  };

  return (
    <CollegeContext.Provider value={{
      colleges, addCollege, editCollege, deleteCollege,
      isAdminLoggedIn, setIsAdminLoggedIn
      // 
      , loading // ⬅️ Ye bhi provide karo
    }}>
      {children}
    </CollegeContext.Provider>
  );
};

// NEWS PROVIDER
export const NewsProvider = ({ children }) => {
  const [news, setNews] = useState(() => {
    const saved = localStorage.getItem('news');
    return saved ? JSON.parse(saved) : [
      { id: 1, title: "IIT Delhi NIRF Rank 1 Announced!" },
      { id: 2, title: "NEET 2024 Cutoff Released" },
      { id: 3, title: "JEE Main 2024 Result Out" }
    ];
  });

  useEffect(() => {
    localStorage.setItem('news', JSON.stringify(news));
  }, [news]);

  const addNews = (title) => {
    setNews(prev => [...prev, { id: Date.now(), title }]);
  };

  const deleteNews = (id) => {
    setNews(prev => prev.filter(n => n.id !== id));
  };

  const editNews = (id, title) => {
    setNews(prev => prev.map(n => n.id === id ? { ...n, title } : n));
  };

  return (
    <NewsContext.Provider value={{ news, addNews, deleteNews, editNews }}>
      {children }
    </NewsContext.Provider>
  );
};

// HOOKS
export const useColleges = () => useContext(CollegeContext);
export const useNews = () => useContext(NewsContext);

function App() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <CollegeProvider>
      <NewsProvider>
        <Router>
          <div className="app">
            <header>
              <div className="header-top">
                <h1 className="header-logo">College Duniya</h1>
                <div className="header-search-section">
                  <select className="header-goal-dropdown">
                    <option>Select Goal & City</option>
                  </select>
                  <div className="header-main-search">
                    <input type="text" placeholder="Search for Colleges, Exams, Courses and More.." />
                    <button>Search</button>
                  </div>
                </div>
                <nav>
                  <span className="header-write-review">
                    Review <span className="header-reward"></span>
                  </span>
                  <select className="header-explore">
                    <option>Explore</option>
                  </select>
                  <span className="header-menu" onClick={() => setShowMenu(!showMenu)}>
                    Menu
                  </span>

                  {showMenu && (
                    <div className="user-menu-container">
                      <Link to="/login" className="menu-item user-login" onClick={() => setShowMenu(false)}>
                        Login as User
                      </Link>
                      <Link to="/admin" className="menu-item admin-login" onClick={() => setShowMenu(false)}>
                        Login as Admin
                      </Link>
                    </div>
                  )}
                </nav>
              </div>

              <div className="course-nav">
                <ul>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); window.location.hash = 'all'; }}>All Courses</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); window.location.hash = 'engineering'; }}>B.Tech</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); window.location.hash = 'management'; }}>MBA</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); window.location.hash = 'mtech'; }}>M.Tech</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); window.location.hash = 'medical'; }}>MBBS</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); window.location.hash = 'commerce'; }}>B.Com</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); window.location.hash = 'science'; }}>B.Sc</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); window.location.hash = 'nursing'; }}>B.Sc (Nursing)</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); window.location.hash = 'arts'; }}>BA</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); window.location.hash = 'bba'; }}>BBA</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); window.location.hash = 'bca'; }}>BCA</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); window.location.hash = 'bams'; }}>BAMS</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); window.location.hash = 'bhms'; }}>BHMS</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); window.location.hash = 'barch'; }}>B.ARCH</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); window.location.hash = 'agri'; }}>BSC (Agriculture)</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); window.location.hash = 'llb'; }}>LLB</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); window.location.hash = 'ballb'; }}>BA LLB</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); window.location.hash = 'bped'; }}>BPED</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); window.location.hash = 'bed'; }}>BED</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); window.location.hash = 'bfa'; }}>BFA</a></li>
                </ul>
              </div>
            </header>

            <main>
              <Routes>
                <Route path="/" element={<CollegeList />} />
                <Route path="/college/:id" element={<CollegeDetails />} />
                <Route path="/admin" element={<AdminLogin />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/register" element={<UserRegister />} />
                <Route path="/login" element={<UserLogin />} />
              </Routes>
            </main>
          </div>
        </Router>
      </NewsProvider>
    </CollegeProvider>
  );
}

export default App;



// import React, { useState, useEffect, createContext, useContext } from 'react';
// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import CollegeList from './components/CollegeList';
// import CollegeDetails from './components/CollegeDetails';
// import AdminLogin from './components/AdminLogin';
// import AdminDashboard from './components/AdminDashboard';
// import UserRegister from './components/UserRegister';
// import UserLogin from './components/UserLogin';
// import axios from 'axios';

// const API_URL = 'http://localhost:5001';
// const CollegeContext = createContext();
// const NewsContext = createContext();

// // SAMPLE COLLEGES (Fallback only)
// const sampleColleges = [
//   {
//     _id: 'fallback1',
//     name: 'IIT Delhi',
//     stream: 'Engineering',
//     location: 'Delhi',
//     fees: '₹2,00,000/year',
//     ranking: 1,
//     cutoff: 95,
//     rating: 4.5,
//     campusSize: '320 acres',
//     established: 1961,
//     students: 8000,
//     affiliation: 'Autonomous',
//     courses: 'B.Tech, M.Tech, PhD',
//     facilities: 'Hostels, Labs, Library',
//     description: 'Premier engineering institute.',
//     image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400'
//   }
// ];

// // SINGLE COLLEGE PROVIDER (Fixed)
// export const CollegeProvider = ({ children }) => {
//   const [colleges, setColleges] = useState([]);
//   const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
//   const [loading, setLoading] = useState(true);

//   // Fetch colleges from API - ONLY ONCE
//   useEffect(() => {
//     const fetchColleges = async () => {
//       try {
//         setLoading(true);
//         console.log('🔄 Fetching colleges from:', `${API_URL}/colleges`);
//         const response = await axios.get(`${API_URL}/colleges`);
//         console.log('✅ Colleges fetched:', response.data.length);
//         setColleges(response.data);
//       } catch (error) {
//         console.error('❌ Error fetching colleges:', error.message);
//         // Use localStorage as fallback, not sample data
//         const saved = localStorage.getItem('colleges');
//         if (saved && JSON.parse(saved).length > 0) {
//           setColleges(JSON.parse(saved));
//         } else {
//           setColleges(sampleColleges);
//         }
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchColleges();
//   }, []);

//   // Save to localStorage ONLY when colleges change from user actions
//   useEffect(() => {
//     if (colleges.length > 0 && !colleges.every(c => c._id?.startsWith('fallback'))) {
//       localStorage.setItem('colleges', JSON.stringify(colleges));
//     }
//   }, [colleges]);

//   // ADD COLLEGE - FIXED
//   const addCollege = async (collegeData) => {
//     try {
//       console.log('📤 Adding college:', collegeData);
      
//       // Send exactly what backend expects - NO FIELD STRIPPING
//       const response = await axios.post(`${API_URL}/colleges`, collegeData);
//       console.log('✅ College added successfully:', response.data);
      
//       // Update state with the college returned from backend (includes _id)
//       const newCollege = response.data;
//       setColleges(prev => [...prev, newCollege]);
      
//       alert('🎉 College added successfully!');
//       return newCollege;
//     } catch (error) {
//       console.error('❌ Error adding college:', error.response?.data || error.message);
//       alert(`Failed to add college: ${error.response?.data?.error || error.message}`);
//       throw error;
//     }
//   };

//   // EDIT COLLEGE - FIXED
//   const editCollege = async (collegeData) => {
//     try {
//       const id = collegeData._id;
//       if (!id) throw new Error('College ID is required for editing');
      
//       console.log('✏️ Editing college:', collegeData);
//       await axios.put(`${API_URL}/colleges/${id}`, collegeData);
      
//       // Update local state
//       setColleges(prev => prev.map(college => 
//         college._id === id ? { ...college, ...collegeData } : college
//       ));
      
//       alert('✅ College updated successfully!');
//     } catch (error) {
//       console.error('❌ Error updating college:', error);
//       alert('Failed to update college');
//       throw error;
//     }
//   };

//   // DELETE COLLEGE - FIXED
//   const deleteCollege = async (id) => {
//     if (!window.confirm('Are you sure you want to delete this college?')) return;
    
//     try {
//       console.log('🗑️ Deleting college:', id);
//       await axios.delete(`${API_URL}/colleges/${id}`);
      
//       setColleges(prev => prev.filter(college => college._id !== id));
//       alert('✅ College deleted successfully!');
//     } catch (error) {
//       console.error('❌ Error deleting college:', error);
//       alert('Failed to delete college');
//       throw error;
//     }
//   };

//   const value = {
//     colleges,
//     addCollege,
//     editCollege,
//     deleteCollege,
//     isAdminLoggedIn,
//     setIsAdminLoggedIn,
//     loading
//   };

//   return (
//     <CollegeContext.Provider value={value}>
//       {children}
//     </CollegeContext.Provider>
//   );
// };

// // SINGLE NEWS PROVIDER (Fixed)
// export const NewsProvider = ({ children }) => {
//   const [news, setNews] = useState(() => {
//     const saved = localStorage.getItem('news');
//     return saved ? JSON.parse(saved) : [
//       { id: 1, title: "🏆 IIT Delhi NIRF Rank 1 Announced!" },
//       { id: 2, title: "🎓 NEET 2024 Cutoff Released" },
//       { id: 3, title: "📚 JEE Main 2024 Result Out" }
//     ];
//   });

//   useEffect(() => {
//     localStorage.setItem('news', JSON.stringify(news));
//   }, [news]);

//   const addNews = (title) => {
//     const newItem = { id: Date.now(), title: title.trim() };
//     setNews(prev => [...prev, newItem]);
//   };

//   const deleteNews = (id) => {
//     setNews(prev => prev.filter(n => n.id !== id));
//   };

//   const editNews = (id, title) => {
//     setNews(prev => prev.map(n => n.id === id ? { ...n, title: title.trim() } : n));
//   };

//   return (
//     <NewsContext.Provider value={{ news, addNews, deleteNews, editNews }}>
//       {children}
//     </NewsContext.Provider>
//   );
// };

// // HOOKS
// export const useColleges = () => {
//   const context = useContext(CollegeContext);
//   if (!context) {
//     throw new Error('useColleges must be used within CollegeProvider');
//   }
//   return context;
// };

// export const useNews = () => {
//   const context = useContext(NewsContext);
//   if (!context) {
//     throw new Error('useNews must be used within NewsProvider');
//   }
//   return context;
// };

// // MAIN APP COMPONENT
// function App() {
//   const [showMenu, setShowMenu] = useState(false);

//   return (
//     <CollegeProvider>
//       <NewsProvider>
//         <Router>
//           <div className="app">
//             <header>
//               <div className="header-top">
//                 <h1 className="header-logo">College Duniya</h1>
//                 <div className="header-search-section">
//                   <select className="header-goal-dropdown">
//                     <option>Select Goal & City</option>
//                   </select>
//                   <div className="header-main-search">
//                     <input type="text" placeholder="Search for Colleges, Exams, Courses and More.." />
//                     <button>🔍</button>
//                   </div>
//                 </div>
//                 <nav>
//                   <span className="header-write-review">Review</span>
//                   <select className="header-explore">
//                     <option>Explore</option>
//                   </select>
//                   <span className="header-menu" onClick={() => setShowMenu(!showMenu)}>
//                     ☰
//                   </span>

//                   {showMenu && (
//                     <div className="user-menu-container">
//                       <Link to="/login" className="menu-item user-login" onClick={() => setShowMenu(false)}>
//                         👤 Login as User
//                       </Link>
//                       <Link to="/admin" className="menu-item admin-login" onClick={() => setShowMenu(false)}>
//                         ⚙️ Login as Admin
//                       </Link>
//                     </div>
//                   )}
//                 </nav>
//               </div>

//               {/* COURSE NAV */}
//               <div className="course-nav">
//                 <ul>
//                   <li><a href="#all" onClick={(e) => e.preventDefault()}>All Courses</a></li>
//                   <li><a href="#engineering" onClick={(e) => e.preventDefault()}>B.Tech</a></li>
//                   <li><a href="#management" onClick={(e) => e.preventDefault()}>MBA</a></li>
//                   <li><a href="#medical" onClick={(e) => e.preventDefault()}>MBBS</a></li>
//                   <li><a href="#commerce" onClick={(e) => e.preventDefault()}>B.Com</a></li>
//                   <li><a href="#science" onClick={(e) => e.preventDefault()}>B.Sc</a></li>
//                   <li><a href="#arts" onClick={(e) => e.preventDefault()}>BA</a></li>
//                   <li><a href="#law" onClick={(e) => e.preventDefault()}>LLB</a></li>
//                 </ul>
//               </div>
//             </header>

//             <main>
//               <Routes>
//                 <Route path="/" element={<CollegeList />} />
//                 <Route path="/college/:id" element={<CollegeDetails />} />
//                 <Route path="/admin" element={<AdminLogin />} />
//                 <Route path="/admin/dashboard" element={<AdminDashboard />} />
//                 <Route path="/register" element={<UserRegister />} />
//                 <Route path="/login" element={<UserLogin />} />
//               </Routes>
//             </main>
//           </div>
//         </Router>
//       </NewsProvider>
//     </CollegeProvider>
//   );
// }

// export default App;