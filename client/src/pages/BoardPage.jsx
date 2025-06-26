import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import '../stylesheets/boardPage.css';
import { FaRegTrashAlt } from "react-icons/fa";
import logo from '../assets/logo.png'
import Loader from '../components/Loader';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import {motion } from 'framer-motion'

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
    localStorage.removeItem('userName')
    toast.success("logged out successfully!")
    navigate('/')
  }

  const fetchBoard = async () => {
    try {
      const res = await axios.get(`https://boardit.onrender.com/api/getBoard/${id}`, {
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
  }, []);

  const handleAddImage = async () => {
    if (!imageURL.trim()) return toast.error('Enter a valid image URL');
    try {
      await axios.post(`https://boardit.onrender.com/api/image/${id}`, { url: imageURL }, {
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
      await axios.put(`https://boardit.onrender.com/api/board/${id}`, editedBoard, {
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
      await axios.delete(`https://boardit.onrender.com/api/image/${id}`,{
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
  }

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    console.log(result)
    const newItems = Array.from(board.images);
    const [movedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, movedItem);
    setBoard({...board,images:newItems})
  };

  if (!board) return <div style={{width:'100%',height:"100vh",display:"flex",justifyContent:"center",alignItems:"center"}}><Loader/></div>;

  return (
    <div className="board-page-container">
        <div className='landingNav'>
                        <nav>
                            <img src={logo} alt='logo' width="100px"/>
                            <div style={{display:"flex",alignItems:"center"}}>
                                <p>{name || 'User'},</p>
                                <button className='land-start' onClick={()=>alert("Future Implementation!")}>Profile</button>
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
        <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="images" direction="vertical">
        {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
                <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 4 }}>
                    <Masonry gutter="0px">
                        {board.images.map((img,index) => (
                            <Draggable key={img._id} draggableId={img._id} index={index} >
                                {(provided)=>(
                                    <div key={img._id} className="image-container" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
                                        
                                    >
                                    <motion.img src={img.url} alt="board-img" className="board-image"
                                    initial={{opacity:0,y:10}}
                                        animate={{opacity:1,y:0}}
                                        transition={{duration:0.5}}
                                        viewport={{once:true, amount:0.3}}
                                     />
                                    <div className="image-overlay" >
                                        <FaRegTrashAlt onClick={() => handleDeleteImage(img._id)} style={{marginTop:"5px",marginBottom:"5px"}}/>
                                    </div>
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </Masonry>
                </ResponsiveMasonry>
            </div>
          )}
        </Droppable>
        </DragDropContext>
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
        <div className="modal-overlay" >
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
