import { useSearchParams } from "react-router-dom";
import data from "../data/posts.json";
import { PostCard } from "../components.jsx";

const PER = 6;

export default function Blog() {
  const [params, setParams] = useSearchParams();
  const q = params.get("q") || "";
  const category = params.get("category") || "";
  const view = params.get("view") === "list" ? "list" : "grid";
  const page = Math.max(1, Number(params.get("page")) || 1);

  const update = (ch) => {
    const n = new URLSearchParams(params);
    Object.entries(ch).forEach(([k, v]) => (v ? n.set(k, v) : n.delete(k)));
    if (!("page" in ch)) n.delete("page");
    setParams(n, { replace: true });
  };

  const filtered = data.posts.filter(p =>
    (!category || p.category === category) &&
    (p.title + p.excerpt + p.tags.join(" ")).toLowerCase().includes(q.trim().toLowerCase()));
  const pages = Math.max(1, Math.ceil(filtered.length / PER));
  const cur = Math.min(page, pages);
  const visible = filtered.slice((cur - 1) * PER, cur * PER);

  return (
    <>
      <section className="wrap hero small">
        <h1>استكشف <span className="or">مقالاتنا</span></h1>
        <p className="muted">اكتشف الدروس والرؤى وأفضل الممارسات للتصوير الحديث</p>
      </section>
      <div className="wrap bar">
        <select className="search" value={category} onChange={e => update({ category: e.target.value })}>
          <option value="">جميع التصنيفات</option>
          {data.categories.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
        </select>
        <input className="search" value={q} placeholder="ابحث في المقالات..." onChange={e => update({ q: e.target.value })} />
      </div>
      <section className="wrap sec">
        <div className="head">
          <span className="muted">عرض <b>{filtered.length}</b> مقالات</span>
          <div className="chips">
            <button className={view === "grid" ? "on" : ""} onClick={() => update({ view: "grid" })}>▦ شبكة</button>
            <button className={view === "list" ? "on" : ""} onClick={() => update({ view: "list" })}>☰ قائمة</button>
          </div>
        </div>
        {visible.length === 0 ? <p className="empty">لا توجد نتائج مطابقة.</p> :
          <div className={view === "grid" ? "grid" : "stack"}>
            {visible.map(p => <PostCard key={p.id} post={p} list={view === "list"} />)}
          </div>}
        {pages > 1 && (
          <nav className="pager">
            <button disabled={cur === 1} onClick={() => update({ page: String(cur - 1) })}>›</button>
            {Array.from({ length: pages }, (_, i) =>
              <button key={i} className={cur === i + 1 ? "on" : ""} onClick={() => update({ page: String(i + 1) })}>{i + 1}</button>)}
            <button disabled={cur === pages} onClick={() => update({ page: String(cur + 1) })}>‹</button>
            <small className="muted">صفحة {cur} من {pages}</small>
          </nav>)}
      </section>
    </>
  );
}
