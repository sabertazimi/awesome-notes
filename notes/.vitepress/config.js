module.exports = {
  title: 'Awesome Notes',
  description: 'Daily Notes I Learned.',
  base: '/awesome-notes',

  markdown: {
    lineNumbers: true,
    toc: { includeLevel: [1, 2] },
  },

  themeConfig: {
    repo: 'sabertazimi/awesome-notes',
    docsDir: 'docs',

    editLinks: true,
    editLinkText: 'Edit this page on GitHub',
    lastUpdated: 'Last Updated',

    nav: [
      { text: 'Notes', link: '/', activeMatch: '^/$' },
      {
        text: 'Computer Science',
        link: '/computerScience/virtualization/virtBasicNotes',
        activeMatch: '^/computerScience/',
      },
      {
        text: 'Language',
        link: '/language/verilog/verilogBasicNotes',
        activeMatch: '^/language/',
      },
      {
        text: 'Programming',
        link: '/programming/tools/vim/vimBasicNotes',
        activeMatch: '^/programming/',
      },
      {
        text: 'Web',
        link: '/web/security/securityBasicNotes',
        activeMatch: '^/web/',
      },
    ],

    sidebar: {
      '/computerScience/': [getSidebar()[0]],
      '/language/': [getSidebar()[1]],
      '/programming/': [getSidebar()[2]],
      '/web/': [getSidebar()[3]],
      '/': getSidebar(),
    },
  },
};

function getSidebar() {
  return [
    {
      text: 'Computer Science',
      children: [
        {
          text: 'Algorithms',
          link: '/computerScience/algorithms/algorithmsBasicNotes',
        },
        { text: 'OJ', link: '/computerScience/algorithms/ojBasicNotes' },
        {
          text: 'Architecture',
          link: '/computerScience/architecture/archBasicNotes',
        },
        {
          text: 'Graph Processing',
          link: '/computerScience/architecture/graphProcessingBasicNotes',
        },
        {
          text: 'Compiler',
          link: '/computerScience/compilers/compilersBasicNotes',
        },
        {
          text: 'Database',
          link: '/computerScience/database/databaseBasicNotes',
        },
        { text: 'Latex', link: '/computerScience/latex/latexBasicNotes' },
        {
          text: 'Network',
          link: '/computerScience/network/networkBasicNotes',
        },
        { text: 'CSAPP', link: '/computerScience/operatingSystems/CSAPP' },
        {
          text: 'Operating Systems',
          link: '/computerScience/operatingSystems/operatingSystemsBasicNotes',
        },
        {
          text: 'Virtualization',
          link: '/computerScience/virtualization/virtBasicNotes',
        },
      ],
    },
    {
      text: 'Language',
      children: [
        {
          text: 'Assembly',
          link: '/language/assembly/assemblyBasicNotes',
        },
        { text: 'C', link: '/language/c/cBasicNotes' },
        { text: 'C++', link: '/language/cpp/cppBasicNotes' },
        { text: 'Go', link: '/language/go/goBasicNotes' },
        {
          text: 'Haskell',
          link: '/language/haskell/haskellBasicNotes',
        },
        { text: 'Java', link: '/language/java/javaBasicNotes' },
        {
          text: 'Python',
          link: '/language/python/pythonBasicNotes',
        },
        {
          text: 'Verilog',
          link: '/language/verilog/verilogBasicNotes',
        },
      ],
    },
    {
      text: 'Programming',
      children: [
        {
          text: 'Android',
          link: '/programming/android/androidBasicNotes',
        },
        {
          text: 'Clean Code',
          link: '/programming/devops/cleanCodeBasicNotes',
        },
        {
          text: 'Design Patterns',
          link: '/programming/devops/designPatternsBasicNotes',
        },
        {
          text: 'Software Testing',
          link: '/programming/devops/softwareTestingBasicNotes',
        },
        {
          text: 'Functional Programming',
          link: '/programming/functionalProgramming/functionalProgrammingBasicNotes',
        },
        {
          text: 'Game Design',
          link: '/programming/game/gameDesignBasicNotes',
        },
        {
          text: 'Linux',
          link: '/programming/linux/linuxBasicNotes',
        },
        {
          text: 'CMake',
          link: '/programming/tools/buildTools/CMakeBasicNotes',
        },
        {
          text: 'Git',
          link: '/programming/tools/git/gitBasicNotes',
        },
        {
          text: 'Vim',
          link: '/programming/tools/vim/vimBasicNotes',
        },
      ],
    },
    {
      text: 'Web',
      children: [
        {
          text: 'HTML',
          link: '/web/html/htmlBasicNotes',
        },
        {
          text: 'CSS',
          link: '/web/css/cssBasicNotes',
        },
        {
          text: 'Advanced CSS',
          link: '/web/css/cssAdvancedNotes',
        },
        {
          text: 'Sass',
          link: '/web/css/sassBasicNotes',
        },
        {
          text: 'Bootstrap',
          link: '/web/css/bootstrapBasicNotes',
        },
        {
          text: 'JavaScript',
          link: '/web/javascript/javascriptBasicNotes',
        },
        {
          text: 'Advanced JavaScript',
          link: '/web/javascript/javascriptAdvancedNotes',
        },
        {
          text: 'TypeScript',
          link: '/web/javascript/typescriptBasicNotes',
        },
        {
          text: 'Angular',
          link: '/web/angular/angularBasicNotes',
        },
        {
          text: 'React',
          link: '/web/react/reactBasicNotes',
        },
        {
          text: 'React Router',
          link: '/web/react/reactRouterBasicNotes',
        },
        {
          text: 'Redux',
          link: '/web/react/reduxBasicNotes',
        },
        {
          text: 'Vue',
          link: '/web/vue/vueBasicNotes',
        },
        {
          text: 'Library',
          link: '/web/frameworks/libraryBasicNotes',
        },
        {
          text: 'jQuery',
          link: '/web/frameworks/jQueryBasicNotes',
        },
        {
          text: 'Electron',
          link: '/web/frameworks/electronBasicNotes',
        },
        {
          text: 'Node',
          link: '/web/node/nodeBasicNotes',
        },
        {
          text: 'Express',
          link: '/web/node/expressBasicNotes',
        },
        {
          text: 'GraphQL',
          link: '/web/node/graphqlBasicNotes',
        },
        {
          text: 'Message Queue',
          link: '/web/node/messageQueueBasicNotes',
        },
        {
          text: 'Web Security',
          link: '/web/security/securityBasicNotes',
        },
      ],
    },
  ];
}
