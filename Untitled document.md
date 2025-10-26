**MAIN PAGE**

\<\!DOCTYPE html\>  
\<html class\="light" lang\="en"\>\<head\>  
\<meta charset\="utf-8"/\>  
\<meta content\="width=device-width, initial-scale=1.0" name\="viewport"/\>  
\<title\>Resume AI\</title\>  
\<link href\="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900\&amp;display=swap" rel\="stylesheet"/\>  
\<link href\="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel\="stylesheet"/\>  
\<script src\="https://cdn.tailwindcss.com?plugins=forms,container-queries"\>\</script\>  
\<script\>  
       tailwind.config \= {  
           darkMode: "class",  
           theme: {  
               extend: {  
                   colors: {  
                       "primary-light": "\#C2A68C",  
                       "background-light": "\#F5F5F0",  
                       "background-light-secondary": "\#E6D8C3",  
                       "highlight-light": "\#5D866C",  
                       "text-light": "\#1F2937",  
                       "text-light-secondary": "\#4B5563",  
                       "primary-dark": "\#D1B395", // A lighter, softer version of the primary color  
                       "background-dark": "\#2C2B29", // A deep, warm gray  
                       "background-dark-secondary": "\#403C37", // A slightly lighter warm gray  
                       "highlight-dark": "\#7E9C88", // A muted green for dark mode highlights  
                       "text-dark": "\#F5F5F0",  
                       "text-dark-secondary": "\#BDBDBD",  
                   },  
                   fontFamily: {  
                       "display": \["Inter", "sans-serif"\]  
                   },  
                   borderRadius: {  
                       "DEFAULT": "0.25rem",  
                       "lg": "0.5rem",  
                       "xl": "0.75rem",  
                       "full": "9999px"  
                   },  
               },  
           },  
       }  
   \</script\>  
\<style\>  
       .material-symbols-outlined {  
           font-variation-settings:  
           'FILL' 0,  
           'wght' 400,  
           'GRAD' 0,  
           'opsz' 24  
       }  
   \</style\>  
\</head\>  
\<body class\="bg-background-light dark:bg-background-dark font-display text-text-light dark:text-text-dark"\>  
\<div class\="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden"\>  
\<div class\="layout-container flex h-full grow flex-col"\>  
\<div class\="flex flex-1 justify-center"\>  
\<div class\="layout-content-container flex flex-col max-w-\[960px\] flex-1"\>  
\<header class\="flex items-center justify-between whitespace-nowrap px-10 py-3"\>  
\<div class\="flex items-center gap-4 text-text-light dark:text-text-dark"\>  
\<div class\="size-6 text-primary-light dark:text-primary-dark"\>  
\<svg fill\="none" viewBox\="0 0 48 48" xmlns\="http://www.w3.org/2000/svg"\>  
\<path clip-rule\="evenodd" d\="M12.0799 24L4 19.2479L9.95537 8.75216L18.04 13.4961L18.0446 4H29.9554L29.96 13.4961L38.0446 8.75216L44 19.2479L35.92 24L44 28.7521L38.0446 39.2479L29.96 34.5039L29.9554 44H18.0446L18.04 34.5039L9.95537 39.2479L4 28.7521L12.0799 24Z" fill\="currentColor" fill-rule\="evenodd"\>\</path\>  
\</svg\>  
\</div\>  
\<h2 class\="text-lg font-bold leading-tight tracking-\[-0.015em\]"\>Resume AI\</h2\>  
\</div\>  
\<div class\="flex flex-1 justify-end items-center gap-8"\>  
\<div class\="flex items-center gap-9"\>  
\<a class\="text-text-light dark:text-text-dark text-sm font-medium leading-normal hover:text-primary-light dark:hover:text-primary-dark" href\="\#"\>Home\</a\>  
\<a class\="text-text-light-secondary dark:text-text-dark-secondary text-sm font-medium leading-normal hover:text-primary-light dark:hover:text-primary-dark" href\="\#"\>Resume Analysis\</a\>  
\<a class\="text-text-light-secondary dark:text-text-dark-secondary text-sm font-medium leading-normal hover:text-primary-light dark:hover:text-primary-dark" href\="\#"\>AI Chat\</a\>  
\</div\>  
\</div\>  
\</header\>  
\<main class\="py-10 px-4"\>  
\<div class\="flex flex-col items-center text-center gap-8"\>  
\<div class\="flex flex-col gap-2"\>  
\<h1 class\="text-text-light dark:text-text-dark text-4xl font-black leading-tight tracking-\[-0.033em\] @\[480px\]:text-5xl"\>  
                                   Get Your Resume AI-Analyzed  
                               \</h1\>  
\<h2 class\="text-text-light-secondary dark:text-text-dark-secondary text-base font-normal leading-normal max-w-lg"\>  
                                   Upload your resume to receive instant feedback and chat with an AI assistant.  
                               \</h2\>  
\</div\>  
\<div class\="w-full max-w-\[560px\]"\>  
\<div class\="flex flex-col p-4"\>  
\<div class\="flex flex-col items-center gap-6 rounded-xl border-2 border-dashed border-background-light-secondary dark:border-background-dark-secondary bg-background-light-secondary/20 dark:bg-background-dark-secondary/50 px-6 py-14"\>  
\<div class\="flex max-w-\[480px\] flex-col items-center gap-2"\>  
\<p class\="text-text-light dark:text-text-dark text-lg font-bold leading-tight tracking-\[-0.015em\] max-w-\[480px\] text-center"\>Drag \&amp; Drop Your Resume Here\</p\>  
\<p class\="text-text-light-secondary dark:text-text-dark-secondary text-sm font-normal leading-normal max-w-\[480px\] text-center"\>or browse your files\</p\>  
\</div\>  
\<button class\="flex min-w-\[84px\] max-w-\[480px\] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary-light dark:bg-primary-dark text-white dark:text-background-dark text-sm font-bold leading-normal tracking-\[0.015em\]"\>  
\<span class\="truncate"\>Browse Files\</span\>  
\</button\>  
\</div\>  
\</div\>  
\<p class\="text-text-light-secondary dark:text-text-dark-secondary text-sm font-normal leading-normal pb-3 pt-1 px-4 text-center"\>Supported formats: PDF, DOCX\</p\>  
\</div\>  
\</div\>  
\<div class\="flex flex-col gap-10 px-4 py-10 @container mt-10"\>  
\<div class\="flex flex-col gap-6 items-center text-center"\>  
\<div class\="flex flex-col gap-4"\>  
\<h1 class\="text-text-light dark:text-text-dark tracking-light text-\[32px\] font-bold leading-tight @\[480px\]:text-4xl @\[480px\]:font-black @\[480px\]:leading-tight @\[480px\]:tracking-\[-0.033em\] max-w-\[720px\]"\>  
                                       Why use our service?  
                                   \</h1\>  
\<p class\="text-text-light-secondary dark:text-text-dark-secondary text-base font-normal leading-normal max-w-\[720px\]"\>  
                                       Our AI-powered platform provides you with the tools you need to create a winning resume.  
                                   \</p\>  
\</div\>  
\</div\>  
\<div class\="grid grid-cols-\[repeat(auto-fit,minmax(240px,1fr))\] gap-4 p-0"\>  
\<div class\="flex flex-1 gap-3 rounded-xl border border-background-light-secondary dark:border-background-dark-secondary bg-background-light-secondary/50 dark:bg-background-dark-secondary p-4 flex-col"\>  
\<div class\="text-highlight-light dark:text-highlight-dark material-symbols-outlined" data-icon\="Scan" data-size\="24px" data-weight\="regular"\>  
                                       document\_scanner  
                                   \</div\>  
\<div class\="flex flex-col gap-1"\>  
\<h2 class\="text-text-light dark:text-text-dark text-base font-bold leading-tight"\>Instant Analysis\</h2\>  
\<p class\="text-text-light-secondary dark:text-text-dark-secondary text-sm font-normal leading-normal"\>Receive immediate feedback on your resume's content, formatting, and keywords.\</p\>  
\</div\>  
\</div\>  
\<div class\="flex flex-1 gap-3 rounded-xl border border-background-light-secondary dark:border-background-dark-secondary bg-background-light-secondary/50 dark:bg-background-dark-secondary p-4 flex-col"\>  
\<div class\="text-highlight-light dark:text-highlight-dark material-symbols-outlined" data-icon\="Chat" data-size\="24px" data-weight\="regular"\>  
                                       chat  
                                   \</div\>  
\<div class\="flex flex-col gap-1"\>  
\<h2 class\="text-text-light dark:text-text-dark text-base font-bold leading-tight"\>AI Chatbot\</h2\>  
\<p class\="text-text-light-secondary dark:text-text-dark-secondary text-sm font-normal leading-normal"\>Chat with our AI assistant to get answers to your career questions.\</p\>  
\</div\>  
\</div\>  
\<div class\="flex flex-1 gap-3 rounded-xl border border-background-light-secondary dark:border-background-dark-secondary bg-background-light-secondary/50 dark:bg-background-dark-secondary p-4 flex-col"\>  
\<div class\="text-highlight-light dark:text-highlight-dark material-symbols-outlined" data-icon\="Seal" data-size\="24px" data-weight\="regular"\>  
                                       workspace\_premium  
                                   \</div\>  
\<div class\="flex flex-col gap-1"\>  
\<h2 class\="text-text-light dark:text-text-dark text-base font-bold leading-tight"\>Personalized Feedback\</h2\>  
\<p class\="text-text-light-secondary dark:text-text-dark-secondary text-sm font-normal leading-normal"\>Get tailored suggestions to improve your resume and land your dream job.\</p\>  
\</div\>  
\</div\>  
\</div\>  
\</div\>  
\</main\>  
\<footer class\="text-center py-6 border-t border-background-light-secondary dark:border-background-dark-secondary mt-10"\>  
\<div class\="flex justify-center gap-6 text-sm"\>  
\<a class\="text-text-light-secondary dark:text-text-dark-secondary hover:text-primary-light dark:hover:text-primary-dark" href\="\#"\>About Us\</a\>  
\<a class\="text-text-light-secondary dark:text-text-dark-secondary hover:text-primary-light dark:hover:text-primary-dark" href\="\#"\>Privacy Policy\</a\>  
\<a class\="text-text-light-secondary dark:text-text-dark-secondary hover:text-primary-light dark:hover:text-primary-dark" href\="\#"\>Contact\</a\>  
\</div\>  
\</footer\>  
\</div\>  
\</div\>  
\</div\>  
\</div\>  
\</body\>\</html\>

**ANALYSIS PAGE** 

\<\!DOCTYPE html\>  
\<html class\="light" lang\="en"\>\<head\>  
\<meta charset\="utf-8"/\>  
\<meta content\="width=device-width, initial-scale=1.0" name\="viewport"/\>  
\<title\>Resume Analysis Report\</title\>  
\<script src\="https://cdn.tailwindcss.com?plugins=forms,container-queries"\>\</script\>  
\<link href\="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900\&amp;display=swap" rel\="stylesheet"/\>  
\<link href\="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel\="stylesheet"/\>  
\<script id\="tailwind-config"\>  
   tailwind.config \= {  
     darkMode: "class",  
     theme: {  
       extend: {  
         colors: {  
           "primary": "\#C2A68C",  
           "background-light": "\#F5F5F0",  
           "secondary-background-light": "\#E6D8C3",  
           "subtle-highlight-light": "\#5D866C",  
           "background-dark": "\#3A3A3A",  
           "secondary-background-dark": "\#4A4A4A",  
           "subtle-highlight-dark": "\#5D866C",  
           "text-light": "\#333333",  
           "text-dark": "\#F5F5F0",  
           "accent-green": "\#5D866C",  
           "accent-orange": "\#C2A68C"  
         },  
         fontFamily: {  
           "display": \["Inter", "sans-serif"\]  
         },  
         borderRadius: {  
           "DEFAULT": "0.25rem",  
           "lg": "0.5rem",  
           "xl": "0.75rem",  
           "full": "9999px"  
         },  
       },  
     },  
   }  
 \</script\>  
\<style\>  
   .material-symbols-outlined {  
     font-variation-settings:  
     'FILL' 0,  
     'wght' 400,  
     'GRAD' 0,  
     'opsz' 24  
   }  
 \</style\>  
\</head\>  
\<body class\="bg-background-light dark:bg-background-dark font-display text-text-light dark:text-text-dark"\>  
\<div class\="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden"\>  
\<div class\="layout-container flex h-full grow flex-col"\>  
\<header class\="sticky top-0 z-10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm border-b border-secondary-background-light dark:border-secondary-background-dark"\>  
\<div class\="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"\>  
\<div class\="flex items-center justify-between h-16"\>  
\<div class\="flex items-center gap-4"\>  
\<div class\="text-primary"\>  
\<svg class\="h-8 w-8" fill\="none" viewBox\="0 0 48 48" xmlns\="http://www.w3.org/2000/svg"\>  
\<g clip-path\="url(\#clip0\_6\_535)"\>  
\<path clip-rule\="evenodd" d\="M47.2426 24L24 47.2426L0.757355 24L24 0.757355L47.2426 24ZM12.2426 21H35.7574L24 9.24264L12.2426 21Z" fill\="currentColor" fill-rule\="evenodd"\>\</path\>  
\</g\>  
\<defs\>  
\<clipPath id\="clip0\_6\_535"\>  
\<rect fill\="white" height\="48" width\="48"\>\</rect\>  
\</clipPath\>  
\</defs\>  
\</svg\>  
\</div\>  
\<h2 class\="text-lg font-bold leading-tight tracking-\[-0.015em\] text-text-light dark:text-text-dark"\>Resume Analyzer\</h2\>  
\</div\>  
\<div class\="flex items-center gap-4"\>  
\<nav class\="hidden md:flex items-center gap-6"\>  
\<a class\="text-sm font-medium hover:text-primary transition-colors text-text-light dark:text-text-dark" href\="\#"\>Dashboard\</a\>  
\<a class\="text-sm font-medium hover:text-primary transition-colors text-text-light dark:text-text-dark" href\="\#"\>Upload\</a\>  
\<a class\="text-sm font-medium hover:text-primary transition-colors text-text-light dark:text-text-dark" href\="\#"\>Chat\</a\>  
\</nav\>  
\<button class\="flex items-center justify-center rounded-full h-10 w-10 bg-secondary-background-light dark:bg-secondary-background-dark text-text-light dark:text-text-dark"\>  
\<span class\="material-symbols-outlined text-lg"\>person\</span\>  
\</button\>  
\</div\>  
\</div\>  
\</div\>  
\</header\>  
\<main class\="flex-1 px-4 sm:px-6 lg:px-8 py-8 md:py-12"\>  
\<div class\="max-w-7xl mx-auto"\>  
\<div class\="flex flex-wrap justify-between items-center gap-4 mb-8"\>  
\<div class\="flex flex-col gap-2"\>  
\<p class\="text-3xl md:text-4xl font-black leading-tight tracking-\[-0.033em\] text-text-light dark:text-text-dark"\>Resume Analysis Report\</p\>  
\<p class\="text-slate-500 dark:text-slate-400 text-base font-normal leading-normal"\>Here's a detailed breakdown of your resume's performance.\</p\>  
\</div\>  
\<div class\="flex gap-2"\>  
\<button class\="flex items-center justify-center rounded-lg h-10 bg-primary text-white gap-2 text-sm font-bold leading-normal tracking-\[0.015em\] px-4"\>  
\<span class\="material-symbols-outlined text-base"\>chat\_bubble\</span\>  
                   Chat with AI  
               \</button\>  
\<button class\="flex items-center justify-center rounded-lg h-10 bg-secondary-background-light dark:bg-secondary-background-dark text-text-light dark:text-text-dark gap-2 text-sm font-bold leading-normal tracking-\[0.015em\] px-4"\>  
\<span class\="material-symbols-outlined text-base"\>download\</span\>  
                   Download Report  
               \</button\>  
\</div\>  
\</div\>  
\<div class\="grid grid-cols-1 lg:grid-cols-3 gap-8"\>  
\<div class\="lg:col-span-1 flex flex-col gap-8"\>  
\<div class\="bg-secondary-background-light dark:bg-secondary-background-dark p-6 rounded-xl shadow-sm"\>  
\<h3 class\="text-lg font-bold mb-4 text-text-light dark:text-text-dark"\>Your ATS Score\</h3\>  
\<div class\="relative flex items-center justify-center w-48 h-48 mx-auto"\>  
\<svg class\="w-full h-full" viewBox\="0 0 36 36"\>  
\<path class\="text-background-light dark:text-background-dark" d\="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 \-31.831" fill\="none" stroke-width\="3"\>\</path\>  
\<path class\="text-accent-green" d\="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 \-31.831" fill\="none" stroke-dasharray\="85, 100" stroke-linecap\="round" stroke-width\="3"\>\</path\>  
\</svg\>  
\<div class\="absolute flex flex-col items-center justify-center"\>  
\<span class\="text-4xl font-black text-accent-green"\>85%\</span\>  
\<span class\="text-sm text-slate-500 dark:text-slate-400"\>Excellent\</span\>  
\</div\>  
\</div\>  
\<p class\="text-slate-500 dark:text-slate-400 text-sm font-normal leading-normal mt-4 text-center"\>This score represents how well your resume is optimized for Applicant Tracking Systems.\</p\>  
\</div\>  
\</div\>  
\<div class\="lg:col-span-2 flex flex-col gap-8"\>  
\<div class\="bg-secondary-background-light dark:bg-secondary-background-dark rounded-xl shadow-sm overflow-hidden"\>  
\<div class\="p-6"\>  
\<p class\="text-lg font-bold leading-tight tracking-\[-0.015em\] text-text-light dark:text-text-dark"\>Candidate Summary\</p\>  
\<p class\="text-slate-500 dark:text-slate-400 text-base font-normal leading-normal mt-2"\>A concise, AI-generated overview of your profile, highlighting key strengths and potential weaknesses. This summary provides a quick glimpse into how a recruiter might perceive your resume.\</p\>  
\</div\>  
\</div\>  
\<div class\="bg-secondary-background-light dark:bg-secondary-background-dark rounded-xl shadow-sm overflow-hidden"\>  
\<div class\="p-6"\>  
\<p class\="text-lg font-bold leading-tight tracking-\[-0.015em\] text-text-light dark:text-text-dark"\>Key Skills\</p\>  
\<p class\="text-slate-500 dark:text-slate-400 text-base font-normal leading-normal mt-2"\>A list of the most relevant skills identified in your resume, categorized by type.\</p\>  
\<div class\="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4"\>  
\<div\>  
\<h4 class\="font-semibold mb-2 text-text-light dark:text-text-dark"\>Technical Skills\</h4\>  
\<ul class\="space-y-1 list-disc list-inside text-slate-600 dark:text-slate-300"\>  
\<li\>Python\</li\>  
\<li\>SQL\</li\>  
\<li\>Machine Learning\</li\>  
\<li\>Data Analysis\</li\>  
\</ul\>  
\</div\>  
\<div\>  
\<h4 class\="font-semibold mb-2 text-text-light dark:text-text-dark"\>Soft Skills\</h4\>  
\<ul class\="space-y-1 list-disc list-inside text-slate-600 dark:text-slate-300"\>  
\<li\>Communication\</li\>  
\<li\>Teamwork\</li\>  
\<li\>Problem-Solving\</li\>  
\<li\>Leadership\</li\>  
\</ul\>  
\</div\>  
\</div\>  
\</div\>  
\</div\>  
\<div class\="bg-secondary-background-light dark:bg-secondary-background-dark rounded-xl shadow-sm overflow-hidden"\>  
\<div class\="p-6"\>  
\<p class\="text-lg font-bold leading-tight tracking-\[-0.015em\] text-text-light dark:text-text-dark"\>Missing Keywords\</p\>  
\<p class\="text-slate-500 dark:text-slate-400 text-base font-normal leading-normal mt-2"\>Important keywords missing from your resume that could improve visibility.\</p\>  
\<div class\="mt-4 flex flex-wrap gap-2"\>  
\<span class\="bg-accent-orange/20 text-accent-orange dark:bg-accent-orange/30 dark:text-accent-orange text-sm font-medium px-2.5 py-1 rounded-full"\>Project Management\</span\>  
\<span class\="bg-accent-orange/20 text-accent-orange dark:bg-accent-orange/30 dark:text-accent-orange text-sm font-medium px-2.5 py-1 rounded-full"\>Agile Methodology\</span\>  
\<span class\="bg-accent-orange/20 text-accent-orange dark:bg-accent-orange/30 dark:text-accent-orange text-sm font-medium px-2.5 py-1 rounded-full"\>Client Relations\</span\>  
\</div\>  
\</div\>  
\</div\>  
\<div class\="bg-secondary-background-light dark:bg-secondary-background-dark rounded-xl shadow-sm overflow-hidden"\>  
\<div class\="p-6"\>  
\<p class\="text-lg font-bold leading-tight tracking-\[-0.015em\] text-text-light dark:text-text-dark"\>Suggestions for Improvement\</p\>  
\<p class\="text-slate-500 dark:text-slate-400 text-base font-normal leading-normal mt-2"\>Actionable recommendations for enhancing your resume.\</p\>  
\<ul class\="mt-4 space-y-3 list-disc list-inside text-slate-600 dark:text-slate-300"\>  
\<li class\="marker:text-subtle-highlight-light dark:marker:text-subtle-highlight-dark"\>Quantify your achievements with specific numbers and data to demonstrate impact.\</li\>  
\<li class\="marker:text-subtle-highlight-light dark:marker:text-subtle-highlight-dark"\>Tailor the resume for each job application by including keywords from the job description.\</li\>  
\<li class\="marker:text-subtle-highlight-light dark:marker:text-subtle-highlight-dark"\>Improve formatting for better readability; use consistent font sizes and bullet points.\</li\>  
\</ul\>  
\</div\>  
\</div\>  
\</div\>  
\</div\>  
\</div\>  
\</main\>  
\</div\>  
\</div\>  
\</body\>\</html\>

**CHATBOT PAGE**

\<\!DOCTYPE html\>  
\<html class\="light" lang\="en"\>\<head\>  
\<meta charset\="utf-8"/\>  
\<meta content\="width=device-width, initial-scale=1.0" name\="viewport"/\>  
\<title\>AI Resume Assistant Chat\</title\>  
\<link href\="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel\="stylesheet"/\>  
\<link href\="https://fonts.googleapis.com" rel\="preconnect"/\>  
\<link crossorigin\="" href\="https://fonts.gstatic.com" rel\="preconnect"/\>  
\<link href\="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700\&amp;display=swap" rel\="stylesheet"/\>  
\<script src\="https://cdn.tailwindcss.com?plugins=forms,container-queries"\>\</script\>  
\<script\>  
   tailwind.config \= {  
     darkMode: "class",  
     theme: {  
       extend: {  
         colors: {  
           "background-light": "\#F5F5F0",  
           "secondary-background": "\#E6D8C3",  
           "primary": "\#C2A68C",  
           "subtle-highlight": "\#5D866C",  
           "background-dark": "\#2C2B29",  
           "secondary-background-dark": "\#403A34",  
           "primary-dark": "\#D1BFA6",  
           "subtle-highlight-dark": "\#7E9C88",  
           "text-light": "\#3B3835",  
           "text-dark": "\#F0EBE5"  
         },  
         fontFamily: {  
           "display": \["Inter", "sans-serif"\]  
         },  
         borderRadius: {  
           "DEFAULT": "0.25rem",  
           "lg": "0.5rem",  
           "xl": "0.75rem",  
           "full": "9999px"  
         },  
       },  
     },  
   }  
 \</script\>  
\<style\>  
   .material-symbols-outlined {  
     font-variation-settings:  
       'FILL' 0,  
       'wght' 400,  
       'GRAD' 0,  
       'opsz' 24  
   }  
 \</style\>  
\</head\>  
\<body class\="bg-background-light dark:bg-background-dark font-display text-text-light dark:text-text-dark"\>  
\<div class\="relative flex h-screen w-full flex-col group/design-root overflow-hidden"\>  
\<div class\="flex h-full grow"\>  
\<aside class\="flex flex-col w-64 bg-secondary-background/30 dark:bg-secondary-background-dark/20 border-r border-secondary-background/50 dark:border-secondary-background-dark/50 p-4 shrink-0"\>  
\<div class\="flex items-center gap-3 mb-8"\>  
\<div class\="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10" data-alt\="John Doe's profile picture" style\='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuC00YPHhEB6PRy4hTjiAr-jmqvxZVc8hu8v5VNUm1fJSUhVlesGtPibPAwKWHmzZFHydUqUhYP\_aOAmwykitaEwuWPsc-xwXkBodx0sbyG-kcEHHkcXyffyF8cowx9TZcC79DftSbR0kKBOAcSCTdaKeyRj7WAsgKa67of2XMqCXAKvGoNPwhmaSMwJUKd6FH5014Ilzb2UEOaMcojyAkT0wqDZhU\_mpZERED\_KEmuc26zdzVGUAjF1n67bUFTZZTqziUhC2x7rCzY");'\>\</div\>  
\<div class\="flex flex-col"\>  
\<h1 class\="text-text-light dark:text-text-dark text-base font-medium leading-normal"\>John Doe\</h1\>  
\<p class\="text-slate-500 dark:text-slate-400 text-sm font-normal leading-normal"\>john.doe@email.com\</p\>  
\</div\>  
\</div\>  
\<nav class\="flex flex-col gap-2"\>  
\<a class\="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-secondary-background/50 dark:hover:bg-secondary-background-dark/50" href\="\#"\>  
\<span class\="material-symbols-outlined text-text-light dark:text-text-dark"\>upload\</span\>  
\<p class\="text-text-light dark:text-text-dark text-sm font-medium leading-normal"\>Upload New Resume\</p\>  
\</a\>  
\<a class\="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-secondary-background/50 dark:hover:bg-secondary-background-dark/50" href\="\#"\>  
\<span class\="material-symbols-outlined text-text-light dark:text-text-dark"\>bar\_chart\</span\>  
\<p class\="text-text-light dark:text-text-dark text-sm font-medium leading-normal"\>View Analysis\</p\>  
\</a\>  
\<a class\="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary/30 dark:bg-primary-dark/30" href\="\#"\>  
\<span class\="material-symbols-outlined text-primary dark:text-primary-dark"\>chat\_bubble\</span\>  
\<p class\="text-primary dark:text-primary-dark text-sm font-medium leading-normal"\>Chat\</p\>  
\</a\>  
\<a class\="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-secondary-background/50 dark:hover:bg-secondary-background-dark/50" href\="\#"\>  
\<span class\="material-symbols-outlined text-text-light dark:text-text-dark"\>settings\</span\>  
\<p class\="text-text-light dark:text-text-dark text-sm font-medium leading-normal"\>Settings\</p\>  
\</a\>  
\</nav\>  
\</aside\>  
\<main class\="flex flex-1 flex-col bg-background-light dark:bg-background-dark p-6"\>  
\<h2 class\="text-2xl font-bold mb-4 text-text-light dark:text-text-dark"\>Dashboard\</h2\>  
\<div class\="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"\>  
\<div class\="bg-secondary-background/30 dark:bg-secondary-background-dark/30 p-4 rounded-lg"\>  
\<h3 class\="font-semibold text-lg text-text-light dark:text-text-dark"\>Resume Analysis\</h3\>  
\<p class\="text-sm text-slate-500 dark:text-slate-400 mt-2"\>Your resume score is 85/100. Great job\!\</p\>  
\</div\>  
\<div class\="bg-secondary-background/30 dark:bg-secondary-background-dark/30 p-4 rounded-lg"\>  
\<h3 class\="font-semibold text-lg text-text-light dark:text-text-dark"\>Keyword Optimization\</h3\>  
\<p class\="text-sm text-slate-500 dark:text-slate-400 mt-2"\>You have a high match for "Software Engineer" roles.\</p\>  
\</div\>  
\<div class\="bg-secondary-background/30 dark:bg-secondary-background-dark/30 p-4 rounded-lg"\>  
\<h3 class\="font-semibold text-lg text-text-light dark:text-text-dark"\>Recent Activity\</h3\>  
\<p class\="text-sm text-slate-500 dark:text-slate-400 mt-2"\>Chatted with AI assistant about job responsibilities.\</p\>  
\</div\>  
\</div\>  
\</main\>  
\</div\>  
\<div class\="absolute inset-0 bg-black/30 flex items-center justify-center p-4"\>  
\<div class\="flex flex-col w-full max-w-2xl h-\[80vh\] bg-background-light dark:bg-background-dark rounded-xl shadow-2xl"\>  
\<div class\="flex items-center justify-between p-4 border-b border-secondary-background/50 dark:border-secondary-background-dark/50"\>  
\<h3 class\="font-bold text-lg text-text-light dark:text-text-dark"\>AI Resume Assistant\</h3\>  
\<button class\="p-2 rounded-full hover:bg-secondary-background/50 dark:hover:bg-secondary-background-dark/50"\>  
\<span class\="material-symbols-outlined text-text-light dark:text-text-dark"\>close\</span\>  
\</button\>  
\</div\>  
\<div class\="flex-1 overflow-y-auto p-6 space-y-6"\>  
\<div class\="flex items-end gap-3"\>  
\<div class\="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-10 shrink-0" data-alt\="AI Assistant's avatar" style\='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuAJkN7jNvEcl2OLshRaaNGOKNBZvs38OzI2xMKTfn9o99J5rNnf3bWHK8hwyZs6iZ8PBznwFOY2A4iQR9J9X41l1OIBqjZzYXOw4FhYjReZ1v1zB3r963\_pgkfOAFZFm9jCnvXWLoBOVnUdMg3HmgdwUTfe7aK9uoGoh7uXsijsSF4EIGzjgFiCPjH4OP509kVRzwxpOHZI3I64z1qoPMFC8On7BH6iP2gFqXppblrOEqmF5n-OiRmAQm7xX6ST78wseyL0j6YEP68");'\>\</div\>  
\<div class\="flex flex-col gap-1 items-start"\>  
\<p class\="text-slate-500 dark:text-slate-400 text-xs font-normal"\>AI Assistant · 10:30 AM\</p\>  
\<div class\="flex flex-col gap-2"\>  
\<p class\="text-base font-normal leading-normal max-w-lg rounded-lg px-4 py-3 bg-secondary-background/50 dark:bg-secondary-background-dark/50 border border-secondary-background dark:border-secondary-background-dark text-text-light dark:text-text-dark"\> Hello\! I'm your AI resume assistant. Ask me anything about your resume, from improving your summary to tailoring it for a specific job. \</p\>  
\<div class\="flex gap-2 flex-wrap"\>  
\<button class\="text-xs font-medium px-3 py-1.5 rounded-lg border border-secondary-background dark:border-secondary-background-dark bg-secondary-background/50 hover:bg-secondary-background dark:bg-secondary-background-dark/50 dark:hover:bg-secondary-background-dark"\> Is my resume ATS-friendly? \</button\>  
\<button class\="text-xs font-medium px-3 py-1.5 rounded-lg border border-secondary-background dark:border-secondary-background-dark bg-secondary-background/50 hover:bg-secondary-background dark:bg-secondary-background-dark/50 dark:hover:bg-secondary-background-dark"\> What are the strongest parts of my resume? \</button\>  
\<button class\="text-xs font-medium px-3 py-1.5 rounded-lg border border-secondary-background dark:border-secondary-background-dark bg-secondary-background/50 hover:bg-secondary-background dark:bg-secondary-background-dark/50 dark:hover:bg-secondary-background-dark"\> Help me rephrase job responsibilities. \</button\>  
\</div\>  
\</div\>  
\</div\>  
\</div\>  
\<div class\="flex items-end gap-3 justify-end"\>  
\<div class\="flex flex-col gap-1 items-end"\>  
\<p class\="text-slate-500 dark:text-slate-400 text-xs font-normal"\>John Doe · 10:32 AM\</p\>  
\<p class\="text-base font-normal leading-normal max-w-lg rounded-lg px-4 py-3 bg-primary dark:bg-primary-dark text-white dark:text-background-dark"\> Can you help me rephrase my job responsibilities for my role at Acme Corporation? \</p\>  
\</div\>  
\<div class\="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-10 shrink-0" data-alt\="John Doe's profile picture" style\='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuADhUi49WoJ2CDOsXCPfKA6GKC4uLVebz6RrUCsCND0fVJ5Jq-C9MVub4HjQopIPAONrHbWItX6OUcHHkCfZNl9ZtYd52ES0E5w0Kc110HKDCn7E2dSuTih5sx5sAvbDXohmuNlJZYIRZ4tr3fnJaE5vOxtzWjwBGOSMY9e5nG5JJnYkheGo-xUwCxsnfkKzFbKawlgQCWH-zP\_aYjjmqQF48bAKtckIrmK53FQLm07kV8x2WC1osKX-VzFX760Vu2BsduJ89E1hBs");'\>\</div\>  
\</div\>  
\<div class\="flex items-end gap-3"\>  
\<div class\="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-10 shrink-0" data-alt\="AI Assistant's avatar" style\='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuBB8PGYxlFwZ39kBD6HSpyVI1rMrCYpINF3XlWGzX9fQEPIj0OmHVWoP0LtaA5yhKdv811O3\_R3sKVXN\_gO4D\_VykPjOcv3D80U7n3b7DjkV3k4Ib-BeCfJC0BViKme0OSPCM6pf4QE4t\_WvK4fNlucv97nBbqshiJKk0b4AT9wutUT4uvin3QdcUQ77bP4XlRJEqXSVO9NCHUT2BY1rvdjmDMAQyWGTsqEwBY1Gh\_2BuYBLeJQ8XBRNfEN6\_Ez8NbfAksk9k8\_Bc0");'\>\</div\>  
\<div class\="flex flex-col gap-1 items-start"\>  
\<p class\="text-slate-500 dark:text-slate-400 text-xs font-normal"\>AI Assistant · 10:33 AM\</p\>  
\<p class\="text-base font-normal leading-normal max-w-lg rounded-lg px-4 py-3 bg-secondary-background/50 dark:bg-secondary-background-dark/50 border border-secondary-background dark:border-secondary-background-dark text-text-light dark:text-text-dark"\> Of course, I can help with that. What were your key achievements in that role? Providing specific metrics or outcomes will help create a stronger impact. \</p\>  
\</div\>  
\</div\>  
\<div class\="flex items-end gap-3"\>  
\<div class\="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-10 shrink-0" data-alt\="AI Assistant's avatar" style\='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuBd8fPLJh11yvoPwsFeb3-03QHknq8Ietyvk-V-A2I8lXJkrC5\_X8w\_B-FowlZTvTQ7pyr1hY8CXgzDbgbpE40F4qZbkpBCazilwa-SGLubgQLcV8R\_45HXqN5BKmFGbq9BM1nQNGthEFvfMuzP3-1kPWIQP0iKRKnc7BlDdzLk4BsOYM734CCn8DfgGM6-p7j\_61uJmvPL4Nd7JBzoyrcWvRsPCVG8Mzb\_LJHvDRkpIR\_1s\_G0xicz-byHyQ9befMGuROJuwDsnag");'\>\</div\>  
\<div class\="flex flex-col gap-1 items-start"\>  
\<p class\="text-slate-500 dark:text-slate-400 text-xs font-normal"\>AI Assistant is typing...\</p\>  
\<div class\="text-base font-normal leading-normal max-w-lg rounded-lg px-4 py-3 bg-secondary-background/50 dark:bg-secondary-background-dark/50 border border-secondary-background dark:border-secondary-background-dark text-text-light dark:text-text-dark"\>  
\<div class\="flex items-center gap-2"\>  
\<span class\="h-2 w-2 bg-subtle-highlight dark:bg-subtle-highlight-dark rounded-full animate-pulse \[animation-delay:-0.3s\]"\>\</span\>  
\<span class\="h-2 w-2 bg-subtle-highlight dark:bg-subtle-highlight-dark rounded-full animate-pulse \[animation-delay:-0.15s\]"\>\</span\>  
\<span class\="h-2 w-2 bg-subtle-highlight dark:bg-subtle-highlight-dark rounded-full animate-pulse"\>\</span\>  
\</div\>  
\</div\>  
\</div\>  
\</div\>  
\</div\>  
\<div class\="p-4 bg-secondary-background/30 dark:bg-secondary-background-dark/20 border-t border-secondary-background/50 dark:border-secondary-background-dark/50"\>  
\<div class\="flex items-center gap-3"\>  
\<div class\="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 shrink-0" data-alt\="John Doe's profile picture" style\='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuA9DLWSEVYCa-QJIC90xQkaZdmonuSuTXiHfB6s36IRlWc\_1HVokDWfB\_orL-6skkrRBuQnXXw8XISb7SzcJlrHVaBGLxf5I0rxrV8FSy0XZw54H2FGCYj7KEqjb0Fal6HypxuNMc2zGMTbv5iiWnmT3LZ2-aSG8uKGFdDK65soVc7sRPA2gsHCcWAbwIeUD2pBKLkrgXQzu3o96uQ3SB4wBxwl-jaFv-9vRvUYeanby3N\_t2QsbQB8AFA\_5XWMD\_KhB5GtvsNQiys");'\>\</div\>  
\<div class\="flex flex-1 items-center rounded-lg bg-background-light dark:bg-background-dark border border-secondary-background/50 dark:border-secondary-background-dark/50 h-12"\>  
\<input class\="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-l-lg text-text-light dark:text-text-dark focus:outline-0 focus:ring-0 border-none bg-transparent h-full placeholder:text-slate-500 dark:placeholder:text-slate-400 px-4 text-base font-normal leading-normal" placeholder\="Ask me a question about your resume..." value\=""/\>  
\<div class\="flex items-center pr-2"\>  
\<button class\="flex items-center justify-center p-2 rounded-full hover:bg-subtle-highlight/20 dark:hover:bg-subtle-highlight-dark/20"\>  
\<span class\="material-symbols-outlined text-slate-500 dark:text-slate-400"\>attach\_file\</span\>  
\</button\>  
\<button class\="flex items-center justify-center p-2 rounded-full bg-primary dark:bg-primary-dark text-white dark:text-background-dark hover:bg-primary/90 dark:hover:bg-primary-dark/90 ml-1"\>  
\<span class\="material-symbols-outlined"\>send\</span\>  
\</button\>  
\</div\>  
\</div\>  
\</div\>  
\</div\>  
\</div\>  
\</div\>  
\</div\>  
\</body\>\</html\>  
