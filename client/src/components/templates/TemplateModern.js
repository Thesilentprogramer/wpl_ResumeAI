import React from 'react';

export default function TemplateModern({ data }) {
  const d = data || {};
  return (
    React.createElement('div', { className: 'p-6 bg-white text-slate-900' },
      React.createElement('div', { className: 'border-b-2 border-indigo-600 pb-3 mb-4' },
        React.createElement('div', { className: 'text-2xl font-extrabold' }, d.personal?.fullName),
        React.createElement('div', { className: 'text-slate-600' }, d.personal?.headline),
        React.createElement('div', { className: 'text-slate-600 text-sm' }, [d.personal?.email, d.personal?.phone, d.personal?.location].filter(Boolean).join(' • ')),
        React.createElement('div', { className: 'text-slate-600 text-sm' }, [d.personal?.website, d.personal?.linkedin, d.personal?.github].filter(Boolean).join(' • '))
      ),
      d.personal?.summary && (
        React.createElement('div', { className: 'mb-4' },
          React.createElement('div', { className: 'font-bold text-indigo-700' }, 'Summary'),
          React.createElement('div', { className: 'whitespace-pre-line' }, d.personal.summary)
        )
      ),
      Array.isArray(d.experience) && d.experience.length > 0 && (
        React.createElement('div', { className: 'mb-4' },
          React.createElement('div', { className: 'font-bold text-indigo-700' }, 'Experience'),
          d.experience.map((x, i) => (
            React.createElement('div', { key: i, className: 'mt-2' },
              React.createElement('div', { className: 'font-semibold' }, `${x.role} — ${x.company}`),
              React.createElement('div', { className: 'text-sm text-slate-600' }, [x.startDate, x.endDate, x.location].filter(Boolean).join(' • ')),
              React.createElement('ul', { className: 'list-disc ml-5' },
                (x.highlights || []).map((h, idx) => React.createElement('li', { key: idx }, h))
              )
            )
          ))
        )
      ),
      Array.isArray(d.education) && d.education.length > 0 && (
        React.createElement('div', { className: 'mb-4' },
          React.createElement('div', { className: 'font-bold text-indigo-700' }, 'Education'),
          d.education.map((e, i) => (
            React.createElement('div', { key: i, className: 'mt-2' },
              React.createElement('div', { className: 'font-semibold' }, `${e.degree}${e.field ? ', ' + e.field : ''} — ${e.institution}`),
              React.createElement('div', { className: 'text-sm text-slate-600' }, [e.startDate, e.endDate, e.location].filter(Boolean).join(' • ')),
              e.details && React.createElement('div', { className: 'whitespace-pre-line' }, e.details)
            )
          ))
        )
      ),
      Array.isArray(d.skills) && d.skills.length > 0 && (
        React.createElement('div', { className: 'mb-2' },
          React.createElement('div', { className: 'font-bold text-indigo-700' }, 'Skills'),
          React.createElement('div', { className: 'mt-1' },
            d.skills.map((s, i) => (
              React.createElement('span', { key: i, className: 'inline-block text-sm bg-indigo-50 text-indigo-800 px-2 py-0.5 rounded-full mr-1 mb-1' }, s)
            ))
          )
        )
      ),
      Array.isArray(d.projects) && d.projects.length > 0 && (
        React.createElement('div', { className: 'mb-2' },
          React.createElement('div', { className: 'font-bold text-indigo-700' }, 'Projects'),
          d.projects.map((p, i) => (
            React.createElement('div', { key: i, className: 'mt-2' },
              React.createElement('div', { className: 'font-semibold' }, p.heading),
              React.createElement('div', { className: 'whitespace-pre-line' }, p.content)
            )
          ))
        )
      )
    )
  );
}


