import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
    const navigate = useNavigate()
  return (
    <div className='pagedetails404'>
         <div className='details404'>
                <h2 style={{color:"black", fontSize:"60px"}}>404</h2>
                <p style={{margin:"50px 0px 20px"}}>File not Found</p>
                <p style={{marginBottom:"20px"}}>The site configured at this address does not contain the requested file.</p>
                <p>If this is your site, make sure that the filename case matches the URL.</p>
                <p style={{marginBottom:"20px"}}>For root URLs (like http://example.com/) you must provide an index.html file.</p>
                <div>
                  <a href='Link'>Read the full documentation </a>
                    <span> for more information about using </span>
                    <span style={{color:"#454545"}}>GitHub Pages.</span>
                </div>
                <div className='githubStatus'>
                  <span><a href='Link' style={{color:"grey"}}>GitHub Status  </a></span>
                  <span>  —  </span>
                  <span><a href='Link' style={{color:"grey"}}>  @githubstatus</a></span>
                </div>
                <button className='backListBtn' onClick={() => navigate('')}>Back to List</button>
            </div>
            
    </div>
  )
}

export default NotFound