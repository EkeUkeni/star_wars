import React, { useEffect, useState } from 'react'
import MoreInfoBtn from './MoreInfo';



const Films = () => {

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(()=>{

    fetch(`https://swapi.dev/api/films`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`This is an HTTP Error: The status is ${response.status}`)
                }
                return response.json()
            })
            .then((actualData) => {
                setData(actualData.results)
                setError(null)
            })
            .catch((error) => {
                console.log(error)
                setError(error)
                setData(null)
            })
            .finally(() => {
                setLoading(false)
            })

      }, [])
  return (
    <>
      <div style={{background:"black"}}>
        <h1>Star Wars</h1>
        {loading && <div>Data is loading. Please wait...</div>}
        {error && <div>{`There is a problem fetching your data - ${error}`}</div>}
        <ul>
            {data && data.map((item) => {
                      return (
                          <li className='card' key={item.episode_id}>
                              <div>
                                <div className='text'>
                                  <div className='title'><h2>{item.title}</h2></div>
                                  <div className='date'><p>{item.release_date}</p></div>
                                  <div className='redborder'><p>{item.opening_crawl.split('\n').slice(0, 10).join('\n')}...</p></div>
                                  <div ><MoreInfoBtn text={'More Info'}/></div>
                                </div> 
                              </div>
                          </li>
                      )
                  })}
        </ul>
      </div>
    </>
  )
}

export default Films