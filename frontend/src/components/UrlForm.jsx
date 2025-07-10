import React, { useState } from 'react';
import { createShortUrl } from '../apis/shortUrl.api';
import { useSelector } from 'react-redux'
import { QueryClient } from '@tanstack/react-query'
import { queryClient } from '../main'

const UrlForm = () => {
    const [url, setUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const [error, setError] = useState('');
    const [copied, setCopied] = useState(false);
    const [customSlug, setCustomSlug] = useState("")
    const {isAuthenticated} = useSelector((state) => state.auth)

   const handleSubmit = async () => {
    try{
      const shortUrl = await createShortUrl(url,customSlug)
      setShortUrl(shortUrl)
      queryClient.invalidateQueries({queryKey: ['userUrls']})
      setError(null)
    }catch(err){
      setError(err.message)
    }
  }
    
    const handleCopy = () => {
        navigator.clipboard.writeText(shortUrl);
        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 2000)
    }

    return (
        <div className='space-y-8' >
            <div>
                <label htmlFor="url" className='block text-sm font-medium text-gray-200'>
                    Enter your long URL:
                </label>
                <input
                    type="url"
                    id="url"
                    value={url}
                    onInput={(e) => setUrl(e.target.value)}
                    placeholder='https://example.com'
                    required
                    className='w-full px-4 py-2 border border-gray-300 rounded-md text-white'
                />
            </div>
            <button
                onClick={handleSubmit}
                type='submit'
                className='w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-white-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50'
            >
                Shorten URL
            </button>

            {error && (
                <div className='mt-4 p-3 bg-red-100 text-red-700 rounded-md'>
                    {error}
                </div>
            )}

            {isAuthenticated &&(
                <div className='mt-1'>
                    <label htmlFor="customSlug" className='block text-sm font-medium text-white mb-1'>
                        Custom URL (optional)
                    </label>
                    <input 
                    type="text"
                    id='customSlug'
                    value={customSlug}
                    onChange={(event) => setCustomSlug(event.target.value)}
                    placeholder='Enter custom slug'
                     className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
            )}

            {shortUrl && (
                <div className='mt-6'>
                    <h2 className='text-lg font-semibold mb-2'>Your shortened URL:</h2>
                    <div className='flex items-center'>
                        <input
                            type="text"
                            readOnly
                            value={shortUrl}
                            className='flex-1 p-2 border border-gray-300 rounded-l-md bg-white text-black'
                        />
                        <button
                            onClick={handleCopy}
                            className={`bg-blue-500 text-white px-5 py-2 rounded-r-md hover:bg-blue-600 transition-colors duration-100 
                            ${copied
                                    ? 'bg-green-500 text-white hover:bg-green-600'
                                    : 'bg-gray-500 hover:bg-gray-300'
                                }`}
                        >
                            {copied ? 'Copied!' : 'Copy'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UrlForm;
