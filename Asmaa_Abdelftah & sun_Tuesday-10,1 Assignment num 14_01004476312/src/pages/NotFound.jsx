import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <section className="wrap hero small">
      <h1 className="big or">404</h1>
      <h2>الصفحة غير موجودة</h2>
      <p className="muted">الصفحة التي تبحث عنها غير موجودة أو تم نقلها.</p>
      <div className="row"><Link to="/" className="btn">العودة للرئيسية</Link><Link to="/blog" className="btn ghost">تصفح المدونة</Link></div>
    </section>
  );
}
