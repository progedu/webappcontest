document.querySelectorAll('.catalogue-honors-close').forEach((button) => {
  const disclosure = button.closest('details');
  const summary = disclosure.querySelector('summary');

  button.addEventListener('click', () => {
    disclosure.open = false;
    summary.focus({ preventScroll: true });
    summary.scrollIntoView({ behavior: 'instant', block: 'start' });
  });

  button.hidden = false;
});
