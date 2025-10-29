import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { saveResume } from '../api';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const ResumeEditor = ({ template, onBack, resumeId: initialResumeId }) => {
  const { theme } = useTheme();
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      github: '',
      portfolio: '',
    },
    professionalSummary: '',
    skills: [],
    experience: [],
    education: [],
    projects: [],
    certifications: [],
    languages: [],
  });

  const [saving, setSaving] = useState(false);
  const [resumeId, setResumeId] = useState(initialResumeId || null);
  const [showPreview, setShowPreview] = useState(false);
  const resumePreviewRef = useRef(null);

  const handleInputChange = (section, field, value) => {
    setResumeData((prev) => {
      // If field is empty string, it means section is a top-level field (like professionalSummary)
      if (field === '' || field === null || field === undefined) {
        return {
          ...prev,
          [section]: value,
        };
      }
      // Otherwise, it's a nested object (like personalInfo)
      return {
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value,
        },
      };
    });
  };

  const handleArrayChange = (section, index, field, value) => {
    setResumeData((prev) => {
      const newArray = [...prev[section]];
      newArray[index] = { ...newArray[index], [field]: value };
      return { ...prev, [section]: newArray };
    });
  };

  const addArrayItem = (section) => {
    const defaultItem = {
      experience: { company: '', position: '', location: '', startDate: '', endDate: '', description: '', achievements: [] },
      education: { institution: '', degree: '', field: '', location: '', startDate: '', endDate: '', gpa: '' },
      projects: { name: '', description: '', technologies: '', url: '', startDate: '', endDate: '' },
      certifications: { name: '', issuer: '', date: '', credentialId: '' },
    };

    setResumeData((prev) => ({
      ...prev,
      [section]: [...prev[section], defaultItem[section] || {}],
    }));
  };

  const removeArrayItem = (section, index) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index),
    }));
  };


  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await saveResume({
        templateId: template.id,
        resumeData,
        resumeId,
      });
      setResumeId(response.resumeId);
      alert('Resume saved successfully!');
    } catch (error) {
      console.error('Error saving resume:', error);
      alert('Failed to save resume. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const generateResumeHTML = () => {
    const toStringSafe = (value) => {
      if (value == null) return '';
      if (Array.isArray(value)) return value.map((v) => toStringSafe(v)).filter(Boolean).join(', ');
      if (typeof value === 'object') return '';
      return String(value);
    };

    const toMultilineHTML = (value) => {
      const text = toStringSafe(value);
      return text.replace(/\n/g, '<br>');
    };

    const toListHTML = (arr) => {
      if (!arr || (Array.isArray(arr) && arr.length === 0)) return '';
      const items = (Array.isArray(arr) ? arr : [arr])
        .map((v) => toStringSafe(v))
        .filter(Boolean)
        .map((v) => `<span class="skill-tag">${v}</span>`)
        .join('');
      return items;
    };

    // Template-specific generators
    function generateGoogleTemplate(toStringSafe, toMultilineHTML, toListHTML) {
      return `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <style>
              * { margin: 0; padding: 0; box-sizing: border-box; }
              body { font-family: 'Roboto', sans-serif; color: #333; background: white; padding: 40px; }
              .resume-container { max-width: 900px; margin: 0 auto; background: white; display: flex; }
              .sidebar { width: 250px; background: #4285F4; color: white; padding: 40px 20px; }
              .main-content { flex: 1; padding: 40px; }
              .name { font-size: 32px; font-weight: 700; margin-bottom: 10px; color: white; }
              .contact-info { font-size: 12px; line-height: 1.8; }
              .contact-item { margin-bottom: 8px; }
              .section { margin-bottom: 25px; }
              .section-title { font-size: 18px; font-weight: 700; color: #4285F4; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 1px; }
              .item { margin-bottom: 18px; padding-bottom: 15px; border-bottom: 1px solid #eee; }
              .item:last-child { border-bottom: none; }
              .item-title { font-weight: 700; font-size: 16px; color: #333; }
              .item-subtitle { font-size: 13px; color: #666; margin-top: 3px; }
              .item-date { font-size: 12px; color: #999; margin-top: 5px; }
              .item-description { font-size: 14px; line-height: 1.7; color: #555; margin-top: 8px; }
              .skills-list { display: flex; flex-wrap: wrap; gap: 8px; }
              .skill-tag { background: #34A853; color: white; padding: 4px 10px; border-radius: 3px; font-size: 11px; }
              .summary { font-size: 14px; line-height: 1.7; color: #555; }
            </style>
          </head>
          <body>
            <div class="resume-container">
              <div class="sidebar">
                <div class="name">${toStringSafe(resumeData.personalInfo?.fullName) || 'Your Name'}</div>
                <div class="contact-info">
                  ${toStringSafe(resumeData.personalInfo?.email) ? `<div class="contact-item">Email: ${toStringSafe(resumeData.personalInfo?.email)}</div>` : ''}
                  ${toStringSafe(resumeData.personalInfo?.phone) ? `<div class="contact-item">Phone: ${toStringSafe(resumeData.personalInfo?.phone)}</div>` : ''}
                  ${toStringSafe(resumeData.personalInfo?.location) ? `<div class="contact-item">Location: ${toStringSafe(resumeData.personalInfo?.location)}</div>` : ''}
                  ${toStringSafe(resumeData.personalInfo?.linkedin) ? `<div class="contact-item">LinkedIn: ${toStringSafe(resumeData.personalInfo?.linkedin)}</div>` : ''}
                  ${toStringSafe(resumeData.personalInfo?.github) ? `<div class="contact-item">GitHub: ${toStringSafe(resumeData.personalInfo?.github)}</div>` : ''}
                </div>
                ${(resumeData.skills && resumeData.skills.length > 0) ? `
                <div class="section">
                  <div class="section-title" style="color: white;">Skills</div>
                  <div class="skills-list">
                    ${toListHTML(resumeData.skills)}
                  </div>
                </div>
                ` : ''}
              </div>
              <div class="main-content">
                ${toStringSafe(resumeData.professionalSummary) ? `
                <div class="section">
                  <div class="section-title">Professional Summary</div>
                  <div class="summary">${toMultilineHTML(resumeData.professionalSummary)}</div>
                </div>
                ` : ''}
                ${(resumeData.experience && resumeData.experience.length > 0) ? `
                <div class="section">
                  <div class="section-title">Experience</div>
                  ${resumeData.experience.map(exp => `
                    <div class="item">
                      <div class="item-title">${toStringSafe(exp?.position)}</div>
                      <div class="item-subtitle">${toStringSafe(exp?.company)} ${toStringSafe(exp?.location) ? `| ${toStringSafe(exp?.location)}` : ''}</div>
                      <div class="item-date">${toStringSafe(exp?.startDate)} - ${toStringSafe(exp?.endDate) || 'Present'}</div>
                      <div class="item-description">${toMultilineHTML(exp?.description)}</div>
                    </div>
                  `).join('')}
                </div>
                ` : ''}
                ${(resumeData.education && resumeData.education.length > 0) ? `
                <div class="section">
                  <div class="section-title">Education</div>
                  ${resumeData.education.map(edu => `
                    <div class="item">
                      <div class="item-title">${toStringSafe(edu?.degree)} ${toStringSafe(edu?.field) ? `in ${toStringSafe(edu?.field)}` : ''}</div>
                      <div class="item-subtitle">${toStringSafe(edu?.institution)} ${toStringSafe(edu?.location) ? `| ${toStringSafe(edu?.location)}` : ''}</div>
                      <div class="item-date">${toStringSafe(edu?.startDate)} - ${toStringSafe(edu?.endDate) || 'Present'}</div>
                      ${toStringSafe(edu?.gpa) ? `<div class="item-description">GPA: ${toStringSafe(edu?.gpa)}</div>` : ''}
                    </div>
                  `).join('')}
                </div>
                ` : ''}
                ${(resumeData.projects && resumeData.projects.length > 0) ? `
                <div class="section">
                  <div class="section-title">Projects</div>
                  ${resumeData.projects.map(proj => `
                    <div class="item">
                      <div class="item-title">${toStringSafe(proj?.name)}</div>
                      ${toStringSafe(proj?.url) ? `<div class="item-subtitle">${toStringSafe(proj?.url)}</div>` : ''}
                      <div class="item-date">${toStringSafe(proj?.startDate)} - ${toStringSafe(proj?.endDate) || 'Present'}</div>
                      <div class="item-description">${toMultilineHTML(proj?.description)}</div>
                      ${toStringSafe(proj?.technologies) ? `<div class="item-description"><strong>Technologies:</strong> ${toStringSafe(proj?.technologies)}</div>` : ''}
                    </div>
                  `).join('')}
                </div>
                ` : ''}
              </div>
            </div>
          </body>
        </html>
      `;
    }

    function generateMicrosoftTemplate(toStringSafe, toMultilineHTML, toListHTML) {
      return `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <style>
              * { margin: 0; padding: 0; box-sizing: border-box; }
              body { font-family: 'Segoe UI', sans-serif; color: #333; background: white; padding: 40px; }
              .resume-container { max-width: 850px; margin: 0 auto; background: white; }
              .header { background: linear-gradient(135deg, #0078D4 0%, #00B4D4 100%); color: white; padding: 40px; text-align: center; }
              .name { font-size: 36px; font-weight: 600; margin-bottom: 15px; }
              .contact-info { font-size: 13px; display: flex; justify-content: center; gap: 20px; flex-wrap: wrap; }
              .section { margin: 30px 40px; }
              .section-title { font-size: 20px; font-weight: 600; color: #0078D4; margin-bottom: 15px; padding-left: 15px; border-left: 4px solid #FFB900; }
              .item { margin-bottom: 20px; padding-left: 19px; }
              .item-title { font-weight: 600; font-size: 17px; color: #333; }
              .item-subtitle { font-size: 14px; color: #666; margin-top: 2px; }
              .item-date { font-size: 12px; color: #999; margin-top: 5px; font-style: italic; }
              .item-description { font-size: 14px; line-height: 1.8; color: #555; margin-top: 8px; }
              .skills-list { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-top: 10px; }
              .skill-tag { background: #FFB900; color: #333; padding: 6px 12px; border-radius: 4px; font-size: 12px; text-align: center; font-weight: 500; }
              .summary { font-size: 14px; line-height: 1.8; color: #555; }
            </style>
          </head>
          <body>
            <div class="resume-container">
              <div class="header">
                <div class="name">${toStringSafe(resumeData.personalInfo?.fullName) || 'Your Name'}</div>
                <div class="contact-info">
                  ${toStringSafe(resumeData.personalInfo?.email) ? `<span>Email: ${toStringSafe(resumeData.personalInfo?.email)}</span>` : ''}
                  ${toStringSafe(resumeData.personalInfo?.phone) ? `<span>Phone: ${toStringSafe(resumeData.personalInfo?.phone)}</span>` : ''}
                  ${toStringSafe(resumeData.personalInfo?.location) ? `<span>Location: ${toStringSafe(resumeData.personalInfo?.location)}</span>` : ''}
                  ${toStringSafe(resumeData.personalInfo?.linkedin) ? `<span>LinkedIn: ${toStringSafe(resumeData.personalInfo?.linkedin)}</span>` : ''}
                  ${toStringSafe(resumeData.personalInfo?.github) ? `<span>GitHub: ${toStringSafe(resumeData.personalInfo?.github)}</span>` : ''}
                </div>
              </div>
              ${toStringSafe(resumeData.professionalSummary) ? `
              <div class="section">
                <div class="section-title">Professional Summary</div>
                <div class="summary">${toMultilineHTML(resumeData.professionalSummary)}</div>
              </div>
              ` : ''}
              ${(resumeData.experience && resumeData.experience.length > 0) ? `
              <div class="section">
                <div class="section-title">Experience</div>
                ${resumeData.experience.map(exp => `
                  <div class="item">
                    <div class="item-title">${toStringSafe(exp?.position)}</div>
                    <div class="item-subtitle">${toStringSafe(exp?.company)} ${toStringSafe(exp?.location) ? `| ${toStringSafe(exp?.location)}` : ''}</div>
                    <div class="item-date">${toStringSafe(exp?.startDate)} - ${toStringSafe(exp?.endDate) || 'Present'}</div>
                    <div class="item-description">${toMultilineHTML(exp?.description)}</div>
                  </div>
                `).join('')}
              </div>
              ` : ''}
              ${(resumeData.skills && resumeData.skills.length > 0) ? `
              <div class="section">
                <div class="section-title">Skills</div>
                <div class="skills-list">
                  ${toListHTML(resumeData.skills)}
                </div>
              </div>
              ` : ''}
              ${(resumeData.education && resumeData.education.length > 0) ? `
              <div class="section">
                <div class="section-title">Education</div>
                ${resumeData.education.map(edu => `
                  <div class="item">
                    <div class="item-title">${toStringSafe(edu?.degree)} ${toStringSafe(edu?.field) ? `in ${toStringSafe(edu?.field)}` : ''}</div>
                    <div class="item-subtitle">${toStringSafe(edu?.institution)} ${toStringSafe(edu?.location) ? `| ${toStringSafe(edu?.location)}` : ''}</div>
                    <div class="item-date">${toStringSafe(edu?.startDate)} - ${toStringSafe(edu?.endDate) || 'Present'}</div>
                    ${toStringSafe(edu?.gpa) ? `<div class="item-description">GPA: ${toStringSafe(edu?.gpa)}</div>` : ''}
                  </div>
                `).join('')}
              </div>
              ` : ''}
              ${(resumeData.projects && resumeData.projects.length > 0) ? `
              <div class="section">
                <div class="section-title">Projects</div>
                ${resumeData.projects.map(proj => `
                  <div class="item">
                    <div class="item-title">${toStringSafe(proj?.name)}</div>
                    ${toStringSafe(proj?.url) ? `<div class="item-subtitle">${toStringSafe(proj?.url)}</div>` : ''}
                    <div class="item-date">${toStringSafe(proj?.startDate)} - ${toStringSafe(proj?.endDate) || 'Present'}</div>
                    <div class="item-description">${toMultilineHTML(proj?.description)}</div>
                    ${toStringSafe(proj?.technologies) ? `<div class="item-description"><strong>Technologies:</strong> ${toStringSafe(proj?.technologies)}</div>` : ''}
                  </div>
                `).join('')}
              </div>
              ` : ''}
            </div>
          </body>
        </html>
      `;
    }

    function generateAppleTemplate(toStringSafe, toMultilineHTML, toListHTML) {
      return `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <style>
              * { margin: 0; padding: 0; box-sizing: border-box; }
              body { font-family: -apple-system, 'SF Pro Display', sans-serif; color: #1d1d1f; background: white; padding: 60px 40px; }
              .resume-container { max-width: 700px; margin: 0 auto; }
              .header { text-align: center; margin-bottom: 50px; padding-bottom: 30px; border-bottom: 1px solid #d2d2d7; }
              .name { font-size: 48px; font-weight: 300; letter-spacing: -1px; margin-bottom: 20px; color: #1d1d1f; }
              .contact-info { font-size: 13px; color: #86868b; display: flex; justify-content: center; gap: 25px; flex-wrap: wrap; }
              .section { margin-bottom: 40px; }
              .section-title { font-size: 24px; font-weight: 400; color: #1d1d1f; margin-bottom: 20px; text-transform: uppercase; letter-spacing: 2px; }
              .item { margin-bottom: 30px; }
              .item-title { font-weight: 500; font-size: 18px; color: #1d1d1f; margin-bottom: 5px; }
              .item-subtitle { font-size: 14px; color: #86868b; margin-bottom: 3px; }
              .item-date { font-size: 12px; color: #86868b; margin-bottom: 10px; }
              .item-description { font-size: 15px; line-height: 1.9; color: #1d1d1f; margin-top: 10px; }
              .skills-list { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px; }
              .skill-tag { background: #1d1d1f; color: white; padding: 6px 14px; border-radius: 20px; font-size: 11px; font-weight: 400; }
              .summary { font-size: 16px; line-height: 1.8; color: #1d1d1f; font-weight: 300; }
            </style>
          </head>
          <body>
            <div class="resume-container">
              <div class="header">
                <div class="name">${toStringSafe(resumeData.personalInfo?.fullName) || 'Your Name'}</div>
                <div class="contact-info">
                  ${toStringSafe(resumeData.personalInfo?.email) ? `<span>${toStringSafe(resumeData.personalInfo?.email)}</span>` : ''}
                  ${toStringSafe(resumeData.personalInfo?.phone) ? `<span>${toStringSafe(resumeData.personalInfo?.phone)}</span>` : ''}
                  ${toStringSafe(resumeData.personalInfo?.location) ? `<span>${toStringSafe(resumeData.personalInfo?.location)}</span>` : ''}
                  ${toStringSafe(resumeData.personalInfo?.linkedin) ? `<span>${toStringSafe(resumeData.personalInfo?.linkedin)}</span>` : ''}
                  ${toStringSafe(resumeData.personalInfo?.github) ? `<span>${toStringSafe(resumeData.personalInfo?.github)}</span>` : ''}
                </div>
              </div>
              ${toStringSafe(resumeData.professionalSummary) ? `
              <div class="section">
                <div class="section-title">Summary</div>
                <div class="summary">${toMultilineHTML(resumeData.professionalSummary)}</div>
              </div>
              ` : ''}
              ${(resumeData.experience && resumeData.experience.length > 0) ? `
              <div class="section">
                <div class="section-title">Experience</div>
                ${resumeData.experience.map(exp => `
                  <div class="item">
                    <div class="item-title">${toStringSafe(exp?.position)}</div>
                    <div class="item-subtitle">${toStringSafe(exp?.company)} ${toStringSafe(exp?.location) ? `• ${toStringSafe(exp?.location)}` : ''}</div>
                    <div class="item-date">${toStringSafe(exp?.startDate)} — ${toStringSafe(exp?.endDate) || 'Present'}</div>
                    <div class="item-description">${toMultilineHTML(exp?.description)}</div>
                  </div>
                `).join('')}
              </div>
              ` : ''}
              ${(resumeData.education && resumeData.education.length > 0) ? `
              <div class="section">
                <div class="section-title">Education</div>
                ${resumeData.education.map(edu => `
                  <div class="item">
                    <div class="item-title">${toStringSafe(edu?.degree)} ${toStringSafe(edu?.field) ? `— ${toStringSafe(edu?.field)}` : ''}</div>
                    <div class="item-subtitle">${toStringSafe(edu?.institution)} ${toStringSafe(edu?.location) ? `• ${toStringSafe(edu?.location)}` : ''}</div>
                    <div class="item-date">${toStringSafe(edu?.startDate)} — ${toStringSafe(edu?.endDate) || 'Present'}</div>
                    ${toStringSafe(edu?.gpa) ? `<div class="item-description">GPA: ${toStringSafe(edu?.gpa)}</div>` : ''}
                  </div>
                `).join('')}
              </div>
              ` : ''}
              ${(resumeData.skills && resumeData.skills.length > 0) ? `
              <div class="section">
                <div class="section-title">Skills</div>
                <div class="skills-list">
                  ${toListHTML(resumeData.skills)}
                </div>
              </div>
              ` : ''}
              ${(resumeData.projects && resumeData.projects.length > 0) ? `
              <div class="section">
                <div class="section-title">Projects</div>
                ${resumeData.projects.map(proj => `
                  <div class="item">
                    <div class="item-title">${toStringSafe(proj?.name)}</div>
                    ${toStringSafe(proj?.url) ? `<div class="item-subtitle">${toStringSafe(proj?.url)}</div>` : ''}
                    <div class="item-date">${toStringSafe(proj?.startDate)} — ${toStringSafe(proj?.endDate) || 'Present'}</div>
                    <div class="item-description">${toMultilineHTML(proj?.description)}</div>
                    ${toStringSafe(proj?.technologies) ? `<div class="item-description"><strong>Technologies:</strong> ${toStringSafe(proj?.technologies)}</div>` : ''}
                  </div>
                `).join('')}
              </div>
              ` : ''}
            </div>
          </body>
        </html>
      `;
    }

    function generateAmazonTemplate(toStringSafe, toMultilineHTML, toListHTML) {
      return `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <style>
              * { margin: 0; padding: 0; box-sizing: border-box; }
              body { font-family: 'Amazon Ember', Arial, sans-serif; color: #232f3e; background: white; padding: 30px; }
              .resume-container { max-width: 900px; margin: 0 auto; }
              .header { border-bottom: 4px solid #FF9900; padding-bottom: 20px; margin-bottom: 30px; }
              .name { font-size: 34px; font-weight: 700; color: #232f3e; margin-bottom: 12px; }
              .contact-info { font-size: 13px; color: #666; display: flex; gap: 20px; flex-wrap: wrap; }
              .section { margin-bottom: 28px; }
              .section-title { font-size: 19px; font-weight: 700; color: #232f3e; margin-bottom: 12px; border-left: 5px solid #FF9900; padding-left: 10px; }
              .item { margin-bottom: 16px; margin-left: 15px; }
              .item-title { font-weight: 600; font-size: 16px; color: #232f3e; }
              .item-subtitle { font-size: 13px; color: #666; margin-top: 2px; }
              .item-date { font-size: 12px; color: #888; margin-top: 3px; }
              .item-description { font-size: 13px; line-height: 1.7; color: #555; margin-top: 6px; }
              .item-description ul { margin-left: 20px; margin-top: 5px; }
              .item-description li { margin-bottom: 4px; }
              .skills-list { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; margin-top: 8px; }
              .skill-tag { background: #232f3e; color: white; padding: 5px 10px; border-radius: 3px; font-size: 11px; text-align: center; }
              .summary { font-size: 14px; line-height: 1.7; color: #555; }
            </style>
          </head>
          <body>
            <div class="resume-container">
              <div class="header">
                <div class="name">${toStringSafe(resumeData.personalInfo?.fullName) || 'Your Name'}</div>
                <div class="contact-info">
                  ${toStringSafe(resumeData.personalInfo?.email) ? `<span>${toStringSafe(resumeData.personalInfo?.email)}</span>` : ''}
                  ${toStringSafe(resumeData.personalInfo?.phone) ? `<span>${toStringSafe(resumeData.personalInfo?.phone)}</span>` : ''}
                  ${toStringSafe(resumeData.personalInfo?.location) ? `<span>${toStringSafe(resumeData.personalInfo?.location)}</span>` : ''}
                  ${toStringSafe(resumeData.personalInfo?.linkedin) ? `<span>${toStringSafe(resumeData.personalInfo?.linkedin)}</span>` : ''}
                  ${toStringSafe(resumeData.personalInfo?.github) ? `<span>${toStringSafe(resumeData.personalInfo?.github)}</span>` : ''}
                </div>
              </div>
              ${toStringSafe(resumeData.professionalSummary) ? `
              <div class="section">
                <div class="section-title">Professional Summary</div>
                <div class="summary">${toMultilineHTML(resumeData.professionalSummary)}</div>
              </div>
              ` : ''}
              ${(resumeData.experience && resumeData.experience.length > 0) ? `
              <div class="section">
                <div class="section-title">Professional Experience</div>
                ${resumeData.experience.map(exp => `
                  <div class="item">
                    <div class="item-title">${toStringSafe(exp?.position)}</div>
                    <div class="item-subtitle">${toStringSafe(exp?.company)} ${toStringSafe(exp?.location) ? `| ${toStringSafe(exp?.location)}` : ''}</div>
                    <div class="item-date">${toStringSafe(exp?.startDate)} - ${toStringSafe(exp?.endDate) || 'Present'}</div>
                    <div class="item-description">${toMultilineHTML(exp?.description)}</div>
                  </div>
                `).join('')}
              </div>
              ` : ''}
              ${(resumeData.skills && resumeData.skills.length > 0) ? `
              <div class="section">
                <div class="section-title">Technical Skills</div>
                <div class="skills-list">
                  ${toListHTML(resumeData.skills)}
                </div>
              </div>
              ` : ''}
              ${(resumeData.education && resumeData.education.length > 0) ? `
              <div class="section">
                <div class="section-title">Education</div>
                ${resumeData.education.map(edu => `
                  <div class="item">
                    <div class="item-title">${toStringSafe(edu?.degree)} ${toStringSafe(edu?.field) ? `in ${toStringSafe(edu?.field)}` : ''}</div>
                    <div class="item-subtitle">${toStringSafe(edu?.institution)} ${toStringSafe(edu?.location) ? `| ${toStringSafe(edu?.location)}` : ''}</div>
                    <div class="item-date">${toStringSafe(edu?.startDate)} - ${toStringSafe(edu?.endDate) || 'Present'}</div>
                    ${toStringSafe(edu?.gpa) ? `<div class="item-description">GPA: ${toStringSafe(edu?.gpa)}</div>` : ''}
                  </div>
                `).join('')}
              </div>
              ` : ''}
              ${(resumeData.projects && resumeData.projects.length > 0) ? `
              <div class="section">
                <div class="section-title">Projects</div>
                ${resumeData.projects.map(proj => `
                  <div class="item">
                    <div class="item-title">${toStringSafe(proj?.name)}</div>
                    ${toStringSafe(proj?.url) ? `<div class="item-subtitle">${toStringSafe(proj?.url)}</div>` : ''}
                    <div class="item-date">${toStringSafe(proj?.startDate)} - ${toStringSafe(proj?.endDate) || 'Present'}</div>
                    <div class="item-description">${toMultilineHTML(proj?.description)}</div>
                    ${toStringSafe(proj?.technologies) ? `<div class="item-description"><strong>Technologies:</strong> ${toStringSafe(proj?.technologies)}</div>` : ''}
                  </div>
                `).join('')}
              </div>
              ` : ''}
            </div>
          </body>
        </html>
      `;
    }

    function generateMetaTemplate(toStringSafe, toMultilineHTML, toListHTML) {
      return `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <style>
              * { margin: 0; padding: 0; box-sizing: border-box; }
              body { font-family: 'Facebook Sans', Arial, sans-serif; color: #1c1e21; background: #f2f3f5; padding: 30px; }
              .resume-container { max-width: 900px; margin: 0 auto; background: white; padding: 40px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
              .header { background: #1877F2; color: white; padding: 35px 40px; margin: -40px -40px 30px -40px; }
              .name { font-size: 38px; font-weight: 700; margin-bottom: 15px; }
              .contact-info { font-size: 13px; display: flex; gap: 25px; flex-wrap: wrap; opacity: 0.95; }
              .section { margin-bottom: 30px; }
              .section-title { font-size: 20px; font-weight: 600; color: #1877F2; margin-bottom: 15px; padding-bottom: 8px; border-bottom: 2px solid #42A5F5; }
              .item { margin-bottom: 20px; padding: 15px; background: #f8f9fa; border-radius: 8px; }
              .item-title { font-weight: 600; font-size: 17px; color: #1c1e21; }
              .item-subtitle { font-size: 14px; color: #65676b; margin-top: 3px; }
              .item-date { font-size: 12px; color: #8a8d91; margin-top: 5px; }
              .item-description { font-size: 14px; line-height: 1.7; color: #1c1e21; margin-top: 8px; }
              .skills-list { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px; }
              .skill-tag { background: #42A5F5; color: white; padding: 6px 12px; border-radius: 6px; font-size: 12px; font-weight: 500; }
              .summary { font-size: 14px; line-height: 1.8; color: #1c1e21; }
            </style>
          </head>
          <body>
            <div class="resume-container">
              <div class="header">
                <div class="name">${toStringSafe(resumeData.personalInfo?.fullName) || 'Your Name'}</div>
                <div class="contact-info">
                  ${toStringSafe(resumeData.personalInfo?.email) ? `<span>${toStringSafe(resumeData.personalInfo?.email)}</span>` : ''}
                  ${toStringSafe(resumeData.personalInfo?.phone) ? `<span>${toStringSafe(resumeData.personalInfo?.phone)}</span>` : ''}
                  ${toStringSafe(resumeData.personalInfo?.location) ? `<span>${toStringSafe(resumeData.personalInfo?.location)}</span>` : ''}
                  ${toStringSafe(resumeData.personalInfo?.linkedin) ? `<span>${toStringSafe(resumeData.personalInfo?.linkedin)}</span>` : ''}
                  ${toStringSafe(resumeData.personalInfo?.github) ? `<span>${toStringSafe(resumeData.personalInfo?.github)}</span>` : ''}
                </div>
              </div>
              ${toStringSafe(resumeData.professionalSummary) ? `
              <div class="section">
                <div class="section-title">About</div>
                <div class="summary">${toMultilineHTML(resumeData.professionalSummary)}</div>
              </div>
              ` : ''}
              ${(resumeData.experience && resumeData.experience.length > 0) ? `
              <div class="section">
                <div class="section-title">Experience</div>
                ${resumeData.experience.map(exp => `
                  <div class="item">
                    <div class="item-title">${toStringSafe(exp?.position)}</div>
                    <div class="item-subtitle">${toStringSafe(exp?.company)} ${toStringSafe(exp?.location) ? `• ${toStringSafe(exp?.location)}` : ''}</div>
                    <div class="item-date">${toStringSafe(exp?.startDate)} - ${toStringSafe(exp?.endDate) || 'Present'}</div>
                    <div class="item-description">${toMultilineHTML(exp?.description)}</div>
                  </div>
                `).join('')}
              </div>
              ` : ''}
              ${(resumeData.skills && resumeData.skills.length > 0) ? `
              <div class="section">
                <div class="section-title">Skills</div>
                <div class="skills-list">
                  ${toListHTML(resumeData.skills)}
                </div>
              </div>
              ` : ''}
              ${(resumeData.education && resumeData.education.length > 0) ? `
              <div class="section">
                <div class="section-title">Education</div>
                ${resumeData.education.map(edu => `
                  <div class="item">
                    <div class="item-title">${toStringSafe(edu?.degree)} ${toStringSafe(edu?.field) ? `in ${toStringSafe(edu?.field)}` : ''}</div>
                    <div class="item-subtitle">${toStringSafe(edu?.institution)} ${toStringSafe(edu?.location) ? `• ${toStringSafe(edu?.location)}` : ''}</div>
                    <div class="item-date">${toStringSafe(edu?.startDate)} - ${toStringSafe(edu?.endDate) || 'Present'}</div>
                    ${toStringSafe(edu?.gpa) ? `<div class="item-description">GPA: ${toStringSafe(edu?.gpa)}</div>` : ''}
                  </div>
                `).join('')}
              </div>
              ` : ''}
              ${(resumeData.projects && resumeData.projects.length > 0) ? `
              <div class="section">
                <div class="section-title">Projects</div>
                ${resumeData.projects.map(proj => `
                  <div class="item">
                    <div class="item-title">${toStringSafe(proj?.name)}</div>
                    ${toStringSafe(proj?.url) ? `<div class="item-subtitle">${toStringSafe(proj?.url)}</div>` : ''}
                    <div class="item-date">${toStringSafe(proj?.startDate)} - ${toStringSafe(proj?.endDate) || 'Present'}</div>
                    <div class="item-description">${toMultilineHTML(proj?.description)}</div>
                    ${toStringSafe(proj?.technologies) ? `<div class="item-description"><strong>Technologies:</strong> ${toStringSafe(proj?.technologies)}</div>` : ''}
                  </div>
                `).join('')}
              </div>
              ` : ''}
            </div>
          </body>
        </html>
      `;
    }

    function generateNetflixTemplate(toStringSafe, toMultilineHTML, toListHTML) {
      return `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <style>
              * { margin: 0; padding: 0; box-sizing: border-box; }
              body { font-family: 'Netflix Sans', Arial, sans-serif; color: #e5e5e5; background: #141414; padding: 40px; }
              .resume-container { max-width: 850px; margin: 0 auto; background: #1a1a1a; padding: 50px; }
              .header { text-align: center; margin-bottom: 40px; padding-bottom: 30px; border-bottom: 2px solid #E50914; }
              .name { font-size: 42px; font-weight: 700; color: #E50914; margin-bottom: 15px; letter-spacing: 1px; }
              .contact-info { font-size: 13px; color: #b3b3b3; display: flex; justify-content: center; gap: 20px; flex-wrap: wrap; }
              .section { margin-bottom: 35px; }
              .section-title { font-size: 22px; font-weight: 700; color: #E50914; margin-bottom: 18px; text-transform: uppercase; letter-spacing: 1.5px; }
              .item { margin-bottom: 25px; padding-left: 20px; border-left: 3px solid #E50914; }
              .item-title { font-weight: 600; font-size: 18px; color: #e5e5e5; }
              .item-subtitle { font-size: 14px; color: #b3b3b3; margin-top: 4px; }
              .item-date { font-size: 12px; color: #808080; margin-top: 5px; }
              .item-description { font-size: 14px; line-height: 1.8; color: #e5e5e5; margin-top: 10px; }
              .skills-list { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-top: 12px; }
              .skill-tag { background: #E50914; color: white; padding: 7px 14px; border-radius: 4px; font-size: 12px; text-align: center; font-weight: 600; }
              .summary { font-size: 15px; line-height: 1.8; color: #e5e5e5; }
            </style>
          </head>
          <body>
            <div class="resume-container">
              <div class="header">
                <div class="name">${toStringSafe(resumeData.personalInfo?.fullName) || 'Your Name'}</div>
                <div class="contact-info">
                  ${toStringSafe(resumeData.personalInfo?.email) ? `<span>${toStringSafe(resumeData.personalInfo?.email)}</span>` : ''}
                  ${toStringSafe(resumeData.personalInfo?.phone) ? `<span>${toStringSafe(resumeData.personalInfo?.phone)}</span>` : ''}
                  ${toStringSafe(resumeData.personalInfo?.location) ? `<span>${toStringSafe(resumeData.personalInfo?.location)}</span>` : ''}
                  ${toStringSafe(resumeData.personalInfo?.linkedin) ? `<span>${toStringSafe(resumeData.personalInfo?.linkedin)}</span>` : ''}
                  ${toStringSafe(resumeData.personalInfo?.github) ? `<span>${toStringSafe(resumeData.personalInfo?.github)}</span>` : ''}
                </div>
              </div>
              ${toStringSafe(resumeData.professionalSummary) ? `
              <div class="section">
                <div class="section-title">Summary</div>
                <div class="summary">${toMultilineHTML(resumeData.professionalSummary)}</div>
              </div>
              ` : ''}
              ${(resumeData.experience && resumeData.experience.length > 0) ? `
              <div class="section">
                <div class="section-title">Experience</div>
                ${resumeData.experience.map(exp => `
                  <div class="item">
                    <div class="item-title">${toStringSafe(exp?.position)}</div>
                    <div class="item-subtitle">${toStringSafe(exp?.company)} ${toStringSafe(exp?.location) ? `| ${toStringSafe(exp?.location)}` : ''}</div>
                    <div class="item-date">${toStringSafe(exp?.startDate)} - ${toStringSafe(exp?.endDate) || 'Present'}</div>
                    <div class="item-description">${toMultilineHTML(exp?.description)}</div>
                  </div>
                `).join('')}
              </div>
              ` : ''}
              ${(resumeData.education && resumeData.education.length > 0) ? `
              <div class="section">
                <div class="section-title">Education</div>
                ${resumeData.education.map(edu => `
                  <div class="item">
                    <div class="item-title">${toStringSafe(edu?.degree)} ${toStringSafe(edu?.field) ? `in ${toStringSafe(edu?.field)}` : ''}</div>
                    <div class="item-subtitle">${toStringSafe(edu?.institution)} ${toStringSafe(edu?.location) ? `| ${toStringSafe(edu?.location)}` : ''}</div>
                    <div class="item-date">${toStringSafe(edu?.startDate)} - ${toStringSafe(edu?.endDate) || 'Present'}</div>
                    ${toStringSafe(edu?.gpa) ? `<div class="item-description">GPA: ${toStringSafe(edu?.gpa)}</div>` : ''}
                  </div>
                `).join('')}
              </div>
              ` : ''}
              ${(resumeData.skills && resumeData.skills.length > 0) ? `
              <div class="section">
                <div class="section-title">Skills</div>
                <div class="skills-list">
                  ${toListHTML(resumeData.skills)}
                </div>
              </div>
              ` : ''}
              ${(resumeData.projects && resumeData.projects.length > 0) ? `
              <div class="section">
                <div class="section-title">Projects</div>
                ${resumeData.projects.map(proj => `
                  <div class="item">
                    <div class="item-title">${toStringSafe(proj?.name)}</div>
                    ${toStringSafe(proj?.url) ? `<div class="item-subtitle">${toStringSafe(proj?.url)}</div>` : ''}
                    <div class="item-date">${toStringSafe(proj?.startDate)} - ${toStringSafe(proj?.endDate) || 'Present'}</div>
                    <div class="item-description">${toMultilineHTML(proj?.description)}</div>
                    ${toStringSafe(proj?.technologies) ? `<div class="item-description"><strong>Technologies:</strong> ${toStringSafe(proj?.technologies)}</div>` : ''}
                  </div>
                `).join('')}
              </div>
              ` : ''}
            </div>
          </body>
        </html>
      `;
    }

    function generateTeslaTemplate(toStringSafe, toMultilineHTML, toListHTML) {
      return `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <style>
              * { margin: 0; padding: 0; box-sizing: border-box; }
              body { font-family: 'Gotham', Arial, sans-serif; color: #000; background: white; padding: 35px; }
              .resume-container { max-width: 800px; margin: 0 auto; }
              .header { border-bottom: 5px solid #E31937; padding-bottom: 25px; margin-bottom: 35px; }
              .name { font-size: 40px; font-weight: 700; color: #000; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 2px; }
              .contact-info { font-size: 12px; color: #555; display: flex; gap: 25px; flex-wrap: wrap; text-transform: uppercase; letter-spacing: 1px; }
              .section { margin-bottom: 30px; }
              .section-title { font-size: 18px; font-weight: 700; color: #E31937; margin-bottom: 15px; text-transform: uppercase; letter-spacing: 1.5px; border-bottom: 2px solid #000; padding-bottom: 5px; }
              .item { margin-bottom: 22px; }
              .item-header { display: flex; justify-content: space-between; margin-bottom: 8px; }
              .item-title { font-weight: 700; font-size: 16px; color: #000; text-transform: uppercase; }
              .item-subtitle { font-size: 13px; color: #666; margin-top: 2px; }
              .item-date { font-size: 11px; color: #999; font-weight: 600; }
              .item-description { font-size: 13px; line-height: 1.7; color: #333; margin-top: 8px; }
              .skills-list { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 10px; }
              .skill-tag { background: #000; color: white; padding: 5px 12px; border-radius: 0; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
              .summary { font-size: 13px; line-height: 1.7; color: #333; }
            </style>
          </head>
          <body>
            <div class="resume-container">
              <div class="header">
                <div class="name">${toStringSafe(resumeData.personalInfo?.fullName) || 'Your Name'}</div>
                <div class="contact-info">
                  ${toStringSafe(resumeData.personalInfo?.email) ? `<span>${toStringSafe(resumeData.personalInfo?.email)}</span>` : ''}
                  ${toStringSafe(resumeData.personalInfo?.phone) ? `<span>${toStringSafe(resumeData.personalInfo?.phone)}</span>` : ''}
                  ${toStringSafe(resumeData.personalInfo?.location) ? `<span>${toStringSafe(resumeData.personalInfo?.location)}</span>` : ''}
                  ${toStringSafe(resumeData.personalInfo?.linkedin) ? `<span>${toStringSafe(resumeData.personalInfo?.linkedin)}</span>` : ''}
                  ${toStringSafe(resumeData.personalInfo?.github) ? `<span>${toStringSafe(resumeData.personalInfo?.github)}</span>` : ''}
                </div>
              </div>
              ${toStringSafe(resumeData.professionalSummary) ? `
              <div class="section">
                <div class="section-title">Summary</div>
                <div class="summary">${toMultilineHTML(resumeData.professionalSummary)}</div>
              </div>
              ` : ''}
              ${(resumeData.experience && resumeData.experience.length > 0) ? `
              <div class="section">
                <div class="section-title">Experience</div>
                ${resumeData.experience.map(exp => `
                  <div class="item">
                    <div class="item-header">
                      <div>
                        <div class="item-title">${toStringSafe(exp?.position)}</div>
                        <div class="item-subtitle">${toStringSafe(exp?.company)} ${toStringSafe(exp?.location) ? `| ${toStringSafe(exp?.location)}` : ''}</div>
                      </div>
                      <div class="item-date">${toStringSafe(exp?.startDate)} - ${toStringSafe(exp?.endDate) || 'Present'}</div>
                    </div>
                    <div class="item-description">${toMultilineHTML(exp?.description)}</div>
                  </div>
                `).join('')}
              </div>
              ` : ''}
              ${(resumeData.skills && resumeData.skills.length > 0) ? `
              <div class="section">
                <div class="section-title">Skills</div>
                <div class="skills-list">
                  ${toListHTML(resumeData.skills)}
                </div>
              </div>
              ` : ''}
              ${(resumeData.education && resumeData.education.length > 0) ? `
              <div class="section">
                <div class="section-title">Education</div>
                ${resumeData.education.map(edu => `
                  <div class="item">
                    <div class="item-header">
                      <div>
                        <div class="item-title">${toStringSafe(edu?.degree)} ${toStringSafe(edu?.field) ? `- ${toStringSafe(edu?.field)}` : ''}</div>
                        <div class="item-subtitle">${toStringSafe(edu?.institution)} ${toStringSafe(edu?.location) ? `| ${toStringSafe(edu?.location)}` : ''}</div>
                      </div>
                      <div class="item-date">${toStringSafe(edu?.startDate)} - ${toStringSafe(edu?.endDate) || 'Present'}</div>
                    </div>
                    ${toStringSafe(edu?.gpa) ? `<div class="item-description">GPA: ${toStringSafe(edu?.gpa)}</div>` : ''}
                  </div>
                `).join('')}
              </div>
              ` : ''}
              ${(resumeData.projects && resumeData.projects.length > 0) ? `
              <div class="section">
                <div class="section-title">Projects</div>
                ${resumeData.projects.map(proj => `
                  <div class="item">
                    <div class="item-header">
                      <div>
                        <div class="item-title">${toStringSafe(proj?.name)}</div>
                        ${toStringSafe(proj?.url) ? `<div class="item-subtitle">${toStringSafe(proj?.url)}</div>` : ''}
                      </div>
                      <div class="item-date">${toStringSafe(proj?.startDate)} - ${toStringSafe(proj?.endDate) || 'Present'}</div>
                    </div>
                    <div class="item-description">${toMultilineHTML(proj?.description)}</div>
                    ${toStringSafe(proj?.technologies) ? `<div class="item-description"><strong>Technologies:</strong> ${toStringSafe(proj?.technologies)}</div>` : ''}
                  </div>
                `).join('')}
              </div>
              ` : ''}
            </div>
          </body>
        </html>
      `;
    }

    function generateUberTemplate(toStringSafe, toMultilineHTML, toListHTML) {
      return `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <style>
              * { margin: 0; padding: 0; box-sizing: border-box; }
              body { font-family: 'Uber Move', Arial, sans-serif; color: #333; background: #f8f9fa; padding: 40px; }
              .resume-container { max-width: 900px; margin: 0 auto; background: white; padding: 45px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
              .header { display: grid; grid-template-columns: 2fr 1fr; gap: 30px; margin-bottom: 35px; padding-bottom: 25px; border-bottom: 3px solid #06C167; }
              .name-section { }
              .name { font-size: 36px; font-weight: 700; color: #000; margin-bottom: 15px; }
              .contact-section { }
              .contact-info { font-size: 12px; color: #666; line-height: 1.8; }
              .contact-item { margin-bottom: 6px; }
              .section { margin-bottom: 28px; display: grid; grid-template-columns: 200px 1fr; gap: 25px; }
              .section-title-wrapper { }
              .section-title { font-size: 16px; font-weight: 700; color: #06C167; text-transform: uppercase; letter-spacing: 1px; }
              .section-content { }
              .item { margin-bottom: 20px; }
              .item-title { font-weight: 600; font-size: 16px; color: #333; }
              .item-subtitle { font-size: 13px; color: #666; margin-top: 3px; }
              .item-date { font-size: 12px; color: #999; margin-top: 5px; }
              .item-description { font-size: 14px; line-height: 1.7; color: #555; margin-top: 8px; }
              .skills-list { display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; margin-top: 8px; }
              .skill-tag { background: #06C167; color: white; padding: 6px 12px; border-radius: 4px; font-size: 12px; }
              .summary { font-size: 14px; line-height: 1.8; color: #555; }
            </style>
          </head>
          <body>
            <div class="resume-container">
              <div class="header">
                <div class="name-section">
                  <div class="name">${toStringSafe(resumeData.personalInfo?.fullName) || 'Your Name'}</div>
                </div>
                <div class="contact-section">
                  <div class="contact-info">
                    ${toStringSafe(resumeData.personalInfo?.email) ? `<div class="contact-item">${toStringSafe(resumeData.personalInfo?.email)}</div>` : ''}
                    ${toStringSafe(resumeData.personalInfo?.phone) ? `<div class="contact-item">${toStringSafe(resumeData.personalInfo?.phone)}</div>` : ''}
                    ${toStringSafe(resumeData.personalInfo?.location) ? `<div class="contact-item">${toStringSafe(resumeData.personalInfo?.location)}</div>` : ''}
                    ${toStringSafe(resumeData.personalInfo?.linkedin) ? `<div class="contact-item">${toStringSafe(resumeData.personalInfo?.linkedin)}</div>` : ''}
                    ${toStringSafe(resumeData.personalInfo?.github) ? `<div class="contact-item">${toStringSafe(resumeData.personalInfo?.github)}</div>` : ''}
                  </div>
                </div>
              </div>
              ${toStringSafe(resumeData.professionalSummary) ? `
              <div class="section">
                <div class="section-title-wrapper"><div class="section-title">Summary</div></div>
                <div class="section-content"><div class="summary">${toMultilineHTML(resumeData.professionalSummary)}</div></div>
              </div>
              ` : ''}
              ${(resumeData.experience && resumeData.experience.length > 0) ? `
              <div class="section">
                <div class="section-title-wrapper"><div class="section-title">Experience</div></div>
                <div class="section-content">
                  ${resumeData.experience.map(exp => `
                    <div class="item">
                      <div class="item-title">${toStringSafe(exp?.position)}</div>
                      <div class="item-subtitle">${toStringSafe(exp?.company)} ${toStringSafe(exp?.location) ? `| ${toStringSafe(exp?.location)}` : ''}</div>
                      <div class="item-date">${toStringSafe(exp?.startDate)} - ${toStringSafe(exp?.endDate) || 'Present'}</div>
                      <div class="item-description">${toMultilineHTML(exp?.description)}</div>
                    </div>
                  `).join('')}
                </div>
              </div>
              ` : ''}
              ${(resumeData.skills && resumeData.skills.length > 0) ? `
              <div class="section">
                <div class="section-title-wrapper"><div class="section-title">Skills</div></div>
                <div class="section-content">
                  <div class="skills-list">
                    ${toListHTML(resumeData.skills)}
                  </div>
                </div>
              </div>
              ` : ''}
              ${(resumeData.education && resumeData.education.length > 0) ? `
              <div class="section">
                <div class="section-title-wrapper"><div class="section-title">Education</div></div>
                <div class="section-content">
                  ${resumeData.education.map(edu => `
                    <div class="item">
                      <div class="item-title">${toStringSafe(edu?.degree)} ${toStringSafe(edu?.field) ? `in ${toStringSafe(edu?.field)}` : ''}</div>
                      <div class="item-subtitle">${toStringSafe(edu?.institution)} ${toStringSafe(edu?.location) ? `| ${toStringSafe(edu?.location)}` : ''}</div>
                      <div class="item-date">${toStringSafe(edu?.startDate)} - ${toStringSafe(edu?.endDate) || 'Present'}</div>
                      ${toStringSafe(edu?.gpa) ? `<div class="item-description">GPA: ${toStringSafe(edu?.gpa)}</div>` : ''}
                    </div>
                  `).join('')}
                </div>
              </div>
              ` : ''}
              ${(resumeData.projects && resumeData.projects.length > 0) ? `
              <div class="section">
                <div class="section-title-wrapper"><div class="section-title">Projects</div></div>
                <div class="section-content">
                  ${resumeData.projects.map(proj => `
                    <div class="item">
                      <div class="item-title">${toStringSafe(proj?.name)}</div>
                      ${toStringSafe(proj?.url) ? `<div class="item-subtitle">${toStringSafe(proj?.url)}</div>` : ''}
                      <div class="item-date">${toStringSafe(proj?.startDate)} - ${toStringSafe(proj?.endDate) || 'Present'}</div>
                      <div class="item-description">${toMultilineHTML(proj?.description)}</div>
                      ${toStringSafe(proj?.technologies) ? `<div class="item-description"><strong>Technologies:</strong> ${toStringSafe(proj?.technologies)}</div>` : ''}
                    </div>
                  `).join('')}
                </div>
              </div>
              ` : ''}
            </div>
          </body>
        </html>
      `;
    }

    // Choose generator after all are defined
    const templateGenerators = {
      google: () => generateGoogleTemplate(toStringSafe, toMultilineHTML, toListHTML),
      microsoft: () => generateMicrosoftTemplate(toStringSafe, toMultilineHTML, toListHTML),
      apple: () => generateAppleTemplate(toStringSafe, toMultilineHTML, toListHTML),
      amazon: () => generateAmazonTemplate(toStringSafe, toMultilineHTML, toListHTML),
      meta: () => generateMetaTemplate(toStringSafe, toMultilineHTML, toListHTML),
      netflix: () => generateNetflixTemplate(toStringSafe, toMultilineHTML, toListHTML),
      tesla: () => generateTeslaTemplate(toStringSafe, toMultilineHTML, toListHTML),
      uber: () => generateUberTemplate(toStringSafe, toMultilineHTML, toListHTML),
    };
    const generator = templateGenerators[template.id] || templateGenerators.google;
    return generator();
  };

  const generateResumePreviewContent = () => {
    // Just get the resume-container content for preview
    const toStringSafe = (value) => {
      if (value == null) return '';
      if (Array.isArray(value)) return value.map((v) => toStringSafe(v)).filter(Boolean).join(', ');
      if (typeof value === 'object') return '';
      return String(value);
    };

    const toMultilineHTML = (value) => {
      const text = toStringSafe(value);
      return text.replace(/\n/g, '<br>');
    };

    const toListHTML = (arr) => {
      if (!arr || (Array.isArray(arr) && arr.length === 0)) return '';
      const items = (Array.isArray(arr) ? arr : [arr])
        .map((v) => toStringSafe(v))
        .filter(Boolean)
        .map((v) => `<span class="skill-tag">${v}</span>`)
        .join('');
      return items;
    };

    const templateStyles = {
      google: { primaryColor: '#4285F4', secondaryColor: '#34A853' },
      microsoft: { primaryColor: '#FFB900', secondaryColor: '#0078D4' },
      apple: { primaryColor: '#000000', secondaryColor: '#86868B' },
      amazon: { primaryColor: '#FF9900', secondaryColor: '#232F3E' },
      meta: { primaryColor: '#1877F2', secondaryColor: '#42A5F5' },
      netflix: { primaryColor: '#E50914', secondaryColor: '#141414' },
      tesla: { primaryColor: '#E31937', secondaryColor: '#000000' },
      uber: { primaryColor: '#000000', secondaryColor: '#06C167' },
    };

    const style = templateStyles[template.id] || templateStyles.google;

    return `
      <style>
        .resume-preview-container { 
          max-width: 800px; 
          margin: 0 auto; 
          background: white; 
          padding: 40px; 
          font-family: 'Arial', sans-serif;
        }
        .resume-preview-container .header {
          border-bottom: 3px solid ${style.primaryColor};
          padding-bottom: 20px;
          margin-bottom: 30px;
        }
        .resume-preview-container .name {
          font-size: 36px;
          font-weight: bold;
          color: ${style.primaryColor};
          margin-bottom: 10px;
        }
        .resume-preview-container .contact-info {
          display: flex;
          flex-wrap: wrap;
          gap: 15px;
          font-size: 14px;
          color: #666;
        }
        .resume-preview-container .section {
          margin-bottom: 30px;
        }
        .resume-preview-container .section-title {
          font-size: 20px;
          font-weight: bold;
          color: ${style.primaryColor};
          margin-bottom: 15px;
          border-bottom: 2px solid ${style.secondaryColor};
          padding-bottom: 5px;
        }
        .resume-preview-container .summary {
          font-size: 14px;
          line-height: 1.8;
          color: #555;
        }
        .resume-preview-container .item {
          margin-bottom: 20px;
        }
        .resume-preview-container .item-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
        }
        .resume-preview-container .item-title {
          font-weight: bold;
          font-size: 16px;
          color: #333;
        }
        .resume-preview-container .item-subtitle {
          font-size: 14px;
          color: #666;
        }
        .resume-preview-container .item-date {
          font-size: 14px;
          color: ${style.secondaryColor};
        }
        .resume-preview-container .item-description {
          font-size: 14px;
          line-height: 1.6;
          margin-top: 8px;
          color: #555;
        }
        .resume-preview-container .skills-list {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        .resume-preview-container .skill-tag {
          background: ${style.primaryColor};
          color: white;
          padding: 5px 12px;
          border-radius: 15px;
          font-size: 12px;
        }
      </style>
      <div class="resume-preview-container">
        <div class="header">
          <div class="name">${toStringSafe(resumeData.personalInfo?.fullName) || 'Your Name'}</div>
          <div class="contact-info">
            ${toStringSafe(resumeData.personalInfo?.email) ? `<span>📧 ${toStringSafe(resumeData.personalInfo?.email)}</span>` : ''}
            ${toStringSafe(resumeData.personalInfo?.phone) ? `<span>📱 ${toStringSafe(resumeData.personalInfo?.phone)}</span>` : ''}
            ${toStringSafe(resumeData.personalInfo?.location) ? `<span>📍 ${toStringSafe(resumeData.personalInfo?.location)}</span>` : ''}
            ${toStringSafe(resumeData.personalInfo?.linkedin) ? `<span>🔗 ${toStringSafe(resumeData.personalInfo?.linkedin)}</span>` : ''}
            ${toStringSafe(resumeData.personalInfo?.github) ? `<span>💻 ${toStringSafe(resumeData.personalInfo?.github)}</span>` : ''}
          </div>
        </div>

        ${toStringSafe(resumeData.professionalSummary) ? `
        <div class="section">
          <div class="section-title">Professional Summary</div>
          <div class="summary">${toMultilineHTML(resumeData.professionalSummary)}</div>
        </div>
        ` : ''}

        ${(resumeData.skills && resumeData.skills.length > 0) ? `
        <div class="section">
          <div class="section-title">Skills</div>
          <div class="skills-list">
            ${toListHTML(resumeData.skills)}
          </div>
        </div>
        ` : ''}

        ${(resumeData.experience && resumeData.experience.length > 0) ? `
        <div class="section">
          <div class="section-title">Experience</div>
          ${resumeData.experience.map(exp => `
            <div class="item">
              <div class="item-header">
                <div>
                  <div class="item-title">${toStringSafe(exp?.position)}</div>
                  <div class="item-subtitle">${toStringSafe(exp?.company)} ${toStringSafe(exp?.location) ? `| ${toStringSafe(exp?.location)}` : ''}</div>
                </div>
                <div class="item-date">${toStringSafe(exp?.startDate)} - ${toStringSafe(exp?.endDate) || 'Present'}</div>
              </div>
              <div class="item-description">${toMultilineHTML(exp?.description)}</div>
            </div>
          `).join('')}
        </div>
        ` : ''}

        ${(resumeData.education && resumeData.education.length > 0) ? `
        <div class="section">
          <div class="section-title">Education</div>
          ${resumeData.education.map(edu => `
            <div class="item">
              <div class="item-header">
                <div>
                  <div class="item-title">${toStringSafe(edu?.degree)} ${toStringSafe(edu?.field) ? `in ${toStringSafe(edu?.field)}` : ''}</div>
                  <div class="item-subtitle">${toStringSafe(edu?.institution)} ${toStringSafe(edu?.location) ? `| ${toStringSafe(edu?.location)}` : ''}</div>
                </div>
                <div class="item-date">${toStringSafe(edu?.startDate)} - ${toStringSafe(edu?.endDate) || 'Present'}</div>
              </div>
              ${toStringSafe(edu?.gpa) ? `<div class="item-description">GPA: ${toStringSafe(edu?.gpa)}</div>` : ''}
            </div>
          `).join('')}
        </div>
        ` : ''}

        ${(resumeData.projects && resumeData.projects.length > 0) ? `
        <div class="section">
          <div class="section-title">Projects</div>
          ${resumeData.projects.map(proj => `
            <div class="item">
              <div class="item-header">
                <div>
                  <div class="item-title">${toStringSafe(proj?.name)}</div>
                  ${toStringSafe(proj?.url) ? `<div class="item-subtitle">🔗 ${toStringSafe(proj?.url)}</div>` : ''}
                </div>
                <div class="item-date">${toStringSafe(proj?.startDate)} - ${toStringSafe(proj?.endDate) || 'Present'}</div>
              </div>
              <div class="item-description">${toMultilineHTML(proj?.description)}</div>
              ${toStringSafe(proj?.technologies) ? `<div class="item-description"><strong>Technologies:</strong> ${toStringSafe(proj?.technologies)}</div>` : ''}
            </div>
          `).join('')}
        </div>
        ` : ''}

        ${(resumeData.certifications && resumeData.certifications.length > 0) ? `
        <div class="section">
          <div class="section-title">Certifications</div>
          ${resumeData.certifications.map(cert => `
            <div class="item">
              <div class="item-title">${toStringSafe(cert?.name)}</div>
              <div class="item-subtitle">${toStringSafe(cert?.issuer)} ${toStringSafe(cert?.date) ? `| ${toStringSafe(cert?.date)}` : ''}</div>
              ${toStringSafe(cert?.credentialId) ? `<div class="item-description">Credential ID: ${toStringSafe(cert?.credentialId)}</div>` : ''}
            </div>
          `).join('')}
        </div>
        ` : ''}
      </div>
    `;
  };

  const handleDownloadPDF = async () => {
    try {
      const element = document.createElement('div');
      element.innerHTML = generateResumeHTML();
      element.style.position = 'absolute';
      element.style.left = '-9999px';
      element.style.width = '800px';
      document.body.appendChild(element);

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
      });
      document.body.removeChild(element);

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`resume_${resumeData.personalInfo.fullName || 'resume'}_${Date.now()}.pdf`);
    } catch (error) {
      console.error('Error downloading PDF:', error);
      alert('Failed to download PDF. Please try again.');
    }
  };

  const handleDownloadPNG = async () => {
    try {
      if (!resumePreviewRef.current) {
        alert('Please open the preview first before downloading PNG.');
        setShowPreview(true);
        await new Promise(resolve => setTimeout(resolve, 500));
      }

      const element = resumePreviewRef.current || document.createElement('div');
      
      if (!resumePreviewRef.current) {
        element.innerHTML = generateResumeHTML();
        element.style.position = 'absolute';
        element.style.left = '-9999px';
        element.style.width = '800px';
        document.body.appendChild(element);
      }

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
      });

      if (!resumePreviewRef.current) {
        document.body.removeChild(element);
      }

      const link = document.createElement('a');
      link.download = `resume_${resumeData.personalInfo.fullName || 'resume'}_${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Error downloading PNG:', error);
      alert('Failed to download PNG. Please try again.');
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 relative overflow-hidden ${
      theme === 'dark' 
        ? 'bg-gradient-to-b from-[#0a0f2d] via-[#0a1338] to-[#0b1a4a]' 
        : 'bg-gradient-to-b from-white via-gray-50 to-gray-100'
    }`}>
      {/* Grid overlay */}
      <div className={`pointer-events-none absolute inset-0 transition-opacity duration-300 ${
        theme === 'dark'
          ? '[background-image:linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] opacity-[0.08]'
          : '[background-image:linear-gradient(to_right,rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.05)_1px,transparent_1px)] opacity-50'
      } bg-[length:40px_40px]`}></div>

      {/* Header */}
      <header className={`w-full px-6 sm:px-12 py-4 flex items-center justify-between border-b bg-transparent transition-colors duration-300 relative z-10 ${
        theme === 'dark' ? 'border-white/10' : 'border-gray-200'
      }`}>
        <button 
          onClick={onBack}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <span className="material-symbols-outlined text-xl">arrow_back</span>
          <h1 className={`text-xl sm:text-2xl font-bold transition-colors duration-300 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            {template.name} Resume Builder
          </h1>
        </button>
        <div className="flex items-center gap-4">
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-green-500 to-green-600 text-white font-medium hover:from-green-600 hover:to-green-700 transition-all shadow-lg shadow-green-500/30 flex items-center gap-2 disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-sm">save</span>
            {saving ? 'Saving...' : 'Save'}
          </button>
          <button
            onClick={() => setShowPreview(!showPreview)}
            className={`px-4 py-2 rounded-lg border font-medium transition-all ${
              theme === 'dark'
                ? 'border-white/10 text-white hover:bg-white/5'
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            {showPreview ? 'Hide Preview' : 'Preview'}
          </button>
          <button
            onClick={handleDownloadPDF}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-red-500 to-red-600 text-white font-medium hover:from-red-600 hover:to-red-700 transition-all shadow-lg shadow-red-500/30 flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">picture_as_pdf</span>
            PDF
          </button>
          <button
            onClick={handleDownloadPNG}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg shadow-blue-500/30 flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">image</span>
            PNG
          </button>
        </div>
      </header>

      <div className="flex relative z-10">
        {/* Form Section */}
        <div className={`flex-1 ${showPreview ? 'w-1/2' : 'w-full'} overflow-y-auto p-6 transition-all duration-300`}>
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Personal Information */}
            <Section title="Personal Information" theme={theme}>
              <div className="grid grid-cols-2 gap-4">
                <InputField
                  label="Full Name"
                  value={resumeData.personalInfo.fullName}
                  onChange={(e) => handleInputChange('personalInfo', 'fullName', e.target.value)}
                  theme={theme}
                />
                <InputField
                  label="Email"
                  value={resumeData.personalInfo.email}
                  onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
                  theme={theme}
                  type="email"
                />
                <InputField
                  label="Phone"
                  value={resumeData.personalInfo.phone}
                  onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
                  theme={theme}
                />
                <InputField
                  label="Location"
                  value={resumeData.personalInfo.location}
                  onChange={(e) => handleInputChange('personalInfo', 'location', e.target.value)}
                  theme={theme}
                />
                <InputField
                  label="LinkedIn"
                  value={resumeData.personalInfo.linkedin}
                  onChange={(e) => handleInputChange('personalInfo', 'linkedin', e.target.value)}
                  theme={theme}
                />
                <InputField
                  label="GitHub"
                  value={resumeData.personalInfo.github}
                  onChange={(e) => handleInputChange('personalInfo', 'github', e.target.value)}
                  theme={theme}
                />
              </div>
            </Section>

            {/* Professional Summary */}
            <Section title="Professional Summary" theme={theme}>
              <TextAreaField
                label="Summary"
                value={resumeData.professionalSummary}
                onChange={(e) => handleInputChange('professionalSummary', '', e.target.value)}
                theme={theme}
                rows={4}
              />
            </Section>

            {/* Skills */}
            <Section title="Skills" theme={theme}>
              <SkillInput
                skills={resumeData.skills}
                onChange={(skills) => setResumeData(prev => ({ ...prev, skills }))}
                theme={theme}
              />
            </Section>

            {/* Experience */}
            <Section title="Experience" theme={theme}>
              {resumeData.experience.map((exp, index) => (
                <div key={index} className={`mb-6 p-4 rounded-lg border ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'}`}>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Experience {index + 1}</h4>
                    <button
                      onClick={() => removeArrayItem('experience', index)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <InputField
                      label="Position"
                      value={exp.position}
                      onChange={(e) => handleArrayChange('experience', index, 'position', e.target.value)}
                      theme={theme}
                    />
                    <InputField
                      label="Company"
                      value={exp.company}
                      onChange={(e) => handleArrayChange('experience', index, 'company', e.target.value)}
                      theme={theme}
                    />
                    <InputField
                      label="Location"
                      value={exp.location}
                      onChange={(e) => handleArrayChange('experience', index, 'location', e.target.value)}
                      theme={theme}
                    />
                    <InputField
                      label="Start Date"
                      value={exp.startDate}
                      onChange={(e) => handleArrayChange('experience', index, 'startDate', e.target.value)}
                      theme={theme}
                      placeholder="MM/YYYY"
                    />
                    <InputField
                      label="End Date"
                      value={exp.endDate}
                      onChange={(e) => handleArrayChange('experience', index, 'endDate', e.target.value)}
                      theme={theme}
                      placeholder="MM/YYYY or Present"
                    />
                  </div>
                  <TextAreaField
                    label="Description"
                    value={exp.description}
                    onChange={(e) => handleArrayChange('experience', index, 'description', e.target.value)}
                    theme={theme}
                    rows={3}
                  />
                </div>
              ))}
              <button
                onClick={() => addArrayItem('experience')}
                className={`w-full py-2 rounded-lg border-2 border-dashed ${theme === 'dark' ? 'border-white/20 text-white hover:border-white/40' : 'border-gray-300 text-gray-700 hover:border-gray-400'}`}
              >
                + Add Experience
              </button>
            </Section>

            {/* Education */}
            <Section title="Education" theme={theme}>
              {resumeData.education.map((edu, index) => (
                <div key={index} className={`mb-6 p-4 rounded-lg border ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'}`}>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Education {index + 1}</h4>
                    <button
                      onClick={() => removeArrayItem('education', index)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <InputField
                      label="Degree"
                      value={edu.degree}
                      onChange={(e) => handleArrayChange('education', index, 'degree', e.target.value)}
                      theme={theme}
                    />
                    <InputField
                      label="Field of Study"
                      value={edu.field}
                      onChange={(e) => handleArrayChange('education', index, 'field', e.target.value)}
                      theme={theme}
                    />
                    <InputField
                      label="Institution"
                      value={edu.institution}
                      onChange={(e) => handleArrayChange('education', index, 'institution', e.target.value)}
                      theme={theme}
                    />
                    <InputField
                      label="Location"
                      value={edu.location}
                      onChange={(e) => handleArrayChange('education', index, 'location', e.target.value)}
                      theme={theme}
                    />
                    <InputField
                      label="Start Date"
                      value={edu.startDate}
                      onChange={(e) => handleArrayChange('education', index, 'startDate', e.target.value)}
                      theme={theme}
                      placeholder="YYYY"
                    />
                    <InputField
                      label="End Date"
                      value={edu.endDate}
                      onChange={(e) => handleArrayChange('education', index, 'endDate', e.target.value)}
                      theme={theme}
                      placeholder="YYYY or Present"
                    />
                    <InputField
                      label="GPA (Optional)"
                      value={edu.gpa}
                      onChange={(e) => handleArrayChange('education', index, 'gpa', e.target.value)}
                      theme={theme}
                      placeholder="3.5/4.0"
                    />
                  </div>
                </div>
              ))}
              <button
                onClick={() => addArrayItem('education')}
                className={`w-full py-2 rounded-lg border-2 border-dashed ${theme === 'dark' ? 'border-white/20 text-white hover:border-white/40' : 'border-gray-300 text-gray-700 hover:border-gray-400'}`}
              >
                + Add Education
              </button>
            </Section>

            {/* Projects */}
            <Section title="Projects" theme={theme}>
              {resumeData.projects.map((proj, index) => (
                <div key={index} className={`mb-6 p-4 rounded-lg border ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'}`}>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Project {index + 1}</h4>
                    <button
                      onClick={() => removeArrayItem('projects', index)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <InputField
                      label="Project Name"
                      value={proj.name}
                      onChange={(e) => handleArrayChange('projects', index, 'name', e.target.value)}
                      theme={theme}
                    />
                    <InputField
                      label="URL"
                      value={proj.url}
                      onChange={(e) => handleArrayChange('projects', index, 'url', e.target.value)}
                      theme={theme}
                    />
                  </div>
                  <TextAreaField
                    label="Description"
                    value={proj.description}
                    onChange={(e) => handleArrayChange('projects', index, 'description', e.target.value)}
                    theme={theme}
                    rows={3}
                  />
                  <InputField
                    label="Technologies"
                    value={proj.technologies}
                    onChange={(e) => handleArrayChange('projects', index, 'technologies', e.target.value)}
                    theme={theme}
                    placeholder="React, Node.js, MongoDB..."
                  />
                </div>
              ))}
              <button
                onClick={() => addArrayItem('projects')}
                className={`w-full py-2 rounded-lg border-2 border-dashed ${theme === 'dark' ? 'border-white/20 text-white hover:border-white/40' : 'border-gray-300 text-gray-700 hover:border-gray-400'}`}
              >
                + Add Project
              </button>
            </Section>
          </div>
        </div>

        {/* Preview Section */}
        {showPreview && (
          <div className="w-1/2 border-l border-white/10 p-6 overflow-y-auto bg-white">
            <div className="max-w-2xl mx-auto bg-white" ref={resumePreviewRef} id="resume-preview">
              <div dangerouslySetInnerHTML={{ __html: generateResumePreviewContent() }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const Section = ({ title, children, theme }) => (
  <div className={`p-6 rounded-xl backdrop-blur-sm transition-all duration-300 ${
    theme === 'dark'
      ? 'bg-white/5 border border-white/10'
      : 'bg-white border border-gray-200 shadow-md'
  }`}>
    <h3 className={`text-xl font-black mb-4 transition-colors duration-300 ${
      theme === 'dark' ? 'text-white' : 'text-gray-900'
    }`}>
      {title}
    </h3>
    {children}
  </div>
);

const InputField = ({ label, value, onChange, theme, type = 'text', placeholder = '' }) => {
  // Ensure value is always a string to avoid [object Object] issues
  const stringValue = value != null && typeof value !== 'object' ? String(value) : '';
  
  return (
    <div className="mb-4">
      <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
      }`}>
        {label}
      </label>
      <input
        type={type}
        value={stringValue}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-4 py-2 rounded-lg border transition-colors duration-300 ${
          theme === 'dark'
            ? 'bg-white/5 border-white/10 text-white placeholder-gray-500 focus:border-blue-500'
            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500'
        }`}
      />
    </div>
  );
};

const TextAreaField = ({ label, value, onChange, theme, rows = 4 }) => {
  // Ensure value is always a string to avoid [object Object] issues
  const stringValue = value != null && typeof value !== 'object' ? String(value) : '';
  
  return (
    <div className="mb-4">
      <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
      }`}>
        {label}
      </label>
      <textarea
        value={stringValue}
        onChange={onChange}
        rows={rows}
        className={`w-full px-4 py-2 rounded-lg border transition-colors duration-300 ${
          theme === 'dark'
            ? 'bg-white/5 border-white/10 text-white placeholder-gray-500 focus:border-blue-500'
            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500'
        }`}
      />
    </div>
  );
};

const SkillInput = ({ skills, onChange, theme }) => {
  const [inputValue, setInputValue] = useState('');

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      onChange([...skills, inputValue.trim()]);
      setInputValue('');
    }
  };

  const removeSkill = (index) => {
    onChange(skills.filter((_, i) => i !== index));
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Type a skill and press Enter"
        className={`w-full px-4 py-2 rounded-lg border transition-colors duration-300 mb-3 ${
          theme === 'dark'
            ? 'bg-white/5 border-white/10 text-white placeholder-gray-500'
            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
        }`}
      />
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <span
            key={index}
            className={`px-3 py-1 rounded-full text-sm flex items-center gap-2 ${
              theme === 'dark'
                ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                : 'bg-blue-100 text-blue-700 border border-blue-200'
            }`}
          >
            {skill}
            <button
              onClick={() => removeSkill(index)}
              className="hover:text-red-400"
            >
              <span className="material-symbols-outlined text-xs">close</span>
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default ResumeEditor;

