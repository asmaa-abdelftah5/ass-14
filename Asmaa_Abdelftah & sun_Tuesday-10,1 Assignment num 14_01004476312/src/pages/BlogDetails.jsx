import { useParams, Link } from "react-router-dom";
import data from "../data/posts.json";
import { PostCard, fmt } from "../components.jsx";
import NotFound from "./NotFound.jsx";

export default function BlogDetails() {
  const { slug } = useParams();
  const post = data.posts.find(p => p.slug === slug);
  if (!post) return <NotFound />;
  const related = data.posts.filter(p => p.category === post.category && p.id !== post.id).slice(0, 3);
  return (
    <>
      <article className="wrap art">
        <Link to="/blog" className="or">→ العودة للمدونة</Link>
        <span className="tag static">{post.category}</span>
        <h1>{post.title}</h1>
        <div className="author"><img src={post.author.avatar} alt="" />
          <div><b>{post.author.name}</b><small>{post.author.role} • {fmt(post.date)} • {post.readTime}</small></div></div>
        <img className="cover" src={post.image} alt={post.title} />
        {post.content.split("\n\n").map((b, i) =>
          b.startsWith("## ") ? <h2 key={i}>{b.slice(3)}</h2> : <p key={i}>{b}</p>)}
        <div className="chips">{post.tags.map(t => <Link key={t} to={`/blog?q=${encodeURIComponent(t)}`}>#{t}</Link>)}</div>
      </article>
      {related.length > 0 && <section className="wrap sec"><h2>مقالات ذات صلة</h2>
        <div className="grid">{related.map(p => <PostCard key={p.id} post={p} />)}</div></section>}
    </>
  );
}
