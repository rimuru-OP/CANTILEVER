import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";
import "../../styles/Hero.css";

export default function Hero() {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState("tasks");

    return (
        <section className="hero">
            <div className="hero-content">
                <span className="hero-eyebrow">✦ Task management, simplified</span>

                <h1>
                    Stop managing chaos.<br />
                    <span className="accent">Start getting things done.</span>
                </h1>

                <p>
                    Organize tasks, track progress, and stay focused with a workflow
                    built for people who actually want to finish things.
                </p>

                <div className="hero-buttons">
                    <Link to={user ? "/dashboard" : "/register"} className="btn-primary">
                        {user ? "Go to dashboard →" : "Get started free →"}
                    </Link>
                    <a href="#features" className="btn-secondary">
                        See how it works
                    </a>
                </div>

                <div className="hero-preview">
                    <div className="preview-bar">
                        <div className="preview-dots">
                            <span></span><span></span><span></span>
                        </div>
                        <div className="preview-url">app.doit.com/dashboard</div>
                        <div style={{ width: 60 }}></div>
                    </div>
                    <div className="preview-inner">
                        <div className="preview-header">
                            <span className="preview-logo">DoIt</span>
                            <div className="preview-nav">
                                <span
                                    className={activeTab === "tasks" ? "active" : ""}
                                    onClick={() => setActiveTab("tasks")}
                                >
                                    Tasks
                                </span>
                                <span
                                    className={activeTab === "review" ? "active" : ""}
                                    onClick={() => setActiveTab("review")}
                                >
                                    Review
                                </span>
                            </div>
                        </div>

                        {activeTab === "tasks" && (
                            <div className="preview-body preview-kanban">
                                {[
                                    { label: "Not Started", color: "#94a3b8", cards: ["Set up repo", "Write tests"] },
                                    { label: "In Progress", color: "#f59e0b", cards: ["Build API", "Design UI"] },
                                    { label: "Done", color: "#22c55e", cards: ["Auth flow", "DB schema"] },
                                    { label: "Cancelled", color: "#ef4444", cards: ["Old feature"] },
                                ].map((col) => (
                                    <div key={col.label} className="preview-col">
                                        <div className="preview-col-header">
                                            <span className="preview-col-dot" style={{ background: col.color }} />
                                            <span className="preview-col-title">{col.label}</span>
                                        </div>
                                        {col.cards.map((card) => (
                                            <div key={card} className="preview-task-card">
                                                {card}
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === "review" && (
                            <div className="preview-body preview-review">
                                <div className="preview-stats">
                                    <div className="stat-card">
                                        <div className="label">Total tasks</div>
                                        <div className="value">12</div>
                                        <div className="delta">across all columns</div>
                                    </div>
                                    <div className="stat-card">
                                        <div className="label">Completed</div>
                                        <div className="value">8</div>
                                        <div className="delta">↑ 67%</div>
                                    </div>
                                    <div className="stat-card">
                                        <div className="label">In Progress</div>
                                        <div className="value">3</div>
                                        <div className="delta">active now</div>
                                    </div>
                                </div>
                                <div className="preview-progress">
                                    <div className="panel-title">Status breakdown</div>
                                    {[
                                        { label: "Done", pct: 67, color: "#22c55e" },
                                        { label: "In Progress", pct: 25, color: "#f59e0b" },
                                        { label: "Not Started", pct: 8, color: "#94a3b8" },
                                        { label: "Cancelled", pct: 8, color: "#ef4444" },
                                    ].map((row) => (
                                        <div key={row.label} className="prog-row">
                                            <div className="prog-meta">
                                                <span>{row.label}</span>
                                                <span>{row.pct}%</span>
                                            </div>
                                            <div className="prog-track">
                                                <div
                                                    className="prog-fill"
                                                    style={{ width: `${row.pct}%`, background: row.color }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}