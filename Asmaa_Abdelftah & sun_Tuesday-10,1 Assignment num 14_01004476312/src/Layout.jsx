import { NavLink, Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import data from "./data/posts.json";
import Icon from "./icons.jsx";

export default function Layout() {
  const { pathname } = useLocation();
  const nav = useNavigate();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  const s = data.siteInfo;
  return (
    <>
      <header className="nav">
        <div className="wrap nav-in">
          <Link to="/" className="logo">
            <span className="logo-ic"><Icon name="lens" size={22} /></span>
            <span><b>{s.name}</b><small>{s.tagline}</small></span>
          </Link>
          <nav className="pill">
            <NavLink to="/" end>الرئيسية</NavLink>
            <NavLink to="/blog">المدونة</NavLink>
            <NavLink to="/about">من نحن</NavLink>
          </nav>
          <div className="nav-end">
            <button className="icon-btn" aria-label="بحث" onClick={() => nav("/blog")}><Icon name="search" /></button>
            <Link to="/blog" className="btn">ابدأ القراءة</Link>
          </div>
        </div>
      </header>
      <main><Outlet /></main>
      <footer className="foot">
        <div className="wrap foot-in">
          <div>
            <div className="logo"><span className="logo-ic"><Icon name="lens" size={22} /></span><span><b>{s.name}</b></span></div>
            <p>{s.description}</p>
            <div className="social"><a href="#" aria-label="x"><Icon name="x" size={18} /></a><a href="#" aria-label="instagram"><Icon name="insta" size={18} /></a><a href="#" aria-label="youtube"><Icon name="yt" size={18} /></a></div>
          </div>
          <div><h4>استكشف</h4>
            <Link to="/">الرئيسية</Link><Link to="/blog">المدونة</Link><Link to="/about">من نحن</Link></div>
          <div><h4>التصنيفات</h4>
            {data.categories.map(c => <Link key={c.name} to={`/blog?category=${encodeURIComponent(c.name)}`}>{c.name}</Link>)}</div>
          <div><h4>ابق على اطلاع</h4>
            <p>اشترك للحصول على أحدث المقالات في بريدك.</p>
            <form className="sub" onSubmit={e => { e.preventDefault(); e.target.reset(); alert("تم الاشتراك!"); }}>
              <input type="email" required placeholder="بريدك الإلكتروني" />
              <button className="btn sm">اشترك</button>
            </form>
          </div>
        </div>
        <p className="copy">© 2026 {s.name} — جميع الحقوق محفوظة</p>
      </footer>
    </>
  );
}
