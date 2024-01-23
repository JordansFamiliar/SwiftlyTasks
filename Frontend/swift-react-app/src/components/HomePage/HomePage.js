import React from 'react';
import './HomePage.css';

function HomePage() {
  return (
    <>
      <main>
        <div className="color-change-2x"></div>
        <div className="grid-container">
	  <h1 className="flicker-in-1" style={{ whiteSpace: 'preline' }}>
	    GET IT{<br />}DONE.
	  </h1>
        </div>
        <div className="container-right">
	  <h1>Prioritise</h1>
	  <h1>Stay up to date</h1>
	  <h1>Increase your productivity</h1>
	  <h1>Manage your team</h1>
        </div>
      </main>
    </>
  );
}

export default HomePage;
