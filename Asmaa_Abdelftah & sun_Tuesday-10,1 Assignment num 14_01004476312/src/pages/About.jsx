import { Link } from "react-router-dom";
import data from "../data/posts.json";
import Icon from "../icons.jsx";

export default function About() {
  const authors = [...new Map(data.posts.map(p => [p.author.name, p.author])).values()];
  const stats = [["+2 مليون", "قارئ شهرياً"], ["500+", "مقالة"], ["50+", "كاتب خبير"], ["15+", "سنة خبرة"]];
  const icons = ["award", "bolt", "users", "star"];
  const values = [["الجودة أولاً", "محتوى مدروس ومكتوب بخبرة"], ["تركيز عملي", "أمثلة واقعية يمكنك تطبيقها اليوم"], ["المجتمع", "تعلم مع آلاف المصورين"], ["دائماً محدث", "أحدث الاتجاهات وأفضل الممارسات"]];
  return (
    <>
      <section className="wrap hero small">
        <h1>مهمتنا هي <span className="or">الإعلام والإلهام</span></h1>
        <p className="muted">{data.siteInfo.description}</p>
      </section>
      <section className="wrap"><div className="stats">{stats.map(([n, l]) => <div key={l}><b>{n}</b><small>{l}</small></div>)}</div></section>
      <section className="wrap sec"><h2>قيمنا</h2>
        <div className="grid4">{values.map(([t, d], i) => <div key={t} className="cat"><span className="sq"><Icon name={icons[i]} size={22} /></span><b>{t}</b><small>{d}</small></div>)}</div></section>
      <section className="wrap sec"><h2>تعرف على كتابنا</h2>
        <div className="grid">{authors.map(a =>
          <div key={a.name} className="team"><img src={a.avatar} alt={a.name} /><b>{a.name}</b><small className="or">{a.role}</small></div>)}</div></section>
      <section className="cta"><h2>لديك أسئلة؟ دعنا نتحدث!</h2>
        <div className="row"><a className="btn dark" href={`mailto:${data.siteInfo.email}`}>تواصل معنا</a><Link className="btn ghost" to="/blog">تصفح المقالات</Link></div></section>
    </>
  );
}
