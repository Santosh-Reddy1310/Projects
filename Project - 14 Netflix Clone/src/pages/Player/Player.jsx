import React, { useEffect , useState } from 'react'
import './Player.css'
import back_arrow from '../../assets/back_arrow_icon.png'
import { useParams } from 'react-router-dom'

const Player = () => {

    const {id} = useParams();


    const [apiData, setApiData] = useState({
      name:"",
      key:"",
      published_at:"",
      type:""
    });

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YmVjOGFhNDA5ODgzZWI1Nzk3YmNmOTEwYmVlYThmMiIsIm5iZiI6MTc0MjIxOTI1Mi4yNTksInN1YiI6IjY3ZDgyN2Y0NTk2M2ViZmZkZTdjMzhhMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-TCB_95-_d1-bt7mGTajBkzEz8xS96TXL2Q2VfVEWic'
    }
  };
  
  

    useEffect(() => { 
      fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
      .then(res => res.json())
      .then(res => setApiData(res.results[0]))
      .catch(err => console.error(err));
    }, []);

  return (
    <div className='player'>
      <img src={back_arrow} alt="" />
      <iframe width="90%" height="90%" src={`https://www.youtube.com/embed/${apiData.key}`} title='Trailer' frameBorder='0' allowFullScreen></iframe>
      <div className="player-info">
        <p>{apiData.published_at.slice(0,10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  )
}

export default Player