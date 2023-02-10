import './tailwind.css';
import React from 'react';

const Profile = ({ profile }) => (
  <div className="bg-white p-6 rounded-lg">
    <h3 className="font-bold text-xl mb-4">{profile.name}</h3>
    <p className="text-gray-700 mb-4">{profile.bio}</p>
    <button className="bg-blue-500 text-white py-2 px-4 rounded-lg">
      Edit Profile
    </button>
  </div>
);

export default Profile;
