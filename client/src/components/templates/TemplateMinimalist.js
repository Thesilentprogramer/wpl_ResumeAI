import React from 'react';

export default function TemplateMinimalist({ data }) {
  const d = data || {};
  return (
    React.createElement('div', { className: 'p-6 bg-white text-slate-900' },
      React.createElement('div', { className: 'text-xl font-semibold' }, d.personal?.fullName),
      React.createElement('div', { className: 'text-sm text-slate-600' }, [d.personal?.email, d.personal?.phone].filter(Boolean).join(' · ')),
      React.createElement('div', { className: 'text-xs text-slate-500 mb-4' }, [d.personal?.website, d.personal?.linkedin, d.personal?.github].filter(Boolean).join(' · ')),
      d.personal?.summary && React.createElement('div', { className: 'mb-4 text-sm whitespace-pre-line' }, d.personal.summary),
      Array.isArray(d.experience) && d.experience.length > 0 && (
        React.createElement('div', { className: 'mb-3' },
          React.createElement('div', { className: 'font-semibold' }, 'Experience'),
          d.experience.map((x, i) => (
            React.createElement('div', { key: i, className: 'mt-2' },
              React.createElement('div', null, `${x.role} — ${x.company}`),
              React.createElement('div', { className: 'text-xs text-slate-500' }, [x.startDate, x.endDate, x.location].filter(Boolean).join(' · '))
            )
          ))
        )
      ),
      Array.isArray(d.education) && d.education.length > 0 && (
        React.createElement('div', { className: 'mb-3' },
          React.createElement('div', { className: 'font-semibold' }, 'Education'),
          d.education.map((e, i) => (
            React.createElement('div', { key: i, className: 'mt-2' },
              React.createElement('div', null, `${e.degree}${e.field ? ', ' + e.field : ''} — ${e.institution}`)
            )
          ))
        )
      ),
      Array.isArray(d.skills) && d.skills.length > 0 && (
        React.createElement('div', { className: 'mb-3' },
          React.createElement('div', { className: 'font-semibold' }, 'Skills'),
          React.createElement('div', { className: 'text-sm' }, (d.skills || []).join(', '))
        )
      )
    )
  );
}


