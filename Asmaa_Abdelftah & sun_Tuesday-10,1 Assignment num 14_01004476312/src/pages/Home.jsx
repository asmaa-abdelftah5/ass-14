import { Link } from "react-router-dom";
import data from "../data/posts.json";
import { PostCard, SectionHead, countOf, catIcons } from "../components.jsx";
import Icon from "../icons.jsx";

export default function Home() {
  const latest = data.posts.slice(0, 3);
  const featured = data.posts.filter(p => p.featured);
  const authors = new Set(data.posts.map(p => p.author.name)).size;
  const stats = [["book", data.posts.length, "مقالة"], ["users", "10 ألف+", "قارئ"], ["grid", data.categories.length, "تصنيفات"], ["pen", authors, "كاتب"]];
  return (
    <>
      <section className="hero wrap">
        <span className="badge"><i className="dot" /> مرحباً بك في {data.siteInfo.name}</span>
        <h1>اكتشف <span className="or">فن</span><br />التصوير الفوتوغرافي</h1>
        <p className="muted">انغمس في أسرار المحترفين ونصائح عملية لتطوير مهاراتك في التصوير.</p>
        <div className="row"><Link to="/blog" className="btn">استكشف المقالات <Icon name="arrow" size={16} /></Link><Link to="/about" className="btn ghost">اعرف المزيد</Link></div>
        <div className="stats">
          {stats.map(([ic, n, l]) =>
            <div key={l}><span className="or"><Icon name={ic} size={22} /></span><b>{n}</b><small>{l}</small></div>)}
        </div>
      </section>

      <section className="wrap sec">
        <SectionHead badge="مميز" title="مقالات مختارة" sub="مقالات منتقاة بعناية من فريق التحرير" />
        <div className="stack">{featured.map(p => <PostCard key={p.id} post={p} list featured />)}</div>
      </section>

      <section className="wrap sec">
        <SectionHead badge="التصنيفات" title="استكشف حسب الموضوع" sub="اختر المجال الذي يهمك" />
        <div className="grid4">
          {data.categories.map((c, i) =>
            <Link key={c.name} className="cat" to={`/blog?category=${encodeURIComponent(c.name)}`}>
              <span className="sq"><Icon name={catIcons[i % catIcons.length]} size={22} /></span>
              <b>{c.name}</b><small>{countOf(c.name)} مقالة</small></Link>)}
        </div>
      </section>

      <section className="wrap sec">
        <SectionHead badge="الأحدث" title="أحدث المقالات" sub="محتوى جديد نُشر مؤخراً" />
        <div className="grid">{latest.map(p => <PostCard key={p.id} post={p} />)}</div>
      </section>
    </>
  );
}
