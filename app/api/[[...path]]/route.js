import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
import { v4 as uuidv4 } from 'uuid';

const uri = process.env.MONGO_URL;
const dbName = process.env.DB_NAME || 'adopfide';

let client;
let clientPromise;

if (!global._mongoClientPromise) {
  client = new MongoClient(uri);
  global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise;

async function getDb() {
  const c = await clientPromise;
  return c.db(dbName);
}

function ok(data, status = 200) {
  return NextResponse.json(data, {
    status,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

export async function OPTIONS() {
  return ok({}, 200);
}

// ---------- Programs catalog (static for MVP) ----------
const PROGRAMS = [
  { id: 'p-fullstack', title: 'Full-Stack Web Development', category: 'Engineering', track: 'Software', duration: '16 weeks', level: 'Beginner → Job-Ready', summary: 'Build production-grade web apps with React, Node and MongoDB. Includes 2 industry projects.', tags: ['React', 'Node.js', 'MongoDB'], featured: true },
  { id: 'p-data', title: 'Data Science & Analytics', category: 'Engineering', track: 'Data', duration: '20 weeks', level: 'Intermediate', summary: 'Python, SQL, ML and storytelling with data — built for analyst and DS roles.', tags: ['Python', 'SQL', 'ML'], featured: true },
  { id: 'p-aiml', title: 'AI & Machine Learning', category: 'Engineering', track: 'AI', duration: '24 weeks', level: 'Advanced', summary: 'Hands-on with modern LLMs, RAG, fine-tuning and ML systems design.', tags: ['LLMs', 'PyTorch', 'RAG'], featured: true },
  { id: 'p-pm', title: 'Product Management Fellowship', category: 'Business', track: 'Product', duration: '12 weeks', level: 'Intermediate', summary: 'Discovery, roadmaps, metrics and shipping. Mentored by senior PMs.', tags: ['Discovery', 'Analytics', 'Roadmap'] },
  { id: 'p-design', title: 'Product Design (UI/UX)', category: 'Design', track: 'Design', duration: '14 weeks', level: 'Beginner', summary: 'Figma, design systems, interaction design and portfolio-ready case studies.', tags: ['Figma', 'UX', 'Systems'] },
  { id: 'p-digital', title: 'Digital Marketing Pro', category: 'Business', track: 'Marketing', duration: '10 weeks', level: 'Beginner', summary: 'Performance marketing, SEO, content and analytics with a live brand brief.', tags: ['SEO', 'Ads', 'Analytics'] },
  { id: 'p-cyber', title: 'Cybersecurity Essentials', category: 'Engineering', track: 'Security', duration: '14 weeks', level: 'Intermediate', summary: 'Threat models, networking, OWASP and applied blue-team labs.', tags: ['Networks', 'OWASP', 'Labs'] },
  { id: 'p-finance', title: 'Financial Analyst Track', category: 'Business', track: 'Finance', duration: '12 weeks', level: 'Beginner', summary: 'Excel, valuation, modelling and CFA-aligned fundamentals.', tags: ['Excel', 'Valuation', 'Models'] },
  { id: 'p-cloud', title: 'Cloud & DevOps', category: 'Engineering', track: 'Cloud', duration: '16 weeks', level: 'Intermediate', summary: 'AWS, Docker, Kubernetes, CI/CD and observability — built for SRE/DevOps roles.', tags: ['AWS', 'K8s', 'CI/CD'] },
  { id: 'p-comm', title: 'Business Communication', category: 'Soft Skills', track: 'Soft', duration: '6 weeks', level: 'All Levels', summary: 'Spoken English, presentations and workplace communication mastery.', tags: ['Speaking', 'Writing', 'Interview'] },
];

// ---------- Career assessment scoring ----------
// Each option maps to one or more tracks with weights.
const TRACK_LABELS = {
  Software: 'Full-Stack Web Development',
  Data: 'Data Science & Analytics',
  AI: 'AI & Machine Learning',
  Product: 'Product Management Fellowship',
  Design: 'Product Design (UI/UX)',
  Marketing: 'Digital Marketing Pro',
  Security: 'Cybersecurity Essentials',
  Finance: 'Financial Analyst Track',
  Cloud: 'Cloud & DevOps',
  Soft: 'Business Communication',
};

function scoreAssessment(answers) {
  // answers is array of arrays: [[{track, weight}, ...], ...]
  const totals = {};
  for (const arr of answers || []) {
    for (const opt of arr || []) {
      totals[opt.track] = (totals[opt.track] || 0) + (opt.weight || 1);
    }
  }
  const sorted = Object.entries(totals).sort((a, b) => b[1] - a[1]);
  const top = sorted[0];
  const maxPossible = (answers?.length || 1) * 3; // each q max weight 3
  const match = top ? Math.min(99, Math.round((top[1] / maxPossible) * 100) + 30) : 60;
  const recommended = sorted.slice(0, 3).map(([track]) => ({
    track,
    program: TRACK_LABELS[track] || track,
    programId: PROGRAMS.find((p) => p.track === track)?.id,
  }));
  return { match, recommended, breakdown: totals };
}

// ---------- Router ----------
export async function GET(request, { params }) {
  const path = (params?.path || []).join('/');
  try {
    if (path === '' || path === 'health') return ok({ status: 'ok', service: 'adopfide-api' });
    if (path === 'programs') return ok({ programs: PROGRAMS });
    if (path.startsWith('programs/')) {
      const id = path.split('/')[1];
      const program = PROGRAMS.find((p) => p.id === id);
      if (!program) return ok({ error: 'Not found' }, 404);
      return ok({ program });
    }
    if (path === 'leads') {
      const db = await getDb();
      const leads = await db.collection('leads').find({}).sort({ createdAt: -1 }).limit(100).toArray();
      return ok({ leads });
    }
    return ok({ error: 'Unknown endpoint' }, 404);
  } catch (e) {
    return ok({ error: e.message || 'Server error' }, 500);
  }
}

export async function POST(request, { params }) {
  const path = (params?.path || []).join('/');
  try {
    const body = await request.json().catch(() => ({}));
    const db = await getDb();

    if (path === 'leads') {
      const lead = {
        id: uuidv4(),
        name: (body.name || '').trim(),
        email: (body.email || '').trim(),
        phone: (body.phone || '').trim(),
        type: body.type || 'general', // general | consultation | corporate | student
        message: (body.message || '').trim(),
        program: body.program || null,
        source: body.source || 'website',
        createdAt: new Date(),
      };
      if (!lead.name || !lead.email) return ok({ error: 'Name and email are required' }, 400);
      await db.collection('leads').insertOne(lead);
      return ok({ ok: true, id: lead.id });
    }

    if (path === 'consultations') {
      const c = {
        id: uuidv4(),
        name: body.name,
        email: body.email,
        phone: body.phone,
        company: body.company || null,
        topic: body.topic || 'consultation',
        preferredDate: body.preferredDate || null,
        notes: body.notes || '',
        createdAt: new Date(),
      };
      if (!c.name || !c.email) return ok({ error: 'Name and email are required' }, 400);
      await db.collection('consultations').insertOne(c);
      return ok({ ok: true, id: c.id });
    }

    if (path === 'corporate') {
      const c = {
        id: uuidv4(),
        name: body.name,
        workEmail: body.workEmail,
        company: body.company,
        teamSize: body.teamSize || null,
        useCase: body.useCase || 'training', // training | hiring | consulting
        notes: body.notes || '',
        createdAt: new Date(),
      };
      if (!c.name || !c.workEmail || !c.company) return ok({ error: 'Name, work email and company are required' }, 400);
      await db.collection('corporate_inquiries').insertOne(c);
      return ok({ ok: true, id: c.id });
    }

    if (path === 'assessment') {
      // body: { answers, profile: { name, email } }
      const result = scoreAssessment(body.answers);
      const doc = {
        id: uuidv4(),
        profile: body.profile || null,
        answers: body.answers || [],
        result,
        createdAt: new Date(),
      };
      await db.collection('assessments').insertOne(doc);
      return ok({ ok: true, id: doc.id, result });
    }

    return ok({ error: 'Unknown endpoint' }, 404);
  } catch (e) {
    return ok({ error: e.message || 'Server error' }, 500);
  }
}
