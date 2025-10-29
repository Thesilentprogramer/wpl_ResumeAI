import React from 'react';

export default function TemplateSidebarBlue({ data }) {
  const d = data || {};
  return (
    React.createElement('div', { className: 'grid grid-cols-3 bg-white text-slate-900' },
      React.createElement('div', { className: 'col-span-1 bg-sky-800 text-white p-6' },
        React.createElement('div', { className: 'text-2xl font-extrabold' }, d.personal?.fullName),
        React.createElement('div', { className: 'opacity-90' }, d.personal?.headline),
        React.createElement('div', { className: 'mt-6 font-bold' }, 'Contact'),
        React.createElement('div', { className: 'text-sm mt-2 space-y-1' },
          [d.personal?.location && React.createElement('div', { key: 'loc' }, d.personal.location),
          d.personal?.phone && React.createElement('div', { key: 'ph' }, d.personal.phone),
          d.personal?.email && React.createElement('div', { key: 'em' }, d.personal.email)].filter(Boolean)
        ),
        Array.isArray(d.skills) && d.skills.length > 0 && (
          React.createElement(React.Fragment, null,
            React.createElement('div', { className: 'mt-6 font-bold' }, 'Skills'),
            React.createElement('ul', { className: 'mt-2 text-sm space-y-1 list-disc ml-5' },
              d.skills.map((s, i) => React.createElement('li', { key: i }, s))
            )
          )
        )
      ),
      React.createElement('div', { className: 'col-span-2 p-6' },
        d.personal?.summary && (
          React.createElement('div', { className: 'mb-4' },
            React.createElement('div', { className: 'text-sky-700 font-bold' }, 'Summary'),
            React.createElement('div', { className: 'whitespace-pre-line text-sm' }, d.personal.summary)
          )
        ),
        Array.isArray(d.experience) && d.experience.length > 0 && (
          React.createElement('div', { className: 'mb-4' },
            React.createElement('div', { className: 'text-sky-700 font-bold' }, 'Work History'),
            d.experience.map((x, i) => (
              React.createElement('div', { key: i, className: 'mt-2' },
                React.createElement('div', { className: 'font-semibold' }, `${x.role} — ${x.company}`),
                React.createElement('div', { className: 'text-xs text-slate-600' }, [x.startDate, x.endDate, x.location].filter(Boolean).join(' • ')),
                React.createElement('ul', { className: 'list-disc ml-5' }, (x.highlights || []).map((h, idx) => React.createElement('li', { key: idx }, h)))
              )
            ))
          )
        ),
        Array.isArray(d.education) && d.education.length > 0 && (
          React.createElement('div', null,
            React.createElement('div', { className: 'text-sky-700 font-bold' }, 'Education'),
            d.education.map((e, i) => (
              React.createElement('div', { key: i, className: 'mt-2' },
                React.createElement('div', { className: 'font-semibold' }, `${e.degree}${e.field ? ', ' + e.field : ''}`),
                React.createElement('div', { className: 'text-sm' }, e.institution)
              )
            ))
          )
        )
      )
    )
  );
}


