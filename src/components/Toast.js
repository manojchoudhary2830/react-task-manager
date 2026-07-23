import { useEffect } from 'react';

function Toast({ message, onDismiss }) {
  useEffect(() => {
    if (!message) return undefined;
    const timeout = window.setTimeout(onDismiss, 2800);
    return () => window.clearTimeout(timeout);
  }, [message, onDismiss]);

  if (!message) return null;

  return (
    <div className="toast" role="status">
      <span aria-hidden="true">✓</span>
      {message}
      <button onClick={onDismiss} type="button" aria-label="Dismiss notification">×</button>
    </div>
  );
}

export default Toast;
