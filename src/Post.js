import './tailwind.css';
import React, { useState } from 'react';

const Post = ({ post, getData }) => {
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
        id: post.id,
        title : post.title,
        body : post.body,
        comment: [...post.comment, comment]
    };
  
    await fetch(`http://localhost:8080/Post/${post.id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json'
      }
    });
  
    setComment('');
    getData();
  };
  
  const deleteComment = async (index) => {
      if (window.confirm(`Anda yakin ingin menghapus komentar ${post.comment[index]}?`)) {
      const updatedComment = [...post.comment];
      updatedComment.splice(index, 1);

      const data = {
        id: post.id,
        title : post.title,
        body : post.body,
        comment: updatedComment
      };

      await fetch(`http://localhost:8080/Post/${post.id}`, {
          method: "PATCH",
          body: JSON.stringify(data),
          headers: {
          'content-type': 'application/json'
          }
      });

      getData();
    }
  }

  const deletePost = async (index) => {
      if (window.confirm(`Anda yakin ingin menghapus postingan ${post.title}?`)) {

      await fetch(`http://localhost:8080/Post/${post.id}`, {
          method: "DELETE",
          // body: JSON.stringify(data),
          headers: {
          'content-type': 'application/json'
          }
      });

      getData();
    }
  }
  

  return (
    <div className="bg-gray-300 p-6 rounded-lg">
      <div className='flex justify-between'>
         <h3 className="font-bold text-xl mb-4 bg-green-500 text-white rounded-full p-2 inline-flex items-center">{post.title}</h3>
         <p onClick={() => deletePost(post.id)} className='inline-flex items-center cursor-pointer text-red-500 font-bold'>X</p>
      </div>
      <p className="text-white rounded bg-gray-500 p-4">{post.body}</p><br/>
      {post.comment.map((comment, index) => (
             <>
                <p key={index} className="text-gray-700 bg-gray-100 p-4 flex justify-between">
                    <p>{comment}</p>
                    <p onClick={() => deleteComment(index)} className='inline-flex items-center cursor-pointer text-red-500 font-bold'>X</p>
                </p>
                <hr />
            </>
        ))}
      <form onSubmit={handleSubmit} className="bg-gray-200 rounded p-4">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full border border-gray-400 p-2 rounded-lg"
          placeholder="Tulis komentar"
        />
        <button
          type="submit"
          disabled={!comment}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg float-right"
        >
          Kirim
        </button>
      </form>
    </div>
  );
};

export default Post;
