import React from 'react';

export default function TemplateTwoColumn({ data }) {
  const d = data || {};
  return (
    React.createElement('div', { className: 'p-6 bg-white text-slate-900' },
      React.createElement('div', { className: 'text-2xl font-extrabold' }, d.personal?.fullName),
      React.createElement('div', { className: 'text-slate-600' }, d.personal?.headline),
      React.createElement('div', { className: 'text-xs text-slate-500 mb-4' }, [d.personal?.website, d.personal?.linkedin, d.personal?.github].filter(Boolean).join(' • ')),
      React.createElement('div', { className: 'grid grid-cols-3 gap-4' },
        React.createElement('div', { className: 'col-span-1' },
          Array.isArray(d.skills) && d.skills.length > 0 && (
            React.createElement('div', { className: 'mb-4' },
              React.createElement('div', { className: 'font-bold' }, 'Skills'),
              React.createElement('ul', { className: 'list-disc ml-5 text-sm' }, d.skills.map((s, i) => React.createElement('li', { key: i }, s)))
            )
          ),
          Array.isArray(d.education) && d.education.length > 0 && (
            React.createElement('div', null,
              React.createElement('div', { className: 'font-bold' }, 'Education'),
              d.education.map((e, i) => (
                React.createElement('div', { key: i, className: 'mt-2 text-sm' },
                  React.createElement('div', { className: 'font-semibold' }, e.institution),
                  React.createElement('div', null, `${e.degree}${e.field ? ', ' + e.field : ''}`)
                )
              ))
            )
          )
        ),
        React.createElement('div', { className: 'col-span-2' },
          d.personal?.summary && (
            React.createElement('div', { className: 'mb-3' },
              React.createElement('div', { className: 'font-bold' }, 'Summary'),
              React.createElement('div', { className: 'whitespace-pre-line text-sm' }, d.personal.summary)
            )
          ),
          Array.isArray(d.experience) && d.experience.length > 0 && (
            React.createElement('div', { className: 'mb-3' },
              React.createElement('div', { className: 'font-bold' }, 'Experience'),
              d.experience.map((x, i) => (
                React.createElement('div', { key: i, className: 'mt-2' },
                  React.createElement('div', { className: 'font-semibold' }, `${x.role} — ${x.company}`),
                  React.createElement('div', { className: 'text-xs text-slate-600' }, [x.startDate, x.endDate, x.location].filter(Boolean).join(' • ')),
                  React.createElement('ul', { className: 'list-disc ml-5' }, (x.highlights || []).map((h, idx) => React.createElement('li', { key: idx }, h)))
                )
              ))
            )
          ),
          Array.isArray(d.projects) && d.projects.length > 0 && (
            React.createElement('div', null,
              React.createElement('div', { className: 'font-bold' }, 'Projects'),
              d.projects.map((p, i) => (
                React.createElement('div', { key: i, className: 'mt-2' },
                  React.createElement('div', { className: 'font-semibold' }, p.heading),
                  React.createElement('div', { className: 'whitespace-pre-line text-sm' }, p.content)
                )
              ))
            )
          )
        )
      )
    )
  );
}


