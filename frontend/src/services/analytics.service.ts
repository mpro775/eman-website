import api from './api';

export interface BreakdownItem { label: string; displayName?: string; views: number; visitors: number; sessions: number }
export interface AnalyticsReport {
  range: { from: string; to: string };
  summary: {
    visitors: number; sessions: number; pageViews: number; goals: number;
    activeVisitors: number; newVisitors: number; returningVisitors: number;
    avgEngagementSeconds: number; pagesPerSession: number; conversionRate: number;
    trends: { visitors: number; sessions: number; pageViews: number; goals: number };
  };
  timeline: Array<{ date: string; views: number; visitors: number }>;
  sources: BreakdownItem[]; pages: BreakdownItem[]; devices: BreakdownItem[];
  browsers: BreakdownItem[]; countries: BreakdownItem[];
  cities: BreakdownItem[]; activeHours: BreakdownItem[];
  entryPages: Array<{ label: string; displayName?: string; views: number }>;
  exitPages: Array<{ label: string; displayName?: string; views: number }>;
  events: Array<{ type: string; count: number }>;
}

export interface LiveAnalytics {
  generatedAt: string;
  windowMinutes: number;
  activeVisitors: number;
  pageViews: number;
  goalEvents: number;
  topPages: Array<{ path: string; displayName: string; views: number }>;
  recentEvents: Array<{
    type: string;
    path: string;
    displayName: string;
    source: string;
    device: string;
    country?: string;
    city?: string;
    region?: string;
    timezone?: string;
    visitorCode?: string;
    ipAddressMasked?: string;
    occurredAt: string;
  }>;
}

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.emanjameel.pro/api';
const VISITOR_KEY = 'em_analytics_visitor';
const SESSION_KEY = 'em_analytics_session';
const SESSION_AT_KEY = 'em_analytics_session_at';

const randomId = () => crypto.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`;

const identity = () => {
  let visitorId = localStorage.getItem(VISITOR_KEY);
  if (!visitorId) { visitorId = randomId(); localStorage.setItem(VISITOR_KEY, visitorId); }
  const lastAt = Number(sessionStorage.getItem(SESSION_AT_KEY) || 0);
  let sessionId = sessionStorage.getItem(SESSION_KEY);
  if (!sessionId || Date.now() - lastAt > 30 * 60 * 1000) {
    sessionId = randomId(); sessionStorage.setItem(SESSION_KEY, sessionId);
  }
  sessionStorage.setItem(SESSION_AT_KEY, String(Date.now()));
  return { visitorId, sessionId };
};

const campaign = () => {
  const params = new URLSearchParams(location.search);
  const stored = sessionStorage.getItem('em_analytics_campaign');
  const current = Object.fromEntries(['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].map(k => [k, params.get(k) || '']).filter(([, v]) => v));
  if (Object.keys(current).length) sessionStorage.setItem('em_analytics_campaign', JSON.stringify(current));
  return Object.keys(current).length ? current : stored ? JSON.parse(stored) : {};
};

export const trackAnalyticsEvent = (type: string, extra: Record<string, unknown> = {}) => {
  if (location.pathname.startsWith('/admin') || import.meta.env.DEV || localStorage.getItem('em_analytics_disabled') === 'true') return;
  const payload = JSON.stringify({ type, ...identity(), path: `${location.pathname}${location.search}`, title: document.title, referrer: document.referrer, language: navigator.language, campaign: campaign(), ...extra });
  const url = `${API_BASE_URL}/analytics/track`;
  if (navigator.sendBeacon) navigator.sendBeacon(url, new Blob([payload], { type: 'application/json' }));
  else void fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: payload, keepalive: true });
};

export const analyticsService = {
  async getReport(params: { days?: string; from?: string; to?: string }): Promise<AnalyticsReport> {
    const response = await api.get<{ data: AnalyticsReport }>('/analytics/report', { params });
    return response.data.data;
  },
  async getLive(): Promise<LiveAnalytics> {
    const response = await api.get<{ data: LiveAnalytics }>('/analytics/live');
    return response.data.data;
  },
};
