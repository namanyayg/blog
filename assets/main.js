function sharePost() {
  const title = document.querySelector('.post-title').textContent;
  const url = window.location.href;
  
  if (navigator.share) {
    navigator.share({
      title: title,
      url: url
    })
    .catch(console.error);
  } else {
    window.open(`https://x.com/intent/post?text="${encodeURIComponent(title)}"&url=${encodeURIComponent(url)}&via=NamanyayG`);
  }
}

// Flippable figure functionality
document.addEventListener('DOMContentLoaded', function() {
  const flippables = document.querySelectorAll('.figure-flippable');
  
  flippables.forEach(function(flippable) {
    const container = flippable.querySelector('.figure-flippable__container');
    const buttons = flippable.querySelectorAll('.figure-flippable__toggle-button');
    
    if (container && buttons.length > 0) {
      buttons.forEach(function(button) {
        button.addEventListener('click', function(e) {
          e.stopPropagation();
          container.classList.toggle('figure-flippable__container--flipped');
          const isFlipped = container.classList.contains('figure-flippable__container--flipped');
          
          // Update all buttons in this flippable to keep them in sync
          buttons.forEach(function(btn) {
            btn.textContent = isFlipped ? 'Show Stylized' : 'Show Original';
          });
        });
      });
    }
  });
});