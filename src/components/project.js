import React, { useState, useEffect } from 'react';
import Search from './search'; 

const Project = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleProjectCardClick = (project) => {
    setSelectedProject(project);

  };

  const closePopup = () => {
    setSelectedProject(null);
  };



  const searchFunction = (searchTerm) => {
    const apiUrl = `http://localhost:3000/search?searchTerm=${encodeURIComponent(searchTerm)}`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setSearchResults(data); 
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
  };

  const loadProjects = () => {
    const apiUrl = `http://localhost:3000/`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setSearchResults(data);
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
  };

  useEffect(() => {
    loadProjects(); 
  }, []);

  return (
    <div>
      <div>
        <Search onSearch={searchFunction} />
      </div>

      {searchResults.map((projectData) => (
        <div className='project-card' key={projectData._id.$oid} onClick={() => handleProjectCardClick(projectData)}>
          <div className='title-container'>
            <h2 className='title'>{projectData.Project.Title}</h2>
          </div>

          <div className='details-container'>
            <p className='subtitle'>Technologies</p>
            <p>{projectData.Project.Technologies}</p>

            <p className='subtitle'>Technical Skillset</p>
            <table>
              <thead>
                <tr>
                  <th className='row1'>Frontend</th>
                  <th className='row2'>Backend</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className='row1'>{projectData.Technical_Skillset.Frontend}</td>
                  <td className='row2'>{projectData.Technical_Skillset.Backend}</td>
                </tr>
              </tbody>
            </table>

            <p className='subtitle'>Availability</p>
            <p>{projectData.Other_Information.Availability}</p>
          </div>
        </div>
      ))}

      {selectedProject && (
        <div>
          <div className="overlay"></div>
          <div className='popup'>
            <div className='popup-content'>
              <div className='title-container'>
                <h2 className='title'>{selectedProject.Project.Title}</h2>
              </div>

              <div className='details-container'>
                <p className='subtitle'>Technologies</p>
                <p>{selectedProject.Project.Technologies}</p>

                <p className='subtitle'>Technical Skillset</p>
                <table>
                  <thead>
                    <tr>
                      <th className='row1'>Frontend</th>
                      <th className='row2'>Backend</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className='row1'>{selectedProject.Technical_Skillset.Frontend}</td>
                      <td className='row2'>{selectedProject.Technical_Skillset.Backend}</td>
                    </tr>
                  </tbody>
                </table>

                <p className='subtitle'>Availability</p>
                <p>{selectedProject.Other_Information.Availability}</p>
              </div>
              <button className='close-btn' onClick={closePopup}>x</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Project;
