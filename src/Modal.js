import React, { useState } from 'react';

const Modal = ({ setShowModal, getData }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      title: title,
      body: body,
      comment: []
    };
  
    await fetch(`http://localhost:8080/Post`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json'
      }
    });
  
    setTitle('');
    setBody('');
    getData();
    setShowModal(false);
  };

  return (
    <div className="modal">
      <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div className="fixed inset-0 z-10 overflow-y-auto" >
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-gray-300 px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <form onSubmit={handleSubmit}>
                <div>
                <div className="grid grid-cols-3 gap-6">
                <div className="col-span-3 sm:col-span-3">
                    <label for="company-website" className="block text-sm font-medium w-full text-gray-700">Title</label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                    <input type="text" value={title} onChange={e => setTitle(e.target.value)} name="company-website" id="company-website" className="block w-full flex-1 border-red-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="Title" />
                    </div>
                    <br/>
                </div>
                </div>

                <div>
                <label for="about" className="block text-sm font-medium text-gray-700">Body</label>
                <div className="mt-1">
                    <textarea id="about" value={body} onChange={e => setBody(e.target.value)} name="about" rows="3" className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="lorem ipsum"></textarea>
                </div>
                </div>
                </div>
                <div className="mt-5 sm:mt-6 justify-between flex">
                <button onClick={() => setShowModal(false)} type="button" className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm">Back</button>
                <button disabled={!title} type="submit" className="inline-flex justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:text-sm">Posting</button>
                </div>
                </form>
            </div>
            </div>
        </div>
        </div>
    </div>
  );
};

export default Modal;
