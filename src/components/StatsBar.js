function StatsBar({ stats }) {
  const items = [
    { label: 'Total tasks', value: stats.total, className: 'total' },
    { label: 'In progress', value: stats.active, className: 'active' },
    { label: 'Completed', value: stats.completed, className: 'done' }
  ];

  return (
    <section className="stats-panel" aria-label="Task progress summary">
      <div className="stats-grid">
        {items.map((item) => (
          <article className={`stat-card ${item.className}`} key={item.label}>
            <span className="stat-dot" aria-hidden="true" />
            <div>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </div>
          </article>
        ))}
      </div>
      <div className="progress-card">
        <div className="progress-copy">
          <span>Weekly progress</span>
          <strong>{stats.completionRate}%</strong>
        </div>
        <div
          className="progress-track"
          role="progressbar"
          aria-valuemin="0"
          aria-valuemax="100"
          aria-valuenow={stats.completionRate}
          aria-label={`${stats.completionRate}% of tasks completed`}
        >
          <span style={{ width: `${stats.completionRate}%` }} />
        </div>
      </div>
    </section>
  );
}

export default StatsBar;
