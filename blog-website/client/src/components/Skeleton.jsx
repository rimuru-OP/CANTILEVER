import "../stylesheets/Skeleton.css";

export function SkeletonCard() {
    return (
        <div className="skeleton-card">
            <div className="skeleton skeleton-image" />
            <div className="skeleton-body">
                <div className="skeleton skeleton-tag" />
                <div className="skeleton skeleton-title" />
                <div className="skeleton skeleton-line" />
                <div className="skeleton skeleton-line short" />
            </div>
        </div>
    );
}

export function SkeletonPost() {
    return (
        <div className="skeleton-post">
            <div className="skeleton skeleton-hero" />
            <div className="skeleton skeleton-tag" />
            <div className="skeleton skeleton-heading" />
            <div className="skeleton skeleton-line" />
            <div className="skeleton skeleton-line" />
            <div className="skeleton skeleton-line short" />
        </div>
    );
}