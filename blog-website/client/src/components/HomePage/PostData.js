const posts = [
    {
        id: 1,
        title: "The Future of AI in Everyday Life",
        description: "How artificial intelligence is slowly becoming part of our daily routines.",
        author: "Sophia Carter",
        date: "June 10, 2026",
        image: new URL("../../assets/1.png", import.meta.url).href,
        category: "AI",
        content: `
Artificial intelligence is rapidly becoming integrated into daily life.
From recommendation systems to voice assistants, AI technologies are
changing how people interact with digital platforms.

Modern industries are heavily investing in automation and machine learning
to improve efficiency and decision-making processes.

As AI continues to evolve, society must also address concerns surrounding
ethics, privacy, and responsible innovation.
`
    },

    {
        id: 2,
        title: "Why Minimal Design Wins",
        description: "Understanding the psychology behind clean and minimal user interfaces.",
        author: "Liam Johnson",
        date: "June 8, 2026",
        image: new URL("../../assets/2.png", import.meta.url).href,
        category: "Design",
        content: `
Minimal design focuses on simplicity, usability, and visual clarity.
Clean interfaces reduce distractions and improve user experiences.

Modern applications rely heavily on spacing, typography,
and layout hierarchy to guide user attention effectively.

Good design is often invisible because it feels natural and intuitive.
`
    },

    {
        id: 3,
        title: "React vs Vue in 2026",
        description: "A practical comparison between two major frontend frameworks.",
        author: "Emily Brown",
        date: "June 7, 2026",
        image: new URL("../../assets/3.png", import.meta.url).href,
        category: "Programming",
        content: `
React and Vue continue to dominate frontend development in 2026.
Both frameworks offer powerful ecosystems and strong communities.

React provides flexibility and enterprise-level scalability,
while Vue focuses on simplicity and developer experience.

The best framework often depends on project requirements
and team preferences.
`
    },

    {
        id: 4,
        title: "How Developers Stay Productive",
        description: "Daily habits and systems used by high-performing programmers.",
        author: "Noah Wilson",
        date: "June 5, 2026",
        image: new URL("../../assets/4.png", import.meta.url).href,
        category: "Productivity",
        content: `
Highly productive developers rely on consistency and focus.
They often use structured workflows and eliminate distractions.

Time management, regular breaks, and healthy routines
play a major role in maintaining long-term performance.

Productivity is more about sustainability than overworking.
`
    },

    {
        id: 5,
        title: "The Rise of Indie Hackers",
        description: "Why solo developers are building successful businesses online.",
        author: "Ava Martinez",
        date: "June 4, 2026",
        image: new URL("../../assets/5.png", import.meta.url).href,
        category: "Startups",
        content: `
Independent developers now have access to powerful tools,
global audiences, and modern cloud infrastructure.

This has enabled many solo creators to build profitable businesses
without large teams or investors.

Communities around indie hacking continue to grow rapidly,
encouraging experimentation and fast product iteration.
`
    },

    {
        id: 6,
        title: "Building Better APIs",
        description: "Important backend design principles every developer should know.",
        author: "James Taylor",
        date: "June 3, 2026",
        image: new URL("../../assets/6.png", import.meta.url).href,
        category: "Backend",
        content: `
A well-designed API improves scalability, maintainability,
and developer experience.

RESTful principles, proper status codes, and clean endpoints
help applications communicate efficiently.

Modern backend systems also focus heavily on security,
validation, and performance optimization.
`
    },

    {
        id: 7,
        title: "Understanding Modern CSS",
        description: "Flexbox, Grid, and responsive design explained simply.",
        author: "Isabella Thomas",
        date: "June 2, 2026",
        image: new URL("../../assets/7.png", import.meta.url).href,
        category: "CSS",
        content: `
Modern CSS provides powerful layout systems like Flexbox and Grid.
These tools allow developers to create responsive and adaptive designs.

Responsive design ensures applications work across phones,
tablets, and desktop screens seamlessly.

CSS has evolved far beyond simple styling into a robust design system.
`
    },

    {
        id: 8,
        title: "The Psychology of Social Media",
        description: "How platforms are designed to maximize engagement.",
        author: "Benjamin Harris",
        date: "June 1, 2026",
        image: new URL("../../assets/8.png", import.meta.url).href,
        category: "Technology",
        content: `
Social media platforms are heavily optimized for engagement.
Algorithms prioritize content that keeps users active for longer periods.

Notifications, infinite scrolling, and recommendation systems
all influence user behavior significantly.

Understanding these systems helps users become more mindful online.
`
    },

    {
        id: 9,
        title: "What Makes a Great Portfolio",
        description: "Tips for creating a portfolio that actually gets noticed.",
        author: "Mia Anderson",
        date: "May 30, 2026",
        image: new URL("../../assets/9.png", import.meta.url).href,
        category: "Career",
        content: `
A strong portfolio demonstrates both technical ability and presentation skills.
Projects should highlight problem-solving rather than just visual polish.

Clear documentation and thoughtful design improve credibility significantly.

Employers often value quality projects more than quantity.
`
    },

    {
        id: 10,
        title: "The Evolution of Gaming Hardware",
        description: "A look into how gaming PCs and consoles evolved over time.",
        author: "Lucas White",
        date: "May 28, 2026",
        image: new URL("../../assets/10.png", import.meta.url).href,
        category: "Gaming",
        content: `
Gaming hardware has evolved dramatically over the last two decades.
Modern GPUs and CPUs deliver near cinematic visual experiences.

Advancements in cooling systems, SSD storage,
and display technologies continue to improve gaming performance.

Cloud gaming may further reshape the industry in the future.
`
    },

    {
        id: 11,
        title: "Learning Backend Development",
        description: "A beginner-friendly roadmap for aspiring backend engineers.",
        author: "Charlotte Moore",
        date: "May 26, 2026",
        image: new URL("../../assets/11.png", import.meta.url).href,
        category: "Backend",
        content: `
Backend development involves databases, APIs, authentication,
and server architecture.

Beginners should focus on understanding HTTP requests,
REST APIs, and database fundamentals first.

Practical projects remain one of the best ways to learn backend systems.
`
    },

    {
        id: 12,
        title: "The Art of Writing Online",
        description: "How creators build audiences through compelling blog posts.",
        author: "Henry Jackson",
        date: "May 24, 2026",
        image: new URL("../../assets/12.png", import.meta.url).href,
        category: "Writing",
        content: `
Online writing is about clarity, authenticity, and consistency.
Successful creators often focus on delivering value to readers.

Strong storytelling and structured formatting
greatly improve audience engagement.

Writing regularly helps creators refine their voice over time.
`
    },

    {
        id: 13,
        title: "Can Open Source Change the World?",
        description: "The impact of collaborative software development globally.",
        author: "Amelia Martin",
        date: "May 22, 2026",
        image: new URL("../../assets/13.png", import.meta.url).href,
        category: "Open Source",
        content: `
Open source software powers much of the modern internet.
Developers worldwide collaborate to improve tools and technologies.

This collaborative model accelerates innovation
and provides accessible learning opportunities for beginners.

Open source communities continue to shape the future of software development.
`
    },

    {
        id: 14,
        title: "Dark Mode Design Principles",
        description: "Why some dark themes feel premium while others fail.",
        author: "Elijah Thompson",
        date: "May 20, 2026",
        image: new URL("../../assets/14.png", import.meta.url).href,
        category: "Design",
        content: `
Effective dark mode design balances contrast and readability carefully.
Pure black backgrounds often create eye strain rather than reducing it.

Modern dark themes typically use softer shades
to create more comfortable viewing experiences.

Typography and color hierarchy become even more important in dark interfaces.
`
    },

    {
        id: 15,
        title: "The Beginner’s Guide to Databases",
        description: "Understanding SQL, NoSQL, and data modeling basics.",
        author: "Harper Garcia",
        date: "May 18, 2026",
        image: new URL("../../assets/15.png", import.meta.url).href,
        category: "Databases",
        content: `
Databases are essential for storing and organizing application data.
SQL databases focus on structured relationships,
while NoSQL systems prioritize flexibility.

Understanding schemas and queries is fundamental for backend development.

Choosing the right database depends heavily on application requirements.
`
    },

    {
        id: 16,
        title: "How Startups Build Fast",
        description: "Why speed matters more than perfection in early products.",
        author: "Daniel Rodriguez",
        date: "May 16, 2026",
        image: new URL("../../assets/16.png", import.meta.url).href,
        category: "Startups",
        content: `
Early-stage startups prioritize speed and iteration.
Launching quickly allows teams to gather real user feedback sooner.

Perfection often slows progress unnecessarily during early development.

Successful startups continuously adapt based on market response
and user behavior.
`
    },
];

export default posts;