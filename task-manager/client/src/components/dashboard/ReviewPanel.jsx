export default function ReviewPanel({ tasks }) {
    const total = tasks.length;
    const done = tasks.filter((t) => t.status === "done").length;
    const inProgress = tasks.filter((t) => t.status === "in_progress").length;
    const notStarted = tasks.filter((t) => t.status === "not_started").length;
    const cancelled = tasks.filter((t) => t.status === "cancelled").length;

    const pct = (count) => (total === 0 ? 0 : Math.round((count / total) * 100));

    const breakdown = [
        { label: "Done",        count: done,       color: "#22c55e" },
        { label: "In Progress", count: inProgress, color: "#f59e0b" },
        { label: "Not Started", count: notStarted, color: "#94a3b8" },
        { label: "Cancelled",   count: cancelled,  color: "#ef4444" },
    ];

    return (
        <div className="review-panel">
            <div className="review-stats">
                <div className="review-stat-card">
                    <div className="review-stat-label">Total tasks</div>
                    <div className="review-stat-value">{total}</div>
                    <div className="review-stat-sub">across all columns</div>
                </div>
                <div className="review-stat-card">
                    <div className="review-stat-label">Completed</div>
                    <div className="review-stat-value">{done}</div>
                    <div className="review-stat-sub highlight">{pct(done)}% of total</div>
                </div>
                <div className="review-stat-card">
                    <div className="review-stat-label">In Progress</div>
                    <div className="review-stat-value">{inProgress}</div>
                    <div className="review-stat-sub">active now</div>
                </div>
            </div>

            <div className="review-breakdown">
                <h3 className="review-breakdown-title">Status breakdown</h3>
                {breakdown.map((row) => (
                    <div key={row.label} className="review-prog-row">
                        <div className="review-prog-meta">
                            <span>{row.label}</span>
                            <span>{row.count} task{row.count !== 1 ? "s" : ""} · {pct(row.count)}%</span>
                        </div>
                        <div className="review-prog-track">
                            <div
                                className="review-prog-fill"
                                style={{
                                    width: `${pct(row.count)}%`,
                                    background: row.color,
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}