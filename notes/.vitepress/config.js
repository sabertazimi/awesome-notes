module.exports = {
  title: 'Awesome Notes',
  description: 'Daily Notes I Learned.',
  base: '/awesome-notes',

  markdown: {
    lineNumbers: true,
    toc: { includeLevel: [1, 2, 3] },
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
        link: '/computerScience/algorithms/algorithmsBasicNotes',
        activeMatch: '^/computerScience/',
      },
      {
        text: 'Language',
        link: '/language/assembly/assemblyBasicNotes',
        activeMatch: '^/language/',
      },
      {
        text: 'Programming',
        link: '/programming/android/androidBasicNotes',
        activeMatch: '^/programming/',
      },
      {
        text: 'Web',
        link: '/web/javascript/javascriptBasicNotes',
        activeMatch: '^/programming/',
      },
    ],

    sidebar: {
      '/computerScience/': getSidebar(),
      '/language/': getSidebar(),
      '/programming/': getSidebar(),
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
          text: 'Assembly Basic Notes',
          link: '/language/assembly/assemblyBasicNotes',
        },
        { text: 'C Basic Notes', link: '/language/c/cBasicNotes' },
        { text: 'Cpp Basic Notes', link: '/language/cpp/cppBasicNotes' },
        { text: 'Go Basic Notes', link: '/language/go/goBasicNotes' },
        {
          text: 'Haskell Basic Notes',
          link: '/language/haskell/haskellBasicNotes',
        },
        { text: 'Java Basic Notes', link: '/language/java/javaBasicNotes' },
        {
          text: 'Python Basic Notes',
          link: '/language/python/pythonBasicNotes',
        },
        {
          text: 'Verilog Basic Notes',
          link: '/language/verilog/verilogBasicNotes',
        },
      ],
    },
    {
      text: 'Programming',
      children: [
        {
          text: 'Android Basic Notes',
          link: '/programming/android/androidBasicNotes',
        },
        {
          text: 'Clean Code Basic Notes',
          link: '/programming/devops/cleanCodeBasicNotes',
        },
        {
          text: 'Design Patterns Basic Notes',
          link: '/programming/devops/designPatternsBasicNotes',
        },
        {
          text: 'Software Testing Basic Notes',
          link: '/programming/devops/softwareTestingBasicNotes',
        },
        {
          text: 'Functional Programming Basic Notes',
          link: '/programming/functionalProgramming/functionalProgrammingBasicNotes',
        },
        {
          text: 'Game Design Basic Notes',
          link: '/programming/game/gameDesignBasicNotes',
        },
        {
          text: 'Linux Basic Notes',
          link: '/programming/linux/linuxBasicNotes',
        },
        {
          text: 'CMake Basic Notes',
          link: '/programming/tools/buildTools/CMakeBasicNotes',
        },
        {
          text: 'Git Basic Notes',
          link: '/programming/tools/git/gitBasicNotes',
        },
        {
          text: 'Vim Basic Notes',
          link: '/programming/tools/vim/vimBasicNotes',
        },
      ],
    },
    {
      text: 'Web',
      children: [
        {
          text: 'Angular Basic Notes',
          link: '/web/angular/angularBasicNotes',
        },
        {
          text: 'Bootstrap Basic Notes',
          link: '/web/css/bootstrapBasicNotes',
        },
        {
          text: 'CSS Advanced Notes',
          link: '/web/css/cssAdvancedNotes',
        },
        {
          text: 'CSS Basic Notes',
          link: '/web/css/cssBasicNotes',
        },
        {
          text: 'Sass Basic Notes',
          link: '/web/css/sassBasicNotes',
        },
        {
          text: 'Electron Basic Notes',
          link: '/web/frameworks/electronBasicNotes',
        },
        {
          text: 'jQuery Basic Notes',
          link: '/web/frameworks/jQueryBasicNotes',
        },
        {
          text: 'Library Basic Notes',
          link: '/web/frameworks/libraryBasicNotes',
        },
        {
          text: 'HTML Basic Notes',
          link: '/web/html/htmlBasicNotes',
        },
        {
          text: 'JavaScript Advanced Notes',
          link: '/web/javascript/javascriptAdvancedNotes',
        },
        {
          text: 'JavaScript Basic Notes',
          link: '/web/javascript/javascriptBasicNotes',
        },
        {
          text: 'TypeScript Basic Notes',
          link: '/web/javascript/typescriptBasicNotes',
        },
        {
          text: 'Express Basic Notes',
          link: '/web/node/expressBasicNotes',
        },
        {
          text: 'Graphql Basic Notes',
          link: '/web/node/graphqlBasicNotes',
        },
        {
          text: 'Message Queue Basic Notes',
          link: '/web/node/messageQueueBasicNotes',
        },
        {
          text: 'Node Basic Notes',
          link: '/web/node/nodeBasicNotes',
        },
        {
          text: 'React Basic Notes',
          link: '/web/react/reactBasicNotes',
        },
        {
          text: 'React Router Basic Notes',
          link: '/web/react/reactRouterBasicNotes',
        },
        {
          text: 'Redux Basic Notes',
          link: '/web/react/reduxBasicNotes',
        },
        {
          text: 'Security Basic Notes',
          link: '/web/security/securityBasicNotes',
        },
        {
          text: 'Vue Basic Notes',
          link: '/web/vue/vueBasicNotes',
        },
      ],
    },
  ];
}
