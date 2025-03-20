import React, { useEffect, useState } from 'react';
import './Player.css';
import back_arrow from '../../assets/back_arrow_icon.png';
import { useNavigate, useParams } from 'react-router-dom';

const Player = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    type: "",
    error: null,
  });

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YmVjOGFhNDA5ODgzZWI1Nzk3YmNmOTEwYmVlYThmMiIsIm5iZiI6MTc0MjIxOTI1Mi4yNTksInN1YiI6IjY3ZDgyN2Y0NTk2M2ViZmZkZTdjMzhhMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-TCB_95-_d1-bt7mGTajBkzEz8xS96TXL2Q2VfVEWic'
    }
  };

  useEffect(() => {
    let isMounted = true;
    setApiData(prev => ({...prev, error: null})); //reset error on new fetch.

    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(res => {
        if (isMounted && res.results && res.results.length > 0 && res.results[0].key) {
          setApiData({
            name: res.results[0].name,
            key: res.results[0].key,
            published_at: res.results[0].published_at,
            type: res.results[0].type,
            error: null, // clear any previous errors
          });
        } else {
          setApiData(prev => ({...prev, error: "No trailer found."}));
        }
      })
      .catch(err => {
        console.error("Error fetching trailer:", err);
        setApiData(prev => ({...prev, error: "Failed to load trailer. Please try again later."}));
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  return (
    <div className='player'>
      <img src={back_arrow} alt="Back" onClick={() => navigate(-2)} />
      {apiData.error ? (
        <p>{apiData.error}</p>
      ) : apiData.key ? (
        <iframe
          width="90%"
          height="90%"
          src={`https://www.youtube.com/embed/${apiData.key}`}
          title='Trailer'
          frameBorder='0'
          allowFullScreen
        ></iframe>
      ) : (
        <p>Loading trailer...</p>
      )}
      <div className="player-info">
        <p>{apiData.published_at?.slice(0, 10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  );
};


export default Player;