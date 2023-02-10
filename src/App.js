import './tailwind.css';
import React, { useState, useEffect } from 'react';
import Post from './Post';
import Modal from './Modal';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await fetch("http://localhost:8080/Post");
    const data = await response.json();
    data.sort((a, b) => b.id - a.id);
    setPosts(data);
  };

  const handleAddPost = () => {
    setShowModal(true);
  };

  return (
    <div className="container mx-auto p-12">
      <button
        className="bg-yellow-500 text-white py-2 px-4 rounded-lg right fixed bottom-0 right-0 m-5"
        onClick={handleAddPost}
      >
        +
      </button>
      <div className="bg-gray-300 p-5">
        <h2 className="text-gray-700 text-center mt-5 text-xl font-bold my-8">
          POSTINGAN
        </h2>
        {posts.map((post) => (
          <>
            <Post key={post.id} post={post} getData={getData} />
            <br />
            <hr />
          </>
        ))}
      </div>
      {showModal && (
        <Modal setShowModal={setShowModal} getData={getData}/>
      )}
    </div>
  );
};

    
  export default App;

  
