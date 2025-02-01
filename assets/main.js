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