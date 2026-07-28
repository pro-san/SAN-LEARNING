import { Course } from '../types';

export const INITIAL_COURSES: Course[] = [
  {
    id: 'course-web-dev',
    titleKm: 'មូលដ្ឋានគ្រឹះនៃការសរសេរកូដ Web Development (HTML, CSS, JS & React)',
    titleEn: 'Full-Stack Web Development Foundations in Khmer',
    category: 'coding',
    levelKm: 'អ្នកចាប់ផ្តើម (Beginner)',
    levelEn: 'Beginner',
    rating: 4.9,
    reviewCount: 342,
    price: 0,
    isFree: true,
    isFeatured: true,
    isPopular: true,
    thumbnail: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&w=800&q=80',
    instructorName: 'លោកគ្រូ សុខ ចាន់ដារ៉ា',
    instructorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    instructorRole: 'Senior Full Stack Engineer & Tech Trainer',
    instructorBioKm: 'មានបទពិសោធន៍ជា Senior Full-Stack Software Engineer ជាង ៨ឆ្នាំ ក្នុងក្រុមហ៊ុនបច្ចេកវិទ្យា និងធនាគារក្នុងស្រុក។ លោកនាយកបានបណ្តុះបណ្តាលសិស្ស និងនិស្សិតសរសេរកូដជាង ៣,០០០នាក់ ឱ្យទទួលបានការងារស្របជំនាញ។',
    instructorBioEn: 'Senior Full-Stack Software Engineer with 8+ years of industry experience across fintech and EdTech. Has mentored over 3,000 students into tech careers.',
    instructorExpertise: ['React.js', 'Node.js', 'JavaScript/TypeScript', 'Tailwind CSS', 'System Architecture', 'Git/GitHub'],
    instructorExperienceKm: '៨+ ឆ្នាំក្នុងវិស័យ Software Engineering',
    instructorExperienceEn: '8+ Years Software Engineering Experience',
    instructorRating: 4.9,
    instructorStudentsCount: 3450,
    descriptionKm: 'រៀនសរសេរកូដបង្កើតវេបសាយពីកម្រិតដំបូងរហូតដល់អាចបង្កើត App បានដោយខ្លួនឯង! មេរៀនសម្រួលជាភាសាខ្មែរ ងាយយល់ មានលំហាត់អនុវត្តជាក់ស្តែង និងគម្រោង Project!',
    descriptionEn: 'Learn modern full-stack web development from scratch using HTML, CSS, JavaScript, and React with clear Khmer explanations and hands-on projects.',
    totalHours: 18.5,
    totalLessons: 12,
    tags: ['React', 'JavaScript', 'HTML/CSS', 'Khmer Coding', 'Web App'],
    modules: [
      {
        id: 'mod-1',
        titleKm: 'ជំពូកទី ១: មូលដ្ឋានគ្រឹះ Web & HTML5 (Web Basics)',
        titleEn: 'Chapter 1: Web Fundamentals & HTML5',
        lessons: [
          {
            id: 'les-1-1',
            titleKm: 'មេរៀនទី ១.១: តើ Internet និង Web ដំណើរការយ៉ាងដូចម្តេច?',
            titleEn: 'Lesson 1.1: How the Internet & Web Work',
            duration: '12:45',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            descriptionKm: 'ការយល់ដឹងអំពី Client, Server, Domain, IP Address និង HTTP Requests សម្រាប់អ្នកចាប់ផ្តើម។',
            descriptionEn: 'Understanding Client, Server, Domain, IP Address and HTTP Requests.',
            isFreePreview: true,
            resources: [
              { id: 'res-1', title: 'ឯកសារមេរៀន Web_Basics_Notes.pdf', type: 'pdf', url: '#' },
              { id: 'res-2', title: 'តំណភ្ជាប់កូដលំហាត់មេរៀនទី១', type: 'code', url: 'https://github.com' }
            ],
            quizQuestions: [
              {
                id: 1,
                question: 'តើ HTTP តំណាងឱ្យពាក្យអ្វី?',
                options: ['Hypertext Transfer Protocol', 'High Tech Transfer Protocol', 'Home Text Testing Program', 'Hyperlink Text Process'],
                correctIndex: 0,
                explanation: 'HTTP មកពីពាក្យ Hypertext Transfer Protocol ដែលជាប្រូតូកូលសម្រាប់ផ្លាស់ប្តូរទិន្នន័យលើបណ្តាញ Web។'
              },
              {
                id: 2,
                question: 'តើ HTML ប្រើប្រាស់សម្រាប់ធ្វើអ្វីខ្លះក្នុងវេបសាយ?',
                options: ['កំណត់រចនាសម្ព័ន្ធ (Structure) នៃទំព័រវេបសាយ', 'តុបតែងពណ៌ និង Styling', 'បង្កើត Logic ស្មុគស្មាញ', 'រក្សាទុក Database'],
                correctIndex: 0,
                explanation: 'HTML ជាភាសាសម្គាល់ដែលប្រើសម្រាប់រៀបចំរចនាសម្ព័ន្ធអត្ថបទ រូបភាព និង Content របស់វេបសាយ។'
              }
            ]
          },
          {
            id: 'les-1-2',
            titleKm: 'មេរៀនទី ១.២: ការដំឡើង VS Code និងការបង្កើតរចនាសម្ព័ន្ធ HTML',
            titleEn: 'Lesson 1.2: Setting up VS Code & First HTML Page',
            duration: '18:20',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
            descriptionKm: 'ការដំឡើង Code Editor ពេញនិយម និងការសរសេរ HTML Tags សំខាន់ៗដូចជា h1, p, div, button, img។',
            descriptionEn: 'Installing VS Code extensions and learning key HTML tags.',
            isFreePreview: true,
            resources: [
              { id: 'res-3', title: 'VS Code Setup Guide (Khmer)', type: 'pdf', url: '#' }
            ]
          },
          {
            id: 'les-1-3',
            titleKm: 'មេរៀនទី ១.៣: ការរៀបចំ Form & Input Elements ក្នុង HTML',
            titleEn: 'Lesson 1.3: HTML Forms, Inputs, and Validation',
            duration: '15:10',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
            descriptionKm: 'ការបង្កើត Form ចុះឈ្មោះ, Login Input, Radio Buttons, Checkboxes និង Selection list។',
            descriptionEn: 'Creating registration forms, input fields, checkboxes and validation.'
          }
        ]
      },
      {
        id: 'mod-2',
        titleKm: 'ជំពូកទី ២: ការតុបតែងវេបសាយជាមួយ CSS3 & Tailwind CSS',
        titleEn: 'Chapter 2: Modern Styling with CSS3 & Tailwind',
        lessons: [
          {
            id: 'les-2-1',
            titleKm: 'មេរៀនទី ២.១: មូលដ្ឋាន CSS Box Model & Flexbox Layout',
            titleEn: 'Lesson 2.1: CSS Box Model & Flexbox Layout',
            duration: '22:15',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
            descriptionKm: 'ការគ្រប់គ្រង Margin, Padding, Border, Flexbox alignment ឱ្យ responsive លើទូរស័ព្ទ និងកុំព្យូទ័រ។',
            descriptionEn: 'Mastering flexbox properties and responsive design foundations.'
          },
          {
            id: 'les-2-2',
            titleKm: 'មេរៀនទី ២.២: ការប្រើប្រាស់ Tailwind CSS សម្រាប់បង្កើត UI',
            titleEn: 'Lesson 2.2: Building UI Components with Tailwind CSS',
            duration: '25:40',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
            descriptionKm: 'ការប្រើ Tailwind utility classes ក្នុងការរចនា Cards, Buttons, Navbar និង Modals លឿន និងស្អាត។',
            descriptionEn: 'Designing modern UI components rapidly using Tailwind CSS classes.'
          }
        ]
      },
      {
        id: 'mod-3',
        titleKm: 'ជំពូកទី ៣: React.js & JavaScript Interactive App',
        titleEn: 'Chapter 3: Interactive Apps with JavaScript & React',
        lessons: [
          {
            id: 'les-3-1',
            titleKm: 'មេរៀនទី ៣.១: React State, Hooks & Component Logic',
            titleEn: 'Lesson 3.1: React State, Hooks & Interactive Elements',
            duration: '30:05',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoylikes.mp4',
            descriptionKm: 'ការរៀន useState, useEffect, API Calls, និងការរៀបចំ Component ក្នុង React Application។',
            descriptionEn: 'Deep dive into React state management and component lifecycle.'
          }
        ]
      }
    ]
  },
  {
    id: 'course-english-comm',
    titleKm: 'ភាសាអង់គ្លេសសម្រាប់ការទាក់ទង និងការងារ (English for Career Success)',
    titleEn: 'English for Daily Communication and Professional Work',
    category: 'languages',
    levelKm: 'កម្រិតមធ្យម (Intermediate)',
    levelEn: 'Intermediate',
    rating: 4.8,
    reviewCount: 219,
    price: 15,
    isFree: false,
    isFeatured: true,
    isPopular: true,
    thumbnail: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=800&q=80',
    instructorName: 'អ្នកគ្រូ កែវ សុភ័ក្រ្ត',
    instructorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    instructorRole: 'TESOL Certified English Instructor & Career Coach',
    instructorBioKm: 'គ្រូបង្រៀនភាសាអង់គ្លេសដែលមានសញ្ញាបត្រ TESOL ពីចក្រភពអង់គ្លេស និងជាអ្នកប្រឹក្សាយោបល់ការងារ។ គាត់មានឯកទេសបង្រៀនអង់គ្លេសទាក់ទងពាណិជ្ជកម្ម និងការប្រឡង IELTS។',
    instructorBioEn: 'TESOL Certified English Instructor and career mentor with 6+ years experience training professionals for workplace communication and IELTS.',
    instructorExpertise: ['Business English', 'IELTS Prep', 'Public Speaking', 'Interview Coaching', 'Professional Email Writing'],
    instructorExperienceKm: '៦+ ឆ្នាំក្នុងវិស័យបង្រៀនភាសាអង់គ្លេស',
    instructorExperienceEn: '6+ Years ESL & TESOL Teaching',
    instructorRating: 4.85,
    instructorStudentsCount: 1890,
    descriptionKm: 'ពង្រឹងសមត្ថភាពនិយាយ ស្តាប់ និងសរសេរ អង់គ្លេសផ្លូវការសម្រាប់សម្ភាសន៍ការងារ ផ្ញើ Email និងការប្រជុំក្នុងក្រុមហ៊ុន!',
    descriptionEn: 'Master professional spoken and written English for workplace communication, interviews, and emails.',
    totalHours: 14.0,
    totalLessons: 10,
    tags: ['English', 'Communication', 'Career', 'ESL', 'Speaking'],
    modules: [
      {
        id: 'mod-eng-1',
        titleKm: 'ជំពូកទី ១: ការណែនាំខ្លួន និងការសម្ភាសន៍ការងារ (Job Interviews)',
        titleEn: 'Chapter 1: Professional Self-Introduction & Job Interviews',
        lessons: [
          {
            id: 'les-eng-1-1',
            titleKm: 'មេរៀនទី ១.១: របៀបណែនាំខ្លួនជាភាសាអង់គ្លេសឱ្យមានទំនុកចិត្ត (Self-Introduction)',
            titleEn: 'Lesson 1.1: Confident Professional Self-Introduction',
            duration: '14:10',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
            descriptionKm: 'ឃ្លាសំខាន់ៗ និងគន្លឹះរៀបចំចំណុចខ្លាំងក្នុងទម្រង់ STAR Method សម្រាប់ឆ្លើយសំណួរ interview។',
            descriptionEn: 'Key phrases and structures for answering top interview questions.',
            isFreePreview: true,
            quizQuestions: [
              {
                id: 1,
                question: 'តើឃ្លាណាមួយសមរម្យបំផុតសម្រាប់ចាប់ផ្តើមណែនាំខ្លួនក្នុងទម្រង់ផ្លូវការ?',
                options: ['"Good morning, thank you for giving me this opportunity..."', '"Hey guys, I am cool..."', '"What do you want to know?"', '"I hate talking about myself..."'],
                correctIndex: 0,
                explanation: 'ឃ្លា "Good morning, thank you for giving me this opportunity..." ជាទម្រង់គួរសម និងផ្លូវការ។'
              }
            ]
          },
          {
            id: 'les-eng-1-2',
            titleKm: 'មេរៀនទី ១.២: ការសរសេរ Email ផ្លូវការ (Professional Email Writing)',
            titleEn: 'Lesson 1.2: Writing Effective Business Emails',
            duration: '16:45',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackSeeTheWorld.mp4',
            descriptionKm: 'ទម្រង់សរសេរ Email សុំច្បាប់, ផ្ញើរបាយការណ៍, និងការឆ្លើយតបអតិថិជន។',
            descriptionEn: 'Structuring formal business emails, job applications, and client follow-ups.'
          }
        ]
      }
    ]
  },
  {
    id: 'course-bac2-math',
    titleKm: 'គណិតវិទ្យាថ្នាក់ទី១២ និងការត្រៀមប្រឡងបាក់ឌុប (Grade 12 Math & BacII Prep)',
    titleEn: 'High School Mathematics & National Exam Preparation',
    category: 'stem',
    levelKm: 'ថ្នាក់ទី១២ (Grade 12)',
    levelEn: 'High School',
    rating: 4.9,
    reviewCount: 512,
    price: 0,
    isFree: true,
    isFeatured: true,
    isPopular: false,
    thumbnail: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&q=80',
    instructorName: 'លោកគ្រូ សុវណ្ណ វិបុល',
    instructorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    instructorRole: 'គ្រូបង្រៀនគណិតវិទ្យាឆ្នើមថ្នាក់ជាតិ (National Math Educator)',
    instructorBioKm: 'គ្រូបង្រៀនគណិតវិទ្យាឆ្នើមដែលមានបទពិសោធន៍បង្រៀនសិស្សថ្នាក់ទី១២ ជាង ១០ឆ្នាំ និងបានជួយសិស្សទទួលបាននិទ្ទេស A ក្នុងប្រឡងបាក់ឌុបរាប់ពាន់នាក់។',
    instructorBioEn: 'Master Mathematics Educator with 10+ years specializing in Grade 12 national exam prep, differential equations, and calculus.',
    instructorExpertise: ['Calculus & Limits', 'Integrals & Derivatives', 'BacII Exam Strategy', 'High School Math', 'Trigonometry'],
    instructorExperienceKm: '១០+ ឆ្នាំបង្រៀនគណិតវិទ្យាថ្នាក់ទី១២',
    instructorExperienceEn: '10+ Years Grade 12 Math Educator',
    instructorRating: 4.95,
    instructorStudentsCount: 5200,
    descriptionKm: 'ដោះស្រាយលំហាត់លីមីត ដេរីវេ អាំងតេក្រាល សមីការឌីផេរ៉ង់ស្យែល និងប្រូបាប៊ីលីតេ តាមវិធីសាស្ត្រងាយយល់ និងរូបមន្តកាត់!',
    descriptionEn: 'Comprehensive guide to Grade 12 math topics including limits, derivatives, integrals, differential equations and probability.',
    totalHours: 22.0,
    totalLessons: 18,
    tags: ['Math', 'Grade 12', 'BacII', 'Limits', 'Integrals'],
    modules: [
      {
        id: 'mod-math-1',
        titleKm: 'ជំពូកទី ១: លីមីត និងភាពជាប់នៃអនុគមន៍ (Limits & Continuity)',
        titleEn: 'Chapter 1: Function Limits & Continuity',
        lessons: [
          {
            id: 'les-math-1-1',
            titleKm: 'មេរៀនទី ១.១: គន្លឹះគណនាលីមីតរាងមិនកំណត់ 0/0 និង ♾️/♾️',
            titleEn: 'Lesson 1.1: Techniques for Indeterminate Limits 0/0 & Inf/Inf',
            duration: '20:30',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
            descriptionKm: 'ការបំបែកជាកត្តា ការគុណកន្សោមឆ្លាស់ និងការប្រើប្រាស់លីមីតត្រីកោណមាត្រគ្រឹះ។',
            descriptionEn: 'Factoring techniques, conjugate multiplication, and trigonometric limits.',
            isFreePreview: true
          }
        ]
      }
    ]
  },
  {
    id: 'course-business-marketing',
    titleKm: 'ជំនាញបង្កើត និងគ្រប់គ្រងអាជីវកម្មឌីជីថល (Digital Business & Social Marketing)',
    titleEn: 'Digital Business & Social Media Marketing Strategy',
    category: 'business',
    levelKm: 'គ្រប់កម្រិត (All Levels)',
    levelEn: 'All Levels',
    rating: 4.7,
    reviewCount: 180,
    price: 20,
    isFree: false,
    isFeatured: false,
    isPopular: true,
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    instructorName: 'លោក ស៊ាន វីរៈ',
    instructorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    instructorRole: 'Digital Marketing Lead & Entrepreneur',
    instructorBioKm: 'អ្នកជំនាញ Marketing ឌីជីថល និងជាម្ចាស់អាជីវកម្ម e-Commerce។ គាត់បានបង្កើត Ads Campaign ទទួលបានការគាំទ្រខ្ពស់ និងផ្តល់ប្រឹក្សាដល់ SME ជាង ១០០ក្រុមហ៊ុន។',
    instructorBioEn: 'Digital Marketing Lead and entrepreneur with 7+ years managing performance ad campaigns and scaling e-commerce businesses.',
    instructorExpertise: ['Facebook & TikTok Ads', 'Social Media Strategy', 'e-Commerce Growth', 'Branding & Copywriting', 'ROI Analytics'],
    instructorExperienceKm: '៧+ ឆ្នាំក្នុង Digital Marketing & Ads',
    instructorExperienceEn: '7+ Years Digital Marketing & Ads',
    instructorRating: 4.75,
    instructorStudentsCount: 1420,
    descriptionKm: 'យុទ្ធសាស្ត្រលក់អនឡាញ បង្កើត Ads លើ Facebook, TikTok, Telegram និងការគ្រប់គ្រងហិរញ្ញវត្ថុអាជីវកម្មតូចៗ។',
    descriptionEn: 'Learn practical social media marketing strategies, ad campaigns, and small business financial management.',
    totalHours: 12.0,
    totalLessons: 9,
    tags: ['Marketing', 'Business', 'Facebook Ads', 'TikTok', 'Sales'],
    modules: [
      {
        id: 'mod-biz-1',
        titleKm: 'ជំពូកទី ១: ការរៀបចំទំព័រអាជីវកម្ម និងយុទ្ធសាស្ត្រ Content',
        titleEn: 'Chapter 1: Business Page Setup & Content Strategy',
        lessons: [
          {
            id: 'les-biz-1-1',
            titleKm: 'មេរៀនទី ១.១: របៀបបង្កើត Content ឱ្យទាក់ទាញអតិថិជន (Hook, Value, CTA)',
            titleEn: 'Lesson 1.1: Creating High-Converting Content',
            duration: '15:50',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
            descriptionKm: 'ការសរសេរ Caption ឃ្លាក់ទាក់ទាញចិត្ត និងការជ្រើសរើសរូបភាព/វីដេអូសម្រាប់ Promote។',
            descriptionEn: 'Writing magnetic headlines, structuring video posts, and call-to-actions.',
            isFreePreview: true
          }
        ]
      }
    ]
  },
  {
    id: 'course-figma-uiux',
    titleKm: 'UI/UX Design និងការរចនា Website/App ជាមួយ Figma',
    titleEn: 'UI/UX Design & App Prototyping with Figma',
    category: 'design',
    levelKm: 'អ្នកចាប់ផ្តើម (Beginner)',
    levelEn: 'Beginner',
    rating: 4.85,
    reviewCount: 295,
    price: 0,
    isFree: true,
    isFeatured: false,
    isPopular: true,
    thumbnail: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=800&q=80',
    instructorName: 'កញ្ញា ជា លីដា',
    instructorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    instructorRole: 'Lead UI/UX Product Designer',
    instructorBioKm: 'Senior Product Designer ដែលធ្លាប់រចនា App ធំៗក្នុងស្រុក និងអន្តរជាតិ។ នាងស្រឡាញ់ការចែករំលែកចំណេះដឹង UI/UX, Figma Prototyping និង Design Systems។',
    instructorBioEn: 'Senior Product Designer with 5+ years building user-centric web & mobile app interfaces and design systems.',
    instructorExpertise: ['Figma Prototyping', 'UI Design System', 'User Experience (UX)', 'Wireframing', 'Mobile App UI'],
    instructorExperienceKm: '៥+ ឆ្នាំក្នុងវិស័យ UI/UX Product Design',
    instructorExperienceEn: '5+ Years Product UI/UX Design',
    instructorRating: 4.88,
    instructorStudentsCount: 2100,
    descriptionKm: 'រៀនប្រើប្រាស់ Figma ក្នុងការរចនាចំណុចប្រទាក់អេក្រង់ទូរស័ព្ទ និងវេបសាយ ព្រមទាំងការធ្វើ Prototype ដូច App ពិតប្រាកដ!',
    descriptionEn: 'Master Figma tools, color theory, wireframing, component design systems, and interactive prototyping.',
    totalHours: 16.0,
    totalLessons: 11,
    tags: ['Figma', 'UI/UX', 'Design System', 'Mobile App', 'Prototyping'],
    modules: [
      {
        id: 'mod-design-1',
        titleKm: 'ជំពូកទី ១: មូលដ្ឋានគ្រឹះ Figma & Layout Grid',
        titleEn: 'Chapter 1: Figma Foundations & Grids',
        lessons: [
          {
            id: 'les-design-1-1',
            titleKm: 'មេរៀនទី ១.១: ការរៀបចំ Frame, Auto Layout និង Components',
            titleEn: 'Lesson 1.1: Frames, Auto Layout and Components',
            duration: '19:40',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4',
            descriptionKm: 'ការប្រើប្រាស់ Auto Layout ក្នុងការរៀបចំរចនាសម្ព័ន្ធអេក្រង់ឱ្យរត់តាមទំហំ screen។',
            descriptionEn: 'Mastering Auto Layout properties, constraints and component variants.',
            isFreePreview: true
          }
        ]
      }
    ]
  },
  {
    id: 'course-react-advanced',
    titleKm: 'ការអភិវឌ្ឍន៍ Web App ជាមួយ React.js, Node.js & Database',
    titleEn: 'Advanced React.js, Node.js & Database Architecture',
    category: 'coding',
    levelKm: 'កម្រិតខ្ពស់ (Advanced)',
    levelEn: 'Advanced',
    rating: 4.95,
    reviewCount: 188,
    price: 25,
    isFree: false,
    isFeatured: true,
    isPopular: true,
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    instructorName: 'លោកគ្រូ សុខ ចាន់ដារ៉ា',
    instructorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    instructorRole: 'Senior Full Stack Engineer & Tech Trainer',
    instructorBioKm: 'មានបទពិសោធន៍ជា Senior Full-Stack Software Engineer ជាង ៨ឆ្នាំ ក្នុងក្រុមហ៊ុនបច្ចេកវិទ្យា និងធនាគារក្នុងស្រុក។ លោកនាយកបានបណ្តុះបណ្តាលសិស្ស និងនិស្សិតសរសេរកូដជាង ៣,០០០នាក់ ឱ្យទទួលបានការងារស្របជំនាញ។',
    instructorBioEn: 'Senior Full-Stack Software Engineer with 8+ years of industry experience across fintech and EdTech. Has mentored over 3,000 students into tech careers.',
    instructorExpertise: ['React.js', 'Node.js', 'JavaScript/TypeScript', 'Tailwind CSS', 'System Architecture', 'Git/GitHub'],
    instructorExperienceKm: '៨+ ឆ្នាំក្នុងវិស័យ Software Engineering',
    instructorExperienceEn: '8+ Years Software Engineering Experience',
    instructorRating: 4.9,
    instructorStudentsCount: 3450,
    descriptionKm: 'ឈានដល់កម្រិត Professional Full-Stack Developer! រៀនសរសេរ RESTful APIs, JWT Authentication, Database Schema និង Deploy លើ Cloud!',
    descriptionEn: 'Master professional React patterns, state management, RESTful API design, database schemas, and cloud deployment.',
    totalHours: 24.0,
    totalLessons: 16,
    tags: ['React', 'Node.js', 'Express', 'Fullstack', 'API'],
    modules: [
      {
        id: 'mod-adv-1',
        titleKm: 'ជំពូកទី ១: Full-Stack Architecture & API Design',
        titleEn: 'Chapter 1: Full-Stack Architecture & API Design',
        lessons: [
          {
            id: 'les-adv-1-1',
            titleKm: 'មេរៀនទី ១.១: ការរៀបចំ Express Server, JWT Auth & React State Sync',
            titleEn: 'Lesson 1.1: Express Server Setup, JWT Auth & State Sync',
            duration: '28:15',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            descriptionKm: 'ការបង្កើត Express API រក្សាទុក Token និងភ្ជាប់ទៅកាន់ Frontend React App។',
            descriptionEn: 'Building secure Express routes with JWT authentication.',
            isFreePreview: true
          }
        ]
      }
    ]
  },
  {
    id: 'course-ielts-mastery',
    titleKm: 'ថ្នាក់ត្រៀមប្រឡង IELTS ទទួលបាន Band 7.0+ (IELTS Academic Mastery)',
    titleEn: 'IELTS Academic Preparation Band 7.0+ Strategy',
    category: 'languages',
    levelKm: 'កម្រិតខ្ពស់ (Advanced)',
    levelEn: 'Advanced',
    rating: 4.92,
    reviewCount: 145,
    price: 30,
    isFree: false,
    isFeatured: false,
    isPopular: true,
    thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80',
    instructorName: 'អ្នកគ្រូ កែវ សុភ័ក្រ្ត',
    instructorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    instructorRole: 'TESOL Certified English Instructor & Career Coach',
    instructorBioKm: 'គ្រូបង្រៀនភាសាអង់គ្លេសដែលមានសញ្ញាបត្រ TESOL ពីចក្រភពអង់គ្លេស និងជាអ្នកប្រឹក្សាយោបល់ការងារ។ គាត់មានឯកទេសបង្រៀនអង់គ្លេសទាក់ទងពាណិជ្ជកម្ម និងការប្រឡង IELTS។',
    instructorBioEn: 'TESOL Certified English Instructor and career mentor with 6+ years experience training professionals for workplace communication and IELTS.',
    instructorExpertise: ['Business English', 'IELTS Prep', 'Public Speaking', 'Interview Coaching', 'Professional Email Writing'],
    instructorExperienceKm: '៦+ ឆ្នាំក្នុងវិស័យបង្រៀនភាសាអង់គ្លេស',
    instructorExperienceEn: '6+ Years ESL & TESOL Teaching',
    instructorRating: 4.85,
    instructorStudentsCount: 1890,
    descriptionKm: 'យុទ្ធសាស្ត្រដោះស្រាយវិញ្ញាសា IELTS Speaking, Writing Task 1 & 2, Reading និង Listening ដើម្បីទទួលបានពិន្ទុ Band 7.0 ឡើងទៅ!',
    descriptionEn: 'Comprehensive IELTS Academic preparation course covering Listening, Reading, Writing Task 1 & 2, and Speaking Band 7+ strategies.',
    totalHours: 20.0,
    totalLessons: 14,
    tags: ['IELTS', 'Academic English', 'Speaking', 'Writing Task 2', 'Exam Prep'],
    modules: [
      {
        id: 'mod-ielts-1',
        titleKm: 'ជំពូកទី ១: យុទ្ធសាស្ត្រ IELTS Writing Task 2 Essay',
        titleEn: 'Chapter 1: IELTS Writing Task 2 Essay Masterclass',
        lessons: [
          {
            id: 'les-ielts-1-1',
            titleKm: 'មេរៀនទី ១.១: រចនាសម្ព័ន្ធ Essay 4-Paragraph សម្រាប់ Band 7.5',
            titleEn: 'Lesson 1.1: 4-Paragraph Essay Structure for Band 7.5',
            duration: '21:00',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
            descriptionKm: 'ការរៀបចំ Introduction, Body Paragraphs 1 & 2, និង Conclusion ជាមួយ Linking Words។',
            descriptionEn: 'Structuring essays with high-scoring coherence and cohesion.',
            isFreePreview: true
          }
        ]
      }
    ]
  }
];
