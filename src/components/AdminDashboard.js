// import React, { useState } from 'react';
// import { useColleges } from '../App';
// import { useNavigate } from 'react-router-dom';
// import { useNews } from '../App';


// function AdminDashboard() {
//   const { colleges, addCollege, editCollege, deleteCollege, isAdminLoggedIn, setIsAdminLoggedIn } = useColleges();
//   const [editingId, setEditingId] = useState(null);
//   const [formData, setFormData] = useState({
//     name: '', stream: '', location: '', fees: '', ranking: '', cutoff: '',
//     campusSize: '', established: '', students: '', affiliation: '',
//     courses: '', facilities: '', description: '', image: ''
//   });
//   const navigate = useNavigate();

//   if (!isAdminLoggedIn) {
//     navigate('/admin');
//     return null;
//   }

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (editingId) {
//       editCollege({ ...formData, id: editingId });
//       setEditingId(null);
//     } else {
//       addCollege(formData);
//     }
//     setFormData({
//       name: '', stream: '', location: '', fees: '', ranking: '', cutoff: '',
//       campusSize: '', established: '', students: '', affiliation: '',
//       courses: '', facilities: '', description: '', image: ''
//     });
//   };

//   const startEdit = (college) => {
//     setEditingId(college.id);
//     setFormData(college);
//   };

//   const logout = () => {
//     setIsAdminLoggedIn(false);
//     navigate('/');
//   };



// // marquee news
// function AdminDashboard() {
//   const { news, addNews, deleteNews, editNews } = useNews();
//   const [newNews, setNewNews] = useState('');
//   const [editingId, setEditingId] = useState(null);
//   const [editTitle, setEditTitle] = useState('');

//   const handleAddNews = () => {
//     if (newNews.trim()) {
//       addNews(newNews);
//       setNewNews('');
//     }
//   };

//   const handleDelete = (id) => {
//     if (window.confirm('Delete this news?')) {
//       deleteNews(id);
//     }
//   };

//   const handleEdit = (id, title) => {
//     setEditingId(id);
//     setEditTitle(title);
//   };

//   const handleSaveEdit = () => {
//     editNews(editingId, editTitle);
//     setEditingId(null);
//     setEditTitle('');
//   };




//   return (
//     <div>
//       <h2>Admin Dashboard</h2>
//       <button onClick={logout}>Logout</button>
//       <form onSubmit={handleSubmit}>
//         <input name="name" placeholder="College Name" value={formData.name} onChange={handleChange} required />
//         <select name="stream" value={formData.stream} onChange={handleChange} required>
//   <option value="">Select Stream</option>
//   <option value="Engineering">Engineering</option>
//   <option value="Medical">Medical</option>
//   <option value="Law">Law</option>
//   <option value="Management">Management</option>
//   <option value="Commerce">Commerce</option>
//   <option value="Arts">Arts</option>
//   <option value="Science">Science</option>
// </select>

//         <input name="location" placeholder="Location" value={formData.location} onChange={handleChange} required />
//         <input name="fees" placeholder="Fees" value={formData.fees} onChange={handleChange} />
//         <input name="ranking" placeholder="Ranking" value={formData.ranking} onChange={handleChange} />
//         <input name="cutoff" placeholder="Cutoff" value={formData.cutoff} onChange={handleChange} />
//         <input name="campusSize" placeholder="Campus Size" value={formData.campusSize} onChange={handleChange} />
//         <input name="established" placeholder="Established Year" value={formData.established} onChange={handleChange} />
//         <input name="students" placeholder="Number of Students" value={formData.students} onChange={handleChange} />
//         <input name="affiliation" placeholder="Affiliation" value={formData.affiliation} onChange={handleChange} />
//         <input name="courses" placeholder="Courses Offered" value={formData.courses} onChange={handleChange} />
//         <input name="facilities" placeholder="Facilities" value={formData.facilities} onChange={handleChange} />
//         <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} />
//         <input name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} />
//         <button type="submit">{editingId ? 'Update' : 'Add'} College</button>
//       </form>
//       <h3>College List</h3>
//       <ul>
//         {colleges.map(c => (
//           <li key={c.id}>
//             {c.name}
//             <button onClick={() => startEdit(c)}>Edit</button>
//             <button onClick={() => deleteCollege(c.id)}>Delete</button>
//           </li>
//         ))}
//       </ul>

//     </div>
//   );


//     {/* NEW NEWS SECTION */}
//       <div className="admin-section">
//         <h3>📰 News Management</h3>
        
//         {/* ADD NEWS */}
//         <div className="form-group">
//           <input 
//             type="text" 
//             placeholder="Add New News (e.g., IIT Rank 1)" 
//             value={newNews} 
//             onChange={e => setNewNews(e.target.value)}
//             className="admin-input"
//           />
//           <button onClick={handleAddNews} className="admin-submit-btn">Add News</button>
//         </div>

//         {/* NEWS LIST */}
//         <div className="news-list">
//           {news.map(item => (
//             <div key={item.id} className="news-item">
//               {editingId === item.id ? (
//                 <>
//                   <input 
//                     value={editTitle} 
//                     onChange={e => setEditTitle(e.target.value)}
//                     className="admin-input small"
//                   />
//                   <button onClick={handleSaveEdit} className="btn-small">Save</button>
//                 </>
//               ) : (
//                 <>
//                   <span>{item.title}</span>
//                   <button 
//                     onClick={() => handleEdit(item.id, item.title)} 
//                     className="btn-small edit"
//                   >
//                     ✏️
//                   </button>
//                   <button 
//                     onClick={() => handleDelete(item.id)} 
//                     className="btn-small delete"
//                   >
//                     🗑️
//                   </button>
//                 </>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//   //  </div>
//   // );

// };
// }

// export default AdminDashboard;


import React, { useState } from 'react';
// import { useColleges } from '../App';
import { useNavigate } from 'react-router-dom';
import { useColleges, useNews } from '../App';  // ADD useNews


function AdminDashboard() {
  const { 
    colleges, 
    addCollege, 
    editCollege, 
    deleteCollege, 
    setIsAdminLoggedIn 
  } = useColleges();
  
  // const navigate = useNavigate();
    // NEWS STATE
  const { news, addNews, deleteNews, editNews } = useNews();
  const [newNews, setNewNews] = useState('');
  const [editingNewsId, setEditingNewsId] = useState(null);
  const [editNewsText, setEditNewsText] = useState('');

    // ADD NEWS
  const handleAddNews = () => {
    if (newNews.trim()) {
      addNews(newNews.trim());
      setNewNews('');
    }
  };

  // START EDIT
  const startNewsEdit = (item) => {
    setEditingNewsId(item.id);
    setEditNewsText(item.title);
  };

  // SAVE EDIT
  const handleSaveEdit = () => {
    if (editNewsText.trim()) {
      editNews(editingNewsId, editNewsText.trim());
      setEditingNewsId(null);
      setEditNewsText('');
    }
  };

  // DELETE NEWS
  const handleDeleteNews = (id) => {
    if (window.confirm('Delete this news?')) {
      deleteNews(id);
    }
  };


const navigate = useNavigate();

  // Form State
  const [form, setForm] = useState({
    name: '',
    stream: '',
    location: '',
    fees: '',
    ranking: '',
    cutoff: '',
    
    campusSize: '',
    established: '',
    students: '',
    affiliation: '',
    courses: '',
    facilities: '',
    description: '',
    image: '',
    

  });

  // Edit Mode
  const [editingId, setEditingId] = useState(null);

  // Handle Add
  const handleAdd = (e) => {
    e.preventDefault();
    const newCollege = { ...form, id: Date.now() };
    addCollege(newCollege);
    resetForm();
  };

  // Handle Edit Start
  const startEdit = (college) => {
    setEditingId(college.id);
    setForm(college);
  };

  // Handle Update
  const handleUpdate = (e) => {
    e.preventDefault();
    editCollege(form);
    resetForm();
    setEditingId(null);
  };

  // Reset Form
  const resetForm = () => {
    setForm({
      name: '', stream: '', location: '', fees: '', ranking: '', cutoff: '',
      campusSize: '', established: '', students: '', affiliation: '',
      courses: '', facilities: '', description: '', image: ''
    });
  };

  // Handle Delete
  const handleDelete = (id) => {
    if (window.confirm('Delete this college?')) {
      deleteCollege(id);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Admin Dashboard</h2>
        <button 
          onClick={() => {
            setIsAdminLoggedIn(false);
            navigate('/admin');
          }}
          style={{ padding: '8px 16px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px' }}
        >
          Logout
        </button>
      </div>

      {/* ADD / EDIT FORM */}
      <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px', marginBottom: '30px' }}>
        <h3>{editingId ? 'Edit College' : 'Add New College'}</h3>
        <form onSubmit={editingId ? handleUpdate : handleAdd} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <input placeholder="Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
          <input placeholder="Stream (e.g., Engineering)" value={form.stream} onChange={e => setForm({...form, stream: e.target.value})} required />
          <input placeholder="Location" value={form.location} onChange={e => setForm({...form, location: e.target.value})} required />
          <input placeholder="Fees" value={form.fees} onChange={e => setForm({...form, fees: e.target.value})} />
          <input placeholder="Ranking" value={form.ranking} onChange={e => setForm({...form, ranking: e.target.value})} />
          <input placeholder="Cutoff %" value={form.cutoff} onChange={e => setForm({...form, cutoff: e.target.value})} />
          <input placeholder="Campus Size" value={form.campusSize} onChange={e => setForm({...form, campusSize: e.target.value})} />
          <input placeholder="Established Year" value={form.established} onChange={e => setForm({...form, established: e.target.value})} />
          <input placeholder="No. of Students" value={form.students} onChange={e => setForm({...form, students: e.target.value})} />
          <input placeholder="Affiliation" value={form.affiliation} onChange={e => setForm({...form, affiliation: e.target.value})} />
          <input placeholder="Courses" value={form.courses} onChange={e => setForm({...form, courses: e.target.value})} />
          <input placeholder="Facilities" value={form.facilities} onChange={e => setForm({...form, facilities: e.target.value})} />
          <textarea placeholder="Description" value={form.description} onChange={e => setForm({...form, description: e.target.value})} rows="2" style={{ gridColumn: '1 / -1' }} />
          <input placeholder="Image URL" value={form.image} onChange={e => setForm({...form, image: e.target.value})} style={{ gridColumn: '1 / -1' }} />
          <input 
  placeholder="Rating (1-5)" 
  type="number" 
  min="1" 
  max="5" 
  value={form.rating || ''} 
  onChange={e => setForm({...form, rating: parseInt(e.target.value) || 0})} 
  style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
/>


          <div style={{ gridColumn: '1 / -1', display: 'flex', gap: '10px' }}>
            <button type="submit" style={{ background: editingId ? '#28a745' : '#007bff', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '4px' }}>
              {editingId ? 'Update College' : 'Add College'}
            </button>
            {editingId && (
              <button type="button" onClick={() => { setEditingId(null); resetForm(); }} style={{ background: '#6c757d', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '4px' }}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* COLLEGE LIST */}
      <h3>All Colleges ({colleges.length})</h3>
      <div style={{ display: 'grid', gap: '15px' }}>
        {colleges.map(college => (
          <div key={college.id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px', background: '#fff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <strong>{college.name}</strong> - {college.stream} - {college.location}
                <div style={{ fontSize: '0.9rem', color: '#555', marginTop: '5px' }}>
                  Fees: {college.fees} | Ranking: #{college.ranking} | Cutoff: {college.cutoff}%
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={() => startEdit(college)} style={{ background: '#ffc107', color: 'black', padding: '5px 10px', border: 'none', borderRadius: '4px', fontSize: '0.9rem' }}>
                  Edit
                </button>
                <button onClick={() => handleDelete(college.id)} style={{ background: '#dc3545', color: 'white', padding: '5px 10px', border: 'none', borderRadius: '4px', fontSize: '0.9rem' }}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
        {/*  */}
              {/* ==================== NEWS MANAGEMENT ==================== */}
      <div style={{ marginTop: '40px', background: '#f0f8ff', padding: '20px', borderRadius: '8px' }}>
        <h3 style={{ color: '#ff6b35' }}>News Marquee Management</h3>

        {/* ADD NEW NEWS */}
        <div style={{ marginBottom: '15px' }}>
          <input
            type="text"
            placeholder="Enter new news (e.g., JEE Main 2025 Registration Open)"
            value={newNews}
            onChange={(e) => setNewNews(e.target.value)}
            style={{ padding: '10px', width: '70%', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <button
            onClick={handleAddNews}
            style={{ padding: '10px 15px', marginLeft: '10px', background: '#28a745', color: 'white', border: 'none', borderRadius: '4px' }}
          >
            Add News
          </button>
        </div>

        {/* NEWS LIST */}
        <div>
          {news.map((item) => (
            <div
              key={item.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px',
                background: 'white',
                marginBottom: '8px',
                borderRadius: '6px',
                borderLeft: '4px solid #ff6b35'
              }}
            >
              {editingNewsId === item.id ? (
                <>
                  <input
                    value={editNewsText}
                    onChange={(e) => setEditNewsText(e.target.value)}
                    style={{ flex: 1, padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                  />
                  <button onClick={handleSaveEdit} style={{ marginLeft: '10px', background: '#007bff', color: 'white', padding: '5px 10px', border: 'none', borderRadius: '4px' }}>
                    Save
                  </button>
                  <button onClick={() => setEditingNewsId(null)} style={{ marginLeft: '5px', background: '#6c757d', color: 'white', padding: '5px 10px', border: 'none', borderRadius: '4px' }}>
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <span style={{ flex: 1 }}>{item.title}</span>
                  <button
                    onClick={() => startNewsEdit(item)}
                    style={{ marginRight: '8px', background: '#ffc107', color: 'black', padding: '5px 10px', border: 'none', borderRadius: '4px', fontSize: '0.85rem' }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteNews(item.id)}
                    style={{ background: '#dc3545', color: 'white', padding: '5px 10px', border: 'none', borderRadius: '4px', fontSize: '0.85rem' }}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
        {/*  */}
      </div>
    </div>
    
  );
}

export default AdminDashboard;