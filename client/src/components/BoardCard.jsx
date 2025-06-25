import React from 'react';
import '../stylesheets/boardCard.css';
import { useNavigate } from 'react-router-dom';
import { FaRegTrashAlt } from "react-icons/fa";
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const BoardCard = ({ board, fetchBoards }) => {
    const navigate=useNavigate()
    const {auth}=useAuth()

    const handleDelete=async()=>{
        try {
            await axios.delete(`https://boardit.onrender.com/api/board/${board._id}`,{
                headers: {
                     Authorization: `Bearer ${auth.token}`,
                }
            }).then(res=>{
                toast.success(res.data.message)
                fetchBoards()
                navigate('/home')
            })
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className="board-card" >
      <div className="board-card-images" onClick={()=>navigate(`/board/${board._id}`)}>
        {board.images.length > 0 ? (
          board.images.slice(0,3).map((img) => (
            <img key={img._id} src={img.url} className="board-img" />
          ))
        ) : (
          <img
            src="https://img.freepik.com/free-vector/images-concept-illustration_114360-218.jpg?ga=GA1.1.1895877315.1729158490&semt=ais_hybrid&w=740"
            alt="placeholder"
            className="board-img placeholder"
          />
        )}
      </div>
      <div className="board-card-text">
        <h3>{board.title}</h3>
        <p>{board.description}</p>
        <p style={{color:"red",zIndex:"1000"}} onClick={handleDelete}><FaRegTrashAlt/></p>
      </div>
    </div>
  );
};

export default BoardCard;
