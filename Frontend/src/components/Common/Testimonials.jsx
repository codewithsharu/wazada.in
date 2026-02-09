import React from 'react';

const Testimonials = () => {
  return (
    <section className="banner" style={{top: 0, left: 0, width: '100%', height: window.innerWidth < 768 ? '390vh' : '250vh', zIndex: 0, overflow: 'hidden', position: 'relative'}}  >
          
    <iframe 
        src="https://codewithsharu.github.io/hero-aic/bottom.html" 
        title="" 
        style={{ width: '100%', height: '100%', border: 'none', position: 'absolute', top: 0 }} 
        allowFullScreen
      
    />
</section>
  
  );
};

export default Testimonials;
