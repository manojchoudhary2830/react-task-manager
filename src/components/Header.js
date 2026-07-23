function Header({ onOpenForm }) {
  const today = new Intl.DateTimeFormat('en', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  }).format(new Date());

  return (
    <header className="app-header">
      <div className="brand-block">
        <div className="brand-mark" aria-hidden="true">M</div>
        <div>
          <p className="eyebrow">PERSONAL PRODUCTIVITY</p>
          <h1>Momentum</h1>
        </div>
      </div>
      <div className="header-actions">
        <p className="today-label">{today}</p>
        <button className="primary-button header-add" onClick={onOpenForm} type="button">
          <span aria-hidden="true">＋</span> New task
        </button>
      </div>
    </header>
  );
}

export default Header;
