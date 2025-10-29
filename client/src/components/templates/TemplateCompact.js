import React from 'react';

export default function TemplateCompact({ data }) {
  const d = data || {};
  return (
    React.createElement('div', { className: 'p-5 bg-white text-slate-900 text-sm' },
      React.createElement('div', { className: 'flex items-baseline justify-between' },
        React.createElement('div', { className: 'text-xl font-bold' }, d.personal?.fullName),
        React.createElement('div', { className: 'text-slate-600' }, [d.personal?.email, d.personal?.phone].filter(Boolean).join(' • '))
      ),
      d.personal?.summary && (
        React.createElement('div', { className: 'mt-2 whitespace-pre-line' }, d.personal.summary)
      ),
      Array.isArray(d.experience) && d.experience.length > 0 && (
        React.createElement('div', { className: 'mt-3' },
          React.createElement('div', { className: 'font-semibold' }, 'Experience'),
          d.experience.map((x, i) => (
            React.createElement('div', { key: i, className: 'mt-1' },
              React.createElement('div', null, `${x.role} — ${x.company}`),
              React.createElement('div', { className: 'text-xs text-slate-600' }, [x.startDate, x.endDate, x.location].filter(Boolean).join(' • '))
            )
          ))
        )
      ),
      Array.isArray(d.skills) && d.skills.length > 0 && (
        React.createElement('div', { className: 'mt-3' },
          React.createElement('div', { className: 'font-semibold' }, 'Skills'),
          React.createElement('div', null, (d.skills || []).join(', '))
        )
      )
    )
  );
}


