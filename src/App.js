import React, { useState, useEffect, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CollegeList from './components/CollegeList';
import CollegeDetails from './components/CollegeDetails';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import UserRegister from './components/UserRegister';
import UserLogin from './components/UserLogin';

const CollegeContext = createContext();
const NewsContext = createContext();

// COLLEGE PROVIDER
export const CollegeProvider = ({ children }) => {
  const [colleges, setColleges] = useState(() => {
    const saved = localStorage.getItem('colleges');
    return saved ? JSON.parse(saved) : [
      {
    id: 1,
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
    courses: 'B.Tech, M.Tech, PhD in various engineering fields',
    facilities: 'Hostels, Labs, Library, Sports',
    description: 'Premier engineering institute in India.',
    image: 'https://in.pinterest.com/pin/iit-delhi-wallpaper--276127020897701635/'
  },
  {
    id: 2,
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
    facilities: 'Hospital, Research Labs, Hostels',
    description: 'Top medical college and hospital.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400'
  },
  {
    id: 3,
    name: 'NLS Bangalore',
    stream: 'Law',
    location: 'Bangalore',
    fees: '₹3,00,000/year',
    ranking: 1,
    cutoff: 90,
    rating:4.8,
    campusSize: '23 acres',
    established: 1987,
    students: 600,
    affiliation: 'Bar Council of India',
    courses: 'BA LLB, LLM, PhD in Law',
    facilities: 'Moot Court, Library, Hostels',
    description: 'Leading law school in India.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'
  }
    ];
  });
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  useEffect(() => {
    localStorage.setItem('colleges', JSON.stringify(colleges));
  }, [colleges]);

  const addCollege = (newCollege) => {
    setColleges([...colleges, { 
      ...newCollege, 
      id: Date.now(),
      rating: newCollege.rating || 0  // DEFAULT 0
    }]);
  };

  const editCollege = (updatedCollege) => {
    setColleges(colleges.map(c => 
      c.id === updatedCollege.id 
        ? { ...c, rating: updatedCollege.rating || c.rating || 0 }
        : c
    ));
  };

  // const addCollege = (newCollege) => {
  //   setColleges([...colleges, { ...newCollege, id: colleges.length + 1 }]);
  // };

  // const editCollege = (updatedCollege) => {
  //   setColleges(colleges.map(c => c.id === updatedCollege.id ? updatedCollege : c));
  // };

  const deleteCollege = (id) => {
    setColleges(colleges.filter(c => c.id !== id));
  };
  // 

  // 

  return (
    <CollegeContext.Provider value={{ 
      colleges, addCollege, editCollege, deleteCollege, 
      isAdminLoggedIn, setIsAdminLoggedIn 
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
      { id: 1, title: "🏆 IIT Delhi NIRF Rank 1 Announced!" },
      { id: 2, title: "🎓 NEET 2024 Cutoff Released" },
      { id: 3, title: "📚 JEE Main 2024 Result Out" }
    ];
  });

  useEffect(() => {
    localStorage.setItem('news', JSON.stringify(news));
  }, [news]);

  const addNews = (title) => {
    setNews([...news, { id: Date.now(), title }]);
  };

  const deleteNews = (id) => {
    setNews(news.filter(n => n.id !== id));
  };

  const editNews = (id, title) => {
    setNews(news.map(n => n.id === id ? { ...n, title } : n));
  };

  return (
    <NewsContext.Provider value={{ news, addNews, deleteNews, editNews }}>
      {children}
    </NewsContext.Provider>
  );
};

// HOOKS
export const useColleges = () => useContext(CollegeContext);
export const useNews = () => {
  const context = useContext(NewsContext);
  if (!context) {
    throw new Error('useNews must be used within NewsProvider');
  }
  return context;
};

function App() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <CollegeProvider>
      <NewsProvider> {/* ← THIS WAS MISSING! */}
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
                    <button>🔍</button>
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
                    ☰
                  </span>

                  {/* SMALL MENU */}
                  {showMenu && (
                    <div className="user-menu-container">
                      <Link to="/login" className="menu-item user-login" onClick={() => setShowMenu(false)}>
                        👤 Login as User
                      </Link>
                      <Link to="/admin" className="menu-item admin-login" onClick={() => setShowMenu(false)}>
                        ⚙️ Login as Admin
                      </Link>
                    </div>
                  )}
                </nav>
              </div>

              {/* COURSE NAV */}
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

// // Contexts
// const CollegeContext = createContext();
// const NewsContext = createContext();

// // NEWS PROVIDER
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
//     setNews([...news, { id: Date.now(), title }]);
//   };

//   const deleteNews = (id) => {
//     setNews(news.filter(n => n.id !== id));
//   };

//   const editNews = (id, title) => {
//     setNews(news.map(n => n.id === id ? { ...n, title } : n));
//   };

//   return (
//     <NewsContext.Provider value={{ news, addNews, deleteNews, editNews }}>
//       {children}
//     </NewsContext.Provider>
//   );
// };

// const sampleColleges = [
//   {
//     id: 1,
//     name: 'IIT Delhi',
//     stream: 'Engineering',
//     location: 'Delhi',
//     fees: '₹2,00,000/year',
//     ranking: 1,
//     cutoff: 95,
//     campusSize: '320 acres',
//     established: 1961,
//     students: 8000,
//     affiliation: 'Autonomous',
//     courses: 'B.Tech, M.Tech, PhD in various engineering fields',
//     facilities: 'Hostels, Labs, Library, Sports',
//     description: 'Premier engineering institute in India.',
//     image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400'
//   },
//   {
//     id: 2,
//     name: 'AIIMS',
//     stream: 'Medical',
//     location: 'Delhi',
//     fees: '₹1,000/year',
//     ranking: 1,
//     cutoff: 98,
//     campusSize: '200 acres',
//     established: 1956,
//     students: 5000,
//     affiliation: 'Autonomous',
//     courses: 'MBBS, MD, Nursing',
//     facilities: 'Hospital, Research Labs, Hostels',
//     description: 'Top medical college and hospital.',
//     image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400'
//   },
//   {
//     id: 3,
//     name: 'NLS Bangalore',
//     stream: 'Law',
//     location: 'Bangalore',
//     fees: '₹3,00,000/year',
//     ranking: 1,
//     cutoff: 90,
//     campusSize: '23 acres',
//     established: 1987,
//     students: 600,
//     affiliation: 'Bar Council of India',
//     courses: 'BA LLB, LLM, PhD in Law',
//     facilities: 'Moot Court, Library, Hostels',
//     description: 'Leading law school in India.',
//     image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'
//   }
// ];

// // COLLEGE PROVIDER
// export const CollegeProvider = ({ children }) => {
//   const [colleges, setColleges] = useState(() => {
//     const saved = localStorage.getItem('colleges');
//     return saved ? JSON.parse(saved) : sampleColleges;
//   });
//   const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

//   useEffect(() => {
//     localStorage.setItem('colleges', JSON.stringify(colleges));
//   }, [colleges]);

//   const addCollege = (newCollege) => {
//     setColleges([...colleges, { ...newCollege, id: colleges.length + 1 }]);
//   };

//   const editCollege = (updatedCollege) => {
//     setColleges(colleges.map(c => c.id === updatedCollege.id ? updatedCollege : c));
//   };

//   const deleteCollege = (id) => {
//     setColleges(colleges.filter(c => c.id !== id));
//   };

//   return (
//     <CollegeContext.Provider value={{
//       colleges, addCollege, editCollege, deleteCollege,
//       isAdminLoggedIn, setIsAdminLoggedIn
//     }}>
//       {children}
//     </CollegeContext.Provider>
//   );
// };

// // HOOKS
// export const useColleges = () => useContext(CollegeContext);
// export const useNews = () => useContext(NewsContext);

// function App() {
//   const [showMenu, setShowMenu] = useState(false);

//   const [filterStream, setFilterStream] = useState('');
//   const [filterCity, setFilterCity] = useState('');

//   return (
//     <CollegeProvider>
//       <NewsProvider>
//         <Router>
//           <div className="app">
//             <header>
//               <div className="header-top">
//                 <h1>College Duniya</h1>
//                 <div className="header-left">
//                   <select className="header-dropdown" onChange={(e) => setFilterStream(e.target.value)}>
//                     <option>Select Goal & city</option>
//                     <option value="Engineering">Engineering</option>
//                     <option value="Medical">Medical</option>
//                     <option value="Law">Law</option>
//                     <option value="Commerce">Commerce</option>
//                     <option value="Arts">Arts</option>
//                     <option value="Science">Science</option>
//                     <option value="Management">Management</option>
//                   </select>
//                   <select className="header-dropdown" onChange={(e) => setFilterCity(e.target.value)} style={{ marginLeft: '10px' }}>
//                     <option>Select City</option>
//                     <option value="Delhi">Delhi</option>
//                     <option value="Bangalore">Bangalore</option>
//                     <option value="Mumbai">Mumbai</option>
//                     <option value="Chennai">Chennai</option>
//                     <option value="Kolkata">Kolkata</option>
//                   </select>
//                   <input
//                     type="text"
//                     className="header-search"
//                     placeholder="Search for Colleges, Exams, Courses and More.."
//                   />
//                 </div>
//                 <nav>
//                   <span className="header-review">
//                     ✏️Review <span className="header-reward"></span>
//                   </span>
//                   <select className="header-dropdown">
//                     <option>
//                       Explore</option>
//                   </select>
//                   <span
//                     className="header-icon"
//                     onClick={() => setShowMenu(!showMenu)}
//                   >
//                     ☰
//                   </span>
//                   {/* NEW SMALL MENU CONTAINER */}
//                   {showMenu && (
//                     <div className="user-menu-container">
//                       <Link
//                         to="/login"
//                         className="menu-item user-login"
//                         onClick={() => setShowMenu(false)}
//                       >
//                         👤 Login as User
//                       </Link>
//                       <Link
//                         to="/admin"
//                         className="menu-item admin-login"
//                         onClick={() => setShowMenu(false)}
//                       >
//                         ⚙️ Login as Admin
//                       </Link>
//                     </div>
//                   )}

//                 </nav>
//               </div>

//               {/* Course Navigation */}
//               <div className="course-nav">
//                 <ul>
//                   <li><a href="#" onClick={(e) => { e.preventDefault(); window.location.hash = 'all'; }}>All Courses</a></li>
//                   <li><a href="#" onClick={(e) => { e.preventDefault(); window.location.hash = 'engineering'; }}>B.Tech</a></li>
//                   <li><a href="#" onClick={(e) => { e.preventDefault(); window.location.hash = 'management'; }}>MBA</a></li>
//                   <li><a href="#" onClick={(e) => { e.preventDefault(); window.location.hash = 'mtech'; }}>M.Tech</a></li>
//                   <li><a href="#" onClick={(e) => { e.preventDefault(); window.location.hash = 'medical'; }}>MBBS</a></li>
//                   <li><a href="#" onClick={(e) => { e.preventDefault(); window.location.hash = 'commerce'; }}>B.Com</a></li>
//                   <li><a href="#" onClick={(e) => { e.preventDefault(); window.location.hash = 'science'; }}>B.Sc</a></li>
//                   <li><a href="#" onClick={(e) => { e.preventDefault(); window.location.hash = 'nursing'; }}>B.Sc (Nursing)</a></li>
//                   <li><a href="#" onClick={(e) => { e.preventDefault(); window.location.hash = 'arts'; }}>BA</a></li>
//                   <li><a href="#" onClick={(e) => { e.preventDefault(); window.location.hash = 'bba'; }}>BBA</a></li>
//                   <li><a href="#" onClick={(e) => { e.preventDefault(); window.location.hash = 'bca'; }}>BCA</a></li>
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

