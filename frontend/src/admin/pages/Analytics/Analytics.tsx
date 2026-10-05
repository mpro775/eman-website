import { useEffect, useMemo, useState } from 'react';
import { FiActivity, FiDownload, FiEye, FiMousePointer, FiUsers } from 'react-icons/fi';
import { analyticsService, type AnalyticsReport, type BreakdownItem } from '../../../services/analytics.service';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { Card } from '../../components/ui/Card';

const labels: Record<string, string> = {
  mobile: 'جوال', desktop: 'كمبيوتر', tablet: 'جهاز لوحي', Other: 'أخرى', Unknown: 'غير معروف', Direct: 'مباشر',
  engagement: 'وقت التفاعل', contact_click: 'نقرات التواصل', contact_submit: 'نماذج التواصل', newsletter_subscribe: 'اشتراكات النشرة', external_click: 'روابط خارجية',
};
const n = new Intl.NumberFormat('ar-SA');
const duration = (seconds: number) => seconds < 60 ? `${seconds} ث` : `${Math.floor(seconds / 60)} د ${seconds % 60} ث`;

function Bars({ items }: { items: BreakdownItem[] }) {
  const max = Math.max(1, ...items.map(item => item.views));
  return <div className="space-y-4">{items.length ? items.map(item => (
    <div key={item.label}>
      <div className="flex justify-between gap-3 text-sm mb-1"><span className="truncate" title={item.label}>{labels[item.label] || item.label || 'غير معروف'}</span><span className="text-[color:var(--color-admin-text-muted)]">{n.format(item.views)}</span></div>
      <div className="h-2 rounded-full bg-white/5 overflow-hidden"><div className="h-full rounded-full bg-gradient-to-l from-[#4a9eff] to-[#9d4edd]" style={{ width: `${(item.views / max) * 100}%` }} /></div>
    </div>
  )) : <p className="text-sm text-[color:var(--color-admin-text-muted)]">لا توجد بيانات في هذه الفترة.</p>}</div>;
}

export const Analytics = () => {
  const [report, setReport] = useState<AnalyticsReport | null>(null);
  const [period, setPeriod] = useState('30');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [campaignFields, setCampaignFields] = useState({ url: window.location.origin, source: '', medium: 'social', name: '' });
  const [copied, setCopied] = useState(false);
  const [trackingDisabled, setTrackingDisabled] = useState(() => localStorage.getItem('em_analytics_disabled') === 'true');

  useEffect(() => {
    const params = period === 'custom' ? { from, to } : { days: period };
    if (period === 'custom' && (!from || !to)) return;
    analyticsService.getReport(params).then(setReport).catch(() => setError('تعذر تحميل بيانات التحليلات.')).finally(() => setLoading(false));
  }, [period, from, to]);

  const points = useMemo(() => {
    if (!report?.timeline.length) return '';
    const max = Math.max(1, ...report.timeline.map(x => x.views));
    return report.timeline.map((x, i) => `${report.timeline.length === 1 ? 50 : (i / (report.timeline.length - 1)) * 100},${38 - (x.views / max) * 34}`).join(' ');
  }, [report]);

  const exportCsv = () => {
    if (!report) return;
    const rows = [['الصفحة', 'المشاهدات', 'الزوار', 'الجلسات'], ...report.pages.map(x => [x.label, x.views, x.visitors, x.sessions])];
    const csv = '\uFEFF' + rows.map(row => row.map(v => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
    const a = document.createElement('a'); a.href = url; a.download = `analytics-${new Date().toISOString().slice(0, 10)}.csv`; a.click(); URL.revokeObjectURL(url);
  };

  const campaignUrl = useMemo(() => {
    try {
      const url = new URL(campaignFields.url || window.location.origin);
      if (campaignFields.source) url.searchParams.set('utm_source', campaignFields.source);
      if (campaignFields.medium) url.searchParams.set('utm_medium', campaignFields.medium);
      if (campaignFields.name) url.searchParams.set('utm_campaign', campaignFields.name);
      return url.toString();
    } catch { return ''; }
  }, [campaignFields]);

  const copyCampaign = async () => {
    if (!campaignUrl) return;
    await navigator.clipboard.writeText(campaignUrl);
    setCopied(true); window.setTimeout(() => setCopied(false), 1800);
  };

  const toggleOwnTracking = () => {
    const next = !trackingDisabled;
    localStorage.setItem('em_analytics_disabled', String(next));
    setTrackingDisabled(next);
  };

  if (loading) return <div className="min-h-[400px] flex items-center justify-center"><LoadingSpinner size="lg" /></div>;
  const s = report?.summary;
  const cards = s ? [
    ['الزوار', s.visitors, <FiUsers />, s.trends.visitors], ['الزيارات', s.sessions, <FiActivity />, s.trends.sessions], ['مشاهدات الصفحات', s.pageViews, <FiEye />, s.trends.pageViews], ['الأهداف المكتملة', s.goals, <FiMousePointer />, s.trends.goals],
  ] as const : [];

  return <div>
    <div className="flex flex-wrap items-start justify-between gap-4 mb-7">
      <div><h1 className="text-4xl font-bold mb-2">تحليلات الزيارات</h1><p className="text-[color:var(--color-admin-text-muted)]">افهم جمهورك ومصادر الزيارات والنتائج التي تحققها صفحاتك.</p></div>
      <div className="flex flex-wrap gap-2">
        <select value={period} onChange={e => setPeriod(e.target.value)} className="bg-[#151525] border border-white/10 rounded-lg px-3 py-2">
          <option value="1">اليوم</option><option value="7">آخر 7 أيام</option><option value="30">آخر 30 يوماً</option><option value="90">آخر 90 يوماً</option><option value="custom">فترة مخصصة</option>
        </select>
        {period === 'custom' && <><input type="date" value={from} onChange={e => setFrom(e.target.value)} className="bg-[#151525] border border-white/10 rounded-lg px-3 py-2"/><input type="date" value={to} onChange={e => setTo(e.target.value)} className="bg-[#151525] border border-white/10 rounded-lg px-3 py-2"/></>}
        <button onClick={exportCsv} disabled={!report} className="flex items-center gap-2 rounded-lg bg-[#4a9eff] px-4 py-2 text-white disabled:opacity-50"><FiDownload /> تصدير CSV</button>
        <button onClick={toggleOwnTracking} className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm">{trackingDisabled ? 'تفعيل احتساب زياراتي' : 'استبعاد زياراتي'}</button>
      </div>
    </div>
    {error && <div className="rounded-xl bg-red-500/10 text-red-300 p-4 mb-5">{error}</div>}
    {!report ? <Card><p className="text-center text-[color:var(--color-admin-text-muted)]">اختر تاريخ البداية والنهاية.</p></Card> : <>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-5">{cards.map(([title, value, icon, trend]) => <Card key={title}>
        <div className="flex justify-between"><div><p className="text-sm text-[color:var(--color-admin-text-muted)]">{title}</p><p className="text-3xl font-bold mt-2">{n.format(value)}</p><p className={`text-xs mt-2 ${trend >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>{trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}% عن الفترة السابقة</p></div><div className="text-2xl text-[#4a9eff]">{icon}</div></div>
      </Card>)}</div>
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 mb-5">
        {[['نشطون الآن', s!.activeVisitors], ['زوار جدد', s!.newVisitors], ['زوار عائدون', s!.returningVisitors], ['متوسط التفاعل', duration(s!.avgEngagementSeconds)], ['التحويل', `${s!.conversionRate}%`]].map(([label, value]) => <div key={label} className="rounded-xl border border-white/10 bg-white/[.03] p-4"><div className="text-xs text-[color:var(--color-admin-text-muted)]">{label}</div><div className="text-xl font-bold mt-1">{value}</div></div>)}
      </div>
      <Card className="mb-5"><div className="flex justify-between mb-4"><h2 className="text-xl font-bold">حركة الزيارات</h2><span className="text-sm text-[color:var(--color-admin-text-muted)]">{s!.pagesPerSession} صفحة لكل زيارة</span></div>
        {points ? <svg viewBox="0 0 100 40" className="w-full h-56" preserveAspectRatio="none"><defs><linearGradient id="lineFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#4a9eff" stopOpacity=".4"/><stop offset="1" stopColor="#4a9eff" stopOpacity="0"/></linearGradient></defs><polyline points={`0,40 ${points} 100,40`} fill="url(#lineFill)"/><polyline points={points} fill="none" stroke="#4a9eff" strokeWidth="1.2" vectorEffect="non-scaling-stroke"/></svg> : <p className="py-20 text-center text-[color:var(--color-admin-text-muted)]">ستظهر الحركة هنا بعد بدء وصول الزيارات.</p>}
      </Card>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5"><Card><h2 className="text-xl font-bold mb-5">مصادر الزيارات</h2><Bars items={report.sources}/></Card><Card><h2 className="text-xl font-bold mb-5">الأجهزة</h2><Bars items={report.devices}/></Card></div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5"><Card><h2 className="text-xl font-bold mb-5">الدول والمدن</h2><Bars items={report.countries}/>{report.cities.some(x => x.label) && <div className="mt-6 pt-5 border-t border-white/10"><Bars items={report.cities.slice(0, 5)}/></div>}</Card><Card><h2 className="text-xl font-bold mb-5">المتصفحات</h2><Bars items={report.browsers}/></Card></div>
      <Card className="mb-5"><h2 className="text-xl font-bold mb-5">الصفحات الأكثر زيارة</h2><div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="text-right text-[color:var(--color-admin-text-muted)] border-b border-white/10"><th className="pb-3">الصفحة</th><th>المشاهدات</th><th>الزوار</th><th>الزيارات</th></tr></thead><tbody>{report.pages.map(item => <tr key={item.label} className="border-b border-white/5"><td className="py-3 max-w-[320px] truncate" dir="ltr">{item.label}</td><td>{n.format(item.views)}</td><td>{n.format(item.visitors)}</td><td>{n.format(item.sessions)}</td></tr>)}</tbody></table></div></Card>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5"><Card><h2 className="text-lg font-bold mb-5">صفحات الدخول</h2><Bars items={report.entryPages.map(x => ({ ...x, visitors: 0, sessions: 0 }))}/></Card><Card><h2 className="text-lg font-bold mb-5">صفحات الخروج</h2><Bars items={report.exitPages.map(x => ({ ...x, visitors: 0, sessions: 0 }))}/></Card><Card><h2 className="text-lg font-bold mb-5">أكثر الساعات نشاطاً</h2><Bars items={report.activeHours}/></Card></div>
      <Card><h2 className="text-xl font-bold mb-5">التفاعلات المهمة</h2><div className="grid grid-cols-2 md:grid-cols-4 gap-3">{report.events.filter(x => x.type !== 'engagement').map(event => <div key={event.type} className="rounded-xl bg-white/5 p-4"><div className="text-sm text-[color:var(--color-admin-text-muted)]">{labels[event.type] || event.type}</div><div className="text-2xl font-bold mt-2">{n.format(event.count)}</div></div>)}</div></Card>
      <Card className="mt-5"><h2 className="text-xl font-bold mb-2">إنشاء رابط حملة</h2><p className="text-sm text-[color:var(--color-admin-text-muted)] mb-5">استخدم الرابط الناتج في حسابات التواصل لتظهر الحملة ومصدرها بدقة في التقارير.</p><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
        <input aria-label="الرابط" value={campaignFields.url} onChange={e => setCampaignFields(x => ({ ...x, url: e.target.value }))} placeholder="رابط الصفحة" className="bg-[#151525] border border-white/10 rounded-lg px-3 py-2" dir="ltr"/>
        <input aria-label="المصدر" value={campaignFields.source} onChange={e => setCampaignFields(x => ({ ...x, source: e.target.value }))} placeholder="المصدر مثل instagram" className="bg-[#151525] border border-white/10 rounded-lg px-3 py-2"/>
        <input aria-label="الوسيط" value={campaignFields.medium} onChange={e => setCampaignFields(x => ({ ...x, medium: e.target.value }))} placeholder="الوسيط مثل social" className="bg-[#151525] border border-white/10 rounded-lg px-3 py-2"/>
        <input aria-label="الحملة" value={campaignFields.name} onChange={e => setCampaignFields(x => ({ ...x, name: e.target.value }))} placeholder="اسم الحملة" className="bg-[#151525] border border-white/10 rounded-lg px-3 py-2"/>
      </div><div className="flex gap-2"><input readOnly value={campaignUrl} className="min-w-0 flex-1 bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm" dir="ltr"/><button onClick={copyCampaign} className="rounded-lg bg-[#4a9eff] px-4 py-2 text-white">{copied ? 'تم النسخ' : 'نسخ الرابط'}</button></div></Card>
    </>}
  </div>;
};
