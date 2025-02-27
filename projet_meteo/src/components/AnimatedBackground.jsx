import { useEffect } from 'react';

function AnimatedBackground() {
  useEffect(() => {
    const createParticle = () => {
      const particle = document.createElement('div');
      particle.className = 'weather-particle';
      
      // Position aléatoire
      particle.style.left = Math.random() * 100 + 'vw';
      particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
      particle.style.opacity = Math.random() * 0.3 + 0.1;
      
      // Type de particule aléatoire
      const types = ['cloud', 'star', 'circle'];
      const type = types[Math.floor(Math.random() * types.length)];
      particle.classList.add(`particle-${type}`);
      
      document.querySelector('.animated-background').appendChild(particle);
      
      // Supprime la particule après l'animation
      setTimeout(() => {
        particle.remove();
      }, 5000);
    };

    // Crée des particules à intervalles réguliers
    const interval = setInterval(createParticle, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="animated-background">
      <div className="fog" style={{ animationDelay: '0s' }} />
      <div className="fog" style={{ animationDelay: '-10s' }} />
      <div className="light-effect" />
    </div>
  );
}

export default AnimatedBackground;