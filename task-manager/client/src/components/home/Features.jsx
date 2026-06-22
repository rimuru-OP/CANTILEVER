import "../../styles/Features.css";

const features = [
    {
        icon: "✓",
        title: "Smart task lists",
        description: "Create tasks, set due dates, and organize everything into projects. Drag to reorder, tap to complete.",
    },
    {
        icon: "📊",
        title: "Progress tracking",
        description: "See exactly how much you've done at a glance. Daily stats and streaks keep you motivated.",
    },
    {
        icon: "🔔",
        title: "Due date reminders",
        description: "Never miss a deadline again. Get notified before tasks are due so you can stay ahead.",
    },
    {
        icon: "📁",
        title: "Project boards",
        description: "Group related tasks into projects. Great for work, side projects, or anything with moving parts.",
    },
    {
        icon: "🔁",
        title: "Recurring tasks",
        description: "Set tasks to repeat daily, weekly, or on a custom schedule. Build habits without the overhead.",
    },
    {
        icon: "⚡",
        title: "Works everywhere",
        description: "Fast and responsive on desktop and mobile. Your tasks are always with you, always in sync.",
    },
];

export default function Features() {
    return (
        <section className="features" id="features">
            <div className="features-inner">
                <span className="section-label">Features</span>
                <h2 className="section-title">Everything you need,<br />nothing you don't</h2>
                <p className="section-sub">
                    DoIt strips away the complexity so you can focus on what actually matters — doing the work.
                </p>
                <div className="features-grid">
                    {features.map((f) => (
                        <div className="feature-card" key={f.title}>
                            <div className="feature-icon">{f.icon}</div>
                            <h3>{f.title}</h3>
                            <p>{f.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
