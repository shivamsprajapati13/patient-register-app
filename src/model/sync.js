export const notifyUpdate = () => {
  // Use a unique value to force the `storage` event to trigger
  localStorage.setItem('db-update', Date.now().toString());
};

export const subscribeToUpdates = (onUpdate) => {
  const handler = (event) => {
    if (event.key === 'db-update') {
      onUpdate();
    }
  };
  window.addEventListener('storage', handler);
  return () => window.removeEventListener('storage', handler);
};
