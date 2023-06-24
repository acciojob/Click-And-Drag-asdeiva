// Your code here.
<script>
  const itemsContainer = document.querySelector('.items');
  let isDragging = false;
  let startPosition = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;
  let animationId = 0;

  itemsContainer.addEventListener('mousedown', dragStart);
  itemsContainer.addEventListener('touchstart', dragStart);
  itemsContainer.addEventListener('mouseup', dragEnd);
  itemsContainer.addEventListener('touchend', dragEnd);
  itemsContainer.addEventListener('mouseleave', dragEnd);
  itemsContainer.addEventListener('mousemove', drag);
  itemsContainer.addEventListener('touchmove', drag);

  function dragStart(event) {
    if (event.type === 'touchstart') {
      startPosition = event.touches[0].clientX;
    } else {
      startPosition = event.clientX;
    }
    isDragging = true;
    animationId = requestAnimationFrame(animation);
    itemsContainer.classList.add('active');
  }

  function drag(event) {
    if (!isDragging) return;

    let currentPosition = 0;
    if (event.type === 'touchmove') {
      currentPosition = event.touches[0].clientX;
    } else {
      currentPosition = event.clientX;
    }

    currentTranslate = prevTranslate + currentPosition - startPosition;
  }

  function dragEnd() {
    cancelAnimationFrame(animationId);
    isDragging = false;
    itemsContainer.classList.remove('active');
    prevTranslate = currentTranslate;
  }

  function animation() {
    setTransform(currentTranslate);
    if (isDragging) {
      requestAnimationFrame(animation);
    }
  }

  function setTransform(translate) {
    itemsContainer.style.transform = `translateX(${translate}px)`;
  }
</script>
