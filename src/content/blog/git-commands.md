---
title: Git commands
author: Leventemo
pubDatetime: 2025-05-05T06:29:23Z
postSlug: git-commands
featured: false
draft: false
tags:
  - tooling
  - git
description: "Non-trivial Git commands."
---

find out about your remote/origin
* `git ls-remote --get-url origin`
  + get the URL of the remote that your repo was cloned from
  + doesn't require network connection
* `git remote show origin`
  + get more info about the remote repo, eg. its branches
  + requires network connection
* `git remote -v`
  + if your remote is not called origin, get the URLs of all remotes
  + remotes can be added, removed or modified at any time so there is a chance that the remotes in your local repo don't include the remote it was originally cloned from

turn off fast-forwarding for one pull
* `git pull --no-ff`

log divergent histories between branches
* `git log --oneline --decorate --graph --all`

interactive staging
* `git add -i`

change most recent commit message
* `git commit --amend -m "an updated commit message"`
