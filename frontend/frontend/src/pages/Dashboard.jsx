import React from 'react'
import UrlForm from '../components/UrlForm.jsx';
import UserUrl from '../components/UserUrl.jsx';

const Dashboard = () => {
  return (
    <div className='min-h-screen  bg-gray-200 text-white flex items-center justify-center p-6'>
      <div className='max-w-3xl -mt-20.
       w-full bg-gray-800 p-8 rounded-2xl shadow-md'>
        <h1 className='text-3xl font-bold mb-6 text-center'>URL Shortener</h1>
        <UrlForm />
        <UserUrl/>
      </div>
    </div>
  )
}

export default Dashboard