import { Link } from "react-router-dom";
import "../../styles/Hero.css";

export default function Hero() {
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
                    <Link to="/register" className="btn-primary">
                        Get started free →
                    </Link>
                    <a href="#features" className="btn-secondary">
                        See how it works
                    </a>
                </div>

                {/* Dashboard preview mockup */}
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
                                <span className="active">Today</span>
                                <span>Projects</span>
                                <span>Calendar</span>
                            </div>
                        </div>
                        <div className="preview-body">
                            <div className="preview-stats">
                                <div className="stat-card">
                                    <div className="label">Tasks today</div>
                                    <div className="value">12</div>
                                    <div className="delta">↑ 3 added</div>
                                </div>
                                <div className="stat-card">
                                    <div className="label">Completed</div>
                                    <div className="value">8</div>
                                    <div className="delta">↑ 67%</div>
                                </div>
                                <div className="stat-card">
                                    <div className="label">Day streak</div>
                                    <div className="value">14d</div>
                                    <div className="delta">↑ Best</div>
                                </div>
                            </div>
                            <div className="task-panel">
                                <div className="panel-title">Today's tasks</div>
                                <div className="task-row">
                                    <div className="task-circle done"></div>
                                    <span className="task-name done">Review design mockups</span>
                                    <span className="task-tag tag-green">Done</span>
                                </div>
                                <div className="task-row">
                                    <div className="task-circle done"></div>
                                    <span className="task-name done">Team standup</span>
                                    <span className="task-tag tag-green">Done</span>
                                </div>
                                <div className="task-row">
                                    <div className="task-circle"></div>
                                    <span className="task-name">Finish API integration</span>
                                    <span className="task-tag tag-blue">Dev</span>
                                </div>
                                <div className="task-row">
                                    <div className="task-circle"></div>
                                    <span className="task-name">Write project docs</span>
                                    <span className="task-tag tag-amber">Today</span>
                                </div>
                                <div className="task-row">
                                    <div className="task-circle"></div>
                                    <span className="task-name">Reply to client</span>
                                    <span className="task-tag tag-gray">Email</span>
                                </div>
                            </div>
                            <div className="progress-panel">
                                <div className="panel-title">Project progress</div>
                                <div className="prog-row">
                                    <div className="prog-meta"><span>Backend API</span><span>82%</span></div>
                                    <div className="prog-track"><div className="prog-fill" style={{ width: "82%" }}></div></div>
                                </div>
                                <div className="prog-row">
                                    <div className="prog-meta"><span>Frontend UI</span><span>60%</span></div>
                                    <div className="prog-track"><div className="prog-fill amber" style={{ width: "60%" }}></div></div>
                                </div>
                                <div className="prog-row">
                                    <div className="prog-meta"><span>Testing</span><span>35%</span></div>
                                    <div className="prog-track"><div className="prog-fill green" style={{ width: "35%" }}></div></div>
                                </div>
                                <div className="prog-row">
                                    <div className="prog-meta"><span>Docs</span><span>20%</span></div>
                                    <div className="prog-track"><div className="prog-fill" style={{ width: "20%", background: "#bfdbfe" }}></div></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
