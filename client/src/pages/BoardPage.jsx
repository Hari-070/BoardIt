import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import '../stylesheets/boardPage.css';
import { FaRegTrashAlt } from "react-icons/fa";
import logo from '../assets/logo.png'

const BoardPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { auth } = useAuth();

  const [board, setBoard] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [imageURL, setImageURL] = useState('');
  const [editedBoard, setEditedBoard] = useState({ title: '', description: '' });

  const handleLogout=(e)=>{
    e.preventDefault()
    localStorage.removeItem('token')
    navigate('/')
  }

  const fetchBoard = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/getBoard/${id}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      setBoard(res.data);
      setEditedBoard({ title: res.data.title, description: res.data.description });
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to load board');
    }
  };

  useEffect(() => {
    fetchBoard();
  }, [id]);

  const handleAddImage = async () => {
    if (!imageURL.trim()) return toast.error('Enter a valid image URL');
    try {
      await axios.post(`http://localhost:3000/api/image/${id}`, { url: imageURL }, {
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      toast.success('Image added!');
      setImageURL('');
      setShowImageModal(false);
      fetchBoard();
    } catch (err) {
      toast.error('Failed to add image');
    }
  };

  const handleEditBoard = async () => {
    try {
      await axios.put(`http://localhost:3000/api/board/${id}`, editedBoard, {
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      toast.success('Board updated!');
      setShowEditModal(false);
      fetchBoard();
    } catch (err) {
      toast.error('Failed to update board');
    }
  };

  const handleDeleteImage = async (imageId) => {
    try {
        console.log("inside delete")
      await axios.delete(`http://localhost:3000/api/image/${id}`,{
        data:{imageId},
        headers: { Authorization: `Bearer ${auth.token}` },
      })
      .then(res=>{
        toast.success('Image deleted');
      })
      fetchBoard();
      console.log("after delete")
    } catch (err) {
      toast.error('Failed to delete image');
    }
  };

  if (!board) return <div className="loading">Loading...</div>;

  return (
    <div className="board-page-container">
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
      
      <div className="board-header">
        <button className="back-button" onClick={() => navigate(-1)}>← Back</button>
        <h1 className="board-title"><span>{board.title.toUpperCase()}</span></h1>
        <p className="board-desc"> <span className='board-description'>{board.description}</span></p>
        <div className="board-actions">
          <button onClick={() => setShowImageModal(true)}>Add Image</button>
          <button onClick={() => setShowEditModal(true)}>Edit Board</button>
        </div>
      </div>
      <hr className='horz'/>

      <div className="board-images-wrapper">
        {board.images && board.images.length > 0 ? (
          board.images.map((img) => (
            <div key={img._id} className="image-container">
              <img src={img.url} alt="board-img" className="board-image" />
              <div className="image-overlay" >
                <FaRegTrashAlt onClick={() => handleDeleteImage(img._id)} style={{marginTop:"5px",marginBottom:"5px"}}/>
              </div>
            </div>
          ))
        ) : (
          <p className="no-images">No images in this board.</p>
        )}
      </div>


      {showImageModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h3>Add Image</h3>
            <input
              type="text"
              placeholder="Image URL"
              value={imageURL}
              onChange={(e) => setImageURL(e.target.value)}
            />
            <div className="modal-actions">
              <button onClick={handleAddImage}>Add</button>
              <button onClick={() => setShowImageModal(false)} className="cancel-btn">Cancel</button>
            </div>
          </div>
        </div>
      )}


      {showEditModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h3>Edit Board</h3>
            <input
              type="text"
              value={editedBoard.title}
              onChange={(e) => setEditedBoard({ ...editedBoard, title: e.target.value })}
              placeholder="Title"
            />
            <textarea
              value={editedBoard.description}
              onChange={(e) => setEditedBoard({ ...editedBoard, description: e.target.value })}
              placeholder="Description"
            />
            <div className="modal-actions">
              <button onClick={handleEditBoard}>Save</button>
              <button onClick={() => setShowEditModal(false)} className="cancel-btn">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BoardPage;
