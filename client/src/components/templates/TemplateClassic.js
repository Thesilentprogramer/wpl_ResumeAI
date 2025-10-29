import React from 'react';

export default function TemplateClassic({ data }) {
  const d = data || {};
  return (
    React.createElement('div', { className: 'p-6 bg-white text-black' },
      React.createElement('div', { className: 'text-center mb-4' },
        React.createElement('div', { className: 'text-2xl font-bold' }, d.personal?.fullName),
        React.createElement('div', { className: 'text-sm' }, [d.personal?.email, d.personal?.phone, d.personal?.location].filter(Boolean).join(' | ')),
        React.createElement('div', { className: 'text-xs text-gray-600' }, [d.personal?.website, d.personal?.linkedin, d.personal?.github].filter(Boolean).join(' | '))
      ),
      d.personal?.summary && (
        React.createElement('div', { className: 'mb-3' },
          React.createElement('div', { className: 'uppercase tracking-wide text-sm font-bold' }, 'Summary'),
          React.createElement('div', { className: 'border-t border-gray-300 mt-1 pt-2 whitespace-pre-line' }, d.personal.summary)
        )
      ),
      Array.isArray(d.experience) && d.experience.length > 0 && (
        React.createElement('div', { className: 'mb-3' },
          React.createElement('div', { className: 'uppercase tracking-wide text-sm font-bold' }, 'Experience'),
          React.createElement('div', { className: 'border-t border-gray-300 mt-1 pt-2 space-y-2' },
            d.experience.map((x, i) => (
              React.createElement('div', { key: i },
                React.createElement('div', { className: 'font-semibold' }, `${x.role} - ${x.company}`),
                React.createElement('div', { className: 'text-xs text-gray-600' }, [x.startDate, x.endDate, x.location].filter(Boolean).join(' | ')),
                React.createElement('ul', { className: 'list-disc ml-5' }, (x.highlights || []).map((h, idx) => React.createElement('li', { key: idx }, h)))
              )
            ))
          )
        )
      ),
      Array.isArray(d.education) && d.education.length > 0 && (
        React.createElement('div', { className: 'mb-3' },
          React.createElement('div', { className: 'uppercase tracking-wide text-sm font-bold' }, 'Education'),
          React.createElement('div', { className: 'border-t border-gray-300 mt-1 pt-2 space-y-2' },
            d.education.map((e, i) => (
              React.createElement('div', { key: i },
                React.createElement('div', { className: 'font-semibold' }, e.institution),
                React.createElement('div', null, `${e.degree}${e.field ? ', ' + e.field : ''}`),
                React.createElement('div', { className: 'text-xs text-gray-600' }, [e.startDate, e.endDate, e.location].filter(Boolean).join(' | '))
              )
            ))
          )
        )
      ),
      Array.isArray(d.skills) && d.skills.length > 0 && (
        React.createElement('div', { className: 'mb-3' },
          React.createElement('div', { className: 'uppercase tracking-wide text-sm font-bold' }, 'Skills'),
          React.createElement('div', { className: 'border-t border-gray-300 mt-1 pt-2 text-sm' }, (d.skills || []).join(' • '))
        )
      ),
      Array.isArray(d.projects) && d.projects.length > 0 && (
        React.createElement('div', { className: 'mb-3' },
          React.createElement('div', { className: 'uppercase tracking-wide text-sm font-bold' }, 'Projects'),
          React.createElement('div', { className: 'border-t border-gray-300 mt-1 pt-2 space-y-2' },
            d.projects.map((p, i) => (
              React.createElement('div', { key: i },
                React.createElement('div', { className: 'font-semibold' }, p.heading),
                React.createElement('div', { className: 'whitespace-pre-line' }, p.content)
              )
            ))
          )
        )
      )
    )
  );
}


