import { Link } from "react-router-dom";
import data from "./data/posts.json";
import Icon from "./icons.jsx";

export const countOf = (cat) => data.posts.filter(p => p.category === cat).length;
export const fmt = (d) => new Date(d).toLocaleDateString("ar-EG", { day: "numeric", month: "long", year: "numeric" });
export const catIcons = ["camera", "pen", "bolt", "award", "heart", "book"];

export function SectionHead({ badge, title, sub, to = "/blog" }) {
  return (
    <div className="shead">
      <div>
        <span className="badge">{badge}</span>
        <h2>{title}</h2>
        {sub && <p className="muted">{sub}</p>}
      </div>
      <Link to={to} className="btn ghost sm">عرض الكل <Icon name="arrow" size={16} /></Link>
    </div>
  );
}

export function PostCard({ post, list, featured }) {
  return (
    <Link to={`/blog/${post.slug}`} className={"card" + (list ? " list" : "")}>
      <div className="img">
        <img src={post.image} alt={post.title} loading="lazy" />
        <span className="tag">{post.category}</span>
        {featured && <span className="star"><Icon name="star" size={14} /> مميز</span>}
      </div>
      <div className="body">
        <small className="muted meta"><Icon name="clock" size={14} /> {post.readTime} • {fmt(post.date)}</small>
        <h3>{post.title}</h3>
        <p className="muted">{post.excerpt}</p>
        <div className="author">
          <img src={post.author.avatar} alt="" />
          <div><b>{post.author.name}</b><small>{post.author.role}</small></div>
          {list
            ? <span className="readmore or">اقرأ المقال <Icon name="arrow" size={16} /></span>
            : <span className="round"><Icon name="arrow" size={16} /></span>}
        </div>
      </div>
    </Link>
  );
}
