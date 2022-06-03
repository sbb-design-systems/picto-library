# How to release
This repository uses [Conventional Commits](https://www.conventionalcommits.org/) to generate the changelog.
See [PROCESS.md](./PROCESS.md).

To create the releases, [standard-version](https://www.npmjs.com/package/standard-version) will be used.
(For a detailled documentation, see https://www.npmjs.com/package/standard-version#cli-usage)

## Setup Release Tools

1. Install [NodeJS](https://nodejs.org/)
2. Open a console and run `npm install --global standard-version`

## First release
1. Open a console and navigate to repo root (`cd /path/to/repo`)
2. Checkout master branch or other stable branch (`git checkout master` or `git checkout {branch}`)
3. Git pull (`git pull`)
4. Execute `standard-version --first-release`  
   This will create the CHANGELOG.md file, commit it with the message `chore(release): 1.0.0` and create the git tag `v1.0.0`
5. Run `git push --follow-tags origin master` to publish the release (commit and tag) to GitHub

## Release
1. Open a console and navigate to repo root (`cd /path/to/repo`)
2. Checkout master branch or other stable branch (`git checkout master` or `git checkout {branch}`)
3. Git pull (`git pull`)
4. Execute `standard-version`  
   This will update the CHANGELOG.md file, commit it with the message `chore(release): {version}` and create the git tag `v{version}`  

   `{version}` will be a major version increase (e.g. 1.1.0 => 2.0.0), if a previous commit since the last release contains a BREAKING CHANGE in the description  
   `{version}` will be a minor version increase (e.g. 1.1.0 => 1.2.0), if a previous commit message since the last release starts with `feat` (e.g. `feat: feature description` or `feat(scope): feature description`)  
   `{version}` will be a patch version increase (e.g. 1.1.0 => 1.1.1), if the above rules are not met
5. Run `git push --follow-tags origin master` to publish the release (commit and tag) to GitHub

## Prerelease
1. Open a console and navigate to repo root (`cd /path/to/repo`)
2. Checkout master branch or other stable branch (`git checkout master` or `git checkout {branch}`)
3. Git pull (`git pull`)
4. Execute `standard-version --prerelease beta`
   This will update the CHANGELOG.md file, commit it with the message `chore(release): {version}-beta.{count}` and create the git tag `v{version}-beta.{count}`   

   `{version}` will NOT CHANGE, if the previous release was also a prerelease  
   `{version}` will be a major version increase (e.g. 1.1.0 => 2.0.0), if a previous commit since the last release contains a BREAKING CHANGE in the description  
   `{version}` will be a minor version increase (e.g. 1.1.0 => 1.2.0), if a previous commit message since the last release starts with `feat` (e.g. `feat: feature description` or `feat(scope): feature description`)  
   `{version}` will be a patch version increase (e.g. 1.1.0 => 1.1.1), if the above rules are not met  
   `{count}` will be `0` or an increment of the last prerelease, if the last release was a prerelease (e.g. 1.1.0-beta.0 => 1.1.0-beta.1
5. Run `git push --follow-tags origin master` to publish the release (commit and tag) to GitHub