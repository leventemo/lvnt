---
title: Errorbank - Intro
author: Leventemo
pubDatetime: 2025-06-26T06:10:43Z
postSlug: errorbank-intro
featured: false
draft: false
tags:
  - databases
  - language
description: "A database of errors made by Spanish speakers when using English."
---

## Table of contents

## the idea

I spent a good few years teaching English in Spain and while listening to people using English in the classroom or otherwise, I witnessed something that struck me first and kept fascinating me all those years. When trying to express themselves in English, but feeling unable to find the right word, Spanish speakers tend to reach for a secret weapon that had been absolutely unknown to me, someone whose first language is Hungarian. It's the habit of using Spanish words with an English-sounding pronunciation to fill the gaps in your English vocabulary.

And it works, most of the time. Depending on the speaker's level of English and linguistic awareness, they hazard this technique with various degrees of confidence; the "English-sounding" pronunciation might be far from perfect, spelling might turn out to be plain Spanish when done in writing and the right register is very often missed but communication is maintained and the message is delivered.

Researchers of language learning talk about something they call "L1 interference" (L1 meaning your first language, ie. your mother tongue) and it's easy to pinpoint the background reasons to it in the case of Spanish and English. There's a vast amount of shared vocabulary between them. Spanish is a language of Latin origin and English has a body of Latin loan words coming directly from church Latin, via French or [other routes](https://en.wikipedia.org/wiki/Latin_influence_in_English). [This website](https://www.colorincolorado.org/guide/cognate-list-english-and-spanish) claims 30-40% of all English words "have a related word in Spanish" and [here is](https://www.quia.com/files/quia/users/ijcano/SPAN_FALL_2010/SPAN_2001/Instant-Spanish-Vocabulary---September-2010.pdf) an attempt, written for English speakers, to help them boost their Spanish vocabulary.

Categorizing and quantifying different types of errors at different stages of the learning process could offer useful statistical insights to learners and teachers alike, that's what this project is all about.

## the data

Part of my job was marking writing, mock exams most of the time or assignments modelled after typical exam tasks, so I was exposed to written Spanglish. There was an emphasis on giving learners and parents quality feedback on both written and spoken English. After a while my initial amusement turned into an interest in trying to get a deeper understanding of the types of mistakes my students made and I started collecting them. This project is nothing else than an attempt to build a framework around the data in my notes. Of course, more data would offer more refined statistics but that remains an open question for a possible next step in the future.

## scope

The original idea of a possible project was something that would only look at spelling mistakes. The outcome of it could be a blog post or even an updatable database interface listing misspelled words ordered by frequency. However, once you start sorting the material into different types, ignoring any example feels like a lost opportunity, even if you need to rethink your system of categories again and again. To cut it short, I decided to go for the whole hog and try to include everything, be it spelling, vocabulary, syntax, etc. More work, slower progress but also more exciting results, hopefully. So the scope of the project is not strictly about L1 interference any more, it looks at errors in general, all types of them.

## levels and courses

Here is a list of the levels of the Common European Framework of Reference and the exam preparation courses at the academy my data comes from. From B1 up, each level is covered by two 1-year courses, named loosely after their targeted Cambridge exam. Since these courses break each level up into two sublevels, including both levels AND courses in the database will offer more refined statistics. There's no data for A1 and A2 levels at the moment.

| CEFR levels |   courses   |
| :---------: | :---------- |
| A1         | ...          |
| A2         | ...          |
| B1         | PET1         |
| B1         | PET2         |
| B2         | First1       |
| B2         | First2       |
| C1         | Advanced1    |
| C1         | Advanced2    |
| C2         | Proficiency1 |
| C2         | Proficiency2 |

This is what the `levels` table looked like until this week. I've just decided to simplify things to this one column though, which will still allow for filtering for CEFR levels or what "courses" represented in the previous version above.

| levels |
| :----: |
| A1.1   |
| A2.2   |
| B1.1   |
| B1.2   |
| B2.1   |
| B2.2   |
| C1.1   |
| C1.2   |
| C2.1   |
| C2.2   |

## design principles

When working with data, consistency is key at every stage: when creating a clear framework of distinct categories and while feeding data into it.

Needless to say, I'm aiming at an even data distribution across all levels/courses in terms of the number of writers (ie. students) and "assignments" (ie. pieces of writing), otherwise the queries would result in distorted statistics.

For a start, errors fall into four main categories:
* writing mechanics (spelling, that is, in everyday English),
* vocabulary,
* syntax
* and tenses.

Each of these is divided into subcategories and building a system of these subcategories is the real challenge. As mentioned above, it entails starting processing the material, setting up elements of a consistent framework, dealing with borderline cases, examples that might fall into multiple categories, categories that overlap others, rethinking and changing the system, going back and checking the consistency of your data. Work is still being done and a number of questions are still undecided. This is going to be the subject of another writeup here.

## the outcome

The user interface I am imagining accomodates filtering for levels/courses and error types. Sorting by frequency is a must and the queries are able to come back with the errors themselves listed or calculated frequency values.

Here is a quick list of a few example queries:
* list and sort the most common spelling mistakes and their respective correct forms at a given level/all levels
* list and sort distinct errors of the false friends type by frequency at a given level/all levels
* show a statistical overview of the number of errors of the false friends type across different levels
* show a statistical overview of all the different types of errors across different levels (begs for some kind of dataviz)
* list and sort all distinct errors by frequency at a given level/all levels
* list and sort all error types by frequency at a given level/all levels
* list and sort selected categories of errors by frequency at a given level/all levels

## tech stack

work is being done on prototyping right now, using these technologies
* Postgres database
* Express API server
* DB server: Prisma / Neon / DigitalOcean / Render ?
* Angular user interface
* some dataviz library, to be decided

to check out:
Cloudflare hosting
Zero Sync
Kysely
Knex.js
