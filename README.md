# SDJS Speaker Pipeline

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

## Setting up the local environment

```sh
$ npm install
```

## Environment variables required

Create a .env file

```sh
ADMIN_USERNAME=admin
ADMIN_EMAIL=your@email.com
ADMIN_PASSWORD=test
ADMIN_PHONE=6193331234
NODE_ENV=development
EMAIL_TEMPLATE='d-e3b133a99ff54546bc7354c214579d41'
SENDGRID_API_KEY=XXXXXXX
```

## Run tests

Make sure you have all the dependencies installed. See above.

Then from the command line you can run the tests using:

```
$ npm run test
```

## Run server in Developer mode

```
$ npm run dev
```

## How to Contribute:

**Working on your first Pull Request?** You can learn how from this _free_ series [How to Contribute to an Open Source Project on GitHub](https://egghead.io/series/how-to-contribute-to-an-open-source-project-on-github)

### Getting Started

1. Fork the project
![fork repo screenshot](readme-images/button_fork.png)
2. Clone your fork
![clone repo screenshot](readme-images/button_clone-repo.png)
3. Make sure you are in the right directory: `cd speaker-pipeline`
4. Add an `upstream` remote for keeping your local repository up-to-date:
   > `git remote add upstream git@github.com:huynhicode/speaker-pipeline.git`
5. Create a file called `.env`
6. Grab the environment variables from a project organizer, and paste them into the `.env` file
7. Run `npm install` to install the project dependencies
8. Run `npm start` to start your dev environment

### Reporting Bugs

1. Navigate to the "issues" tab, or [click here](https://github.com/huynhicode/speaker-pipeline/issues)
![issues tab screenshot](readme-images/tab_issues.png)
2. Click on the "New issue" button
![new issue button screenshot](readme-images/button_new-issue.png)
3. Click on the "Get started" button to open a new bug report
![bug report get started screenshot](readme-images/button_bug-report-get-started.png)
  - Create a title (keep it short and descriptive)
  - Fill in the template with specific information about the bug
4. Click on the gear icon next to "Labels" and select the difficulty level required to fix the bug
![difficulty level screenshot](readme-images/labels_difficulty-level.png)
5. Scroll to the bottom of the page and click on the "Submit new issue" button
![submit new issue screenshot](readme-images/button_submit-new-issue.png)


### Creating a new PR

1. Make sure you are on the `master` branch, and you have pulled the latest changes

   > `git checkout master && git pull upstream master`

2. Install any new dependencies: `npm install`

3. Create a new branch off of the `master` branch

   > `git checkout -b [NEW BRANCH NAME]`

   > **Branch naming conventions:**  
   > `fix/[BRANCH]` for bug fixes  
   > `feature/[BRANCH]` for new features  
   > `dev/[BRANCH]` for non-user-facing changes  
   >  
   > The `[BRANCH]` portion should be kebab case. For example, if you want to update the README.md file, your branch could be called `dev/update-readme`

4. Make changes and commit them. `git add . && git commit -m "[YOUR COMMIT MESSAGE]"`

   > The subject of a commit message (the first line) should be 72 characters or less. If you need more room for a longer explanation of your changes, you can add a blank line below the subject and write a commit body. The commit message should be in present-imperative tense ("Update README.md" rather than "Updates" or "Updated").

5. Push your branch to your fork: `git push -u origin [BRANCH NAME]`

6. Open a new PR against the `master` branch from your fork using the GitHub user interface
