import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import BoardCard from '../components/BoardCard';
import '../stylesheets/home.css';
import '../stylesheets/landing.css';
import toast from 'react-hot-toast';
import logo from '../assets/logo.png'
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';

const Home = () => {
  const { auth, name } = useAuth();
  const [boards, setBoards] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newBoard, setNewBoard] = useState({ title: '', description: '' });
  const [loading,setLoading]=useState(false)
  const navigate=useNavigate()

  const fetchBoards = async () => {
    try {
      const res = await axios.get('https://boardit.onrender.com/api/getBoards', {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      setBoards(res.data);
      setLoading(false)
    } catch (err) {
      toast.error(err.response.data.message || 'Error fetching boards');
    }
  };

  useEffect(() => {
    setLoading(true)
    fetchBoards();
  }, [auth.token]);

  const handleLogout=(e)=>{
    e.preventDefault()
    localStorage.removeItem('token')
    localStorage.removeItem('userName')
    toast.success("logged out successfully!")
    navigate('/')
  }

  const handleCreateBoard = async () => {
    if (!newBoard.title.trim()) {
      return toast.error('Title is required');
    }

    try {
      await axios.post(
        'https://boardit.onrender.com/api/createBoard',
        newBoard,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      toast.success('Board created!');
      setShowModal(false);
      setNewBoard({ title: '', description: '' });
      fetchBoards();
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to create board');
    }
  };

    if(loading) return <div style={{width:'100%',height:"100vh",display:"flex",justifyContent:"center",alignItems:"center"}}><Loader/></div>;

  return (
    <div className="home-container">
        <div className='landingNav'>
                <nav>
                    <img src={logo} alt='logo' width="100px"/>
                    <div style={{display:"flex",alignItems:"center"}}>
                        <p>{name || 'User'},</p>
                        <button className='land-start'>Profile</button>
                        <button className='land-login' onClick={handleLogout}>Logout</button>
                    </div>
                </nav>
            </div>
      <h2 className="welcome-text">Welcome, {name || 'User'}</h2>
      <hr className="divider" />
      <h3 className="section-title">Your Moodboards</h3>

      {boards.length === 0 ? (
            <div>
            <p className="no-boards">You have no moodboards yet.</p>
            <div className="adding-board" onClick={() => setShowModal(true)}>
            <h1>+</h1>
            <p>Add New Board</p>
            </div>
            </div>
      ) : (
        <div className="boards-grid">
          {boards.map((board) => (
            <BoardCard key={board._id} board={board} fetchBoards={fetchBoards}/>
          ))}
          <div className="adding-board" onClick={() => setShowModal(true)}>
            <h1>+</h1>
            <p>Add New Board</p>
          </div>
        </div>
      )}

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h2>Create New Board</h2>
            <input
              type="text"
              placeholder="Board Title"
              value={newBoard.title}
              onChange={(e) => setNewBoard({ ...newBoard, title: e.target.value })}
            />
            <textarea
              placeholder="Board Description"
              value={newBoard.description}
              onChange={(e) => setNewBoard({ ...newBoard, description: e.target.value })}
            />
            <div className="modal-actions">
              <button onClick={handleCreateBoard}>Add Board</button>
              <button onClick={() => setShowModal(false)} className="cancel-btn">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
