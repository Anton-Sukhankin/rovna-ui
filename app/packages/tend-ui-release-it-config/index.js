const version = '${version}';
const package = process.env.npm_package_name;

module.exports = {
  npm: {
    publish: false,
    skipChecks: true,
  },
  git: {
    requireUpstream: false,
    commit: true,
    tag: true,
    tagName: `${package}@${version}`,
    push: false,
    commitMessage: `chore(${package}): release v${version}`,
  },
  plugins: {
    '@release-it/conventional-changelog': {
      preset: 'angular',
      infile: 'CHANGELOG.md',
      path: '.',
      gitRawCommitsOpts: {
        path: '.',
      },
    },
  },
  hooks: {
    'before:release': ['yarn install', 'yarn test:update', 'git add --all'],
  },
};
