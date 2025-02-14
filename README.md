# Schedulicious

 The Menu Scheduler is a manual scheduling tool that enables managers to create and share weekly menus with staff. It simplifies communication by providing clear meal plans and accounting for dietary restrictions and allergies.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- Yarn

### Development

#### Install Dependencies
```bash
yarn install
```

#### Start Development Server
```bash
yarn dev
```
## 📖 Development Guide

### Git Workflow

**Branch Structure:**
```
main ← release PR ← dev ← PR ← feature/bug branches
```

**Steps:**
1. Create branch from `dev`
```bash
git checkout dev
git pull origin dev
git checkout -b feature/your-feature
```

2. Push changes & create PR to `dev`
```bash
git push origin feature/your-feature
```

3. After PR approval & merge:
   - Delete feature branch
   - Changes go to `main` via release PRs

### Commit Messages
Format: `[type]: message`

Types:
- `feat`: New features
- `fix`: Bug fixes
- `docs`: Documentation
- `style`: Formatting
- `refactor`: Code restructuring
- `test`: Tests
- `chore`: Maintenance

Examples:
```bash
feat: add calendar component
fix: resolve date picker bug
docs: update setup guide
```

## Our Team

- Chloe Zhou #1: [GitHub](https://github.com/xyzhou-projects) / [LinkedIn](https://www.linkedin.com/in/xyzhou-developer)
- Nurul Mukhlisa #2: [GitHub](https://github.com/numulaa) / [LinkedIn](https://www.linkedin.com/in/nurul-mukhlisa/)

  ...

- Teammate name #n: [GitHub](https://github.com/ghaccountname) / [LinkedIn](https://linkedin.com/in/liaccountname)

---
## Original Documentation

Your project's `readme` is as important to success as your code. For
this reason you should put as much care into its creation and maintenance
as you would any other component of the application.

If you are unsure of what should go into the `readme` let this article,
written by an experienced Chingu, be your starting point -
[Keys to a well written README](https://tinyurl.com/yk3wubft).

And before we go there's "one more thing"! Once you decide what to include
in your `readme` feel free to replace the text we've provided here.

> Own it & Make it your Own!

## Team Documents

You may find these helpful as you work together to organize your project.

- [Team Project Ideas](./docs/team_project_ideas.md)
- [Team Decision Log](./docs/team_decision_log.md)

Meeting Agenda templates (located in the `/docs` directory in this repo):

- Meeting - Voyage Kickoff --> ./docs/meeting-voyage_kickoff.docx
- Meeting - App Vision & Feature Planning --> ./docs/meeting-vision_and_feature_planning.docx
- Meeting - Sprint Retrospective, Review, and Planning --> ./docs/meeting-sprint_retrospective_review_and_planning.docx
- Meeting - Sprint Open Topic Session --> ./docs/meeting-sprint_open_topic_session.docx

## Our Team

Everyone on your team should add their name along with a link to their GitHub
& optionally their LinkedIn profiles below. Do this in Sprint #1 to validate
your repo access and to practice PR'ing with your team _before_ you start
coding!

- Chloe Zhou #1: [GitHub](https://github.com/xyzhou-projects) / [LinkedIn](https://www.linkedin.com/in/xyzhou-developer)
- Nurul Mukhlisa #2: [GitHub](https://github.com/numulaa) / [LinkedIn](https://www.linkedin.com/in/nurul-mukhlisa/)
- Gary Lei #3: [GitHub](https://github.com/xsymmetry9) / [LinkedIn](https://www.linkedin.com/in/gary-lei/)
