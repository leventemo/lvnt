---
title: Errorbank - Intro
author: Leventemo
pubDatetime: 2025-05-31T15:10:43Z
draft: true
tags:
  - databases
  - language
  - tefl
  - L1_interference
description: "Working out principles of designing a database of errors made by Spanish speakers when using English."
---

## the idea

I spent 11 years teaching English in Spain and while listening to people speaking English in the classroom and in the street, I witnessed something that struck me first and kept fascinating me all those years. When trying to express themselves in English but feeling unable to find the right word, Spanish speakers have a secret weapon that had been absolutely unknown to me, someone whose first language is Hungarian. It's the habit of using Spanish words with an English-sounding pronunciation to fill the gaps in your English vocabulary.

And it works, most of the time. Depending on the speaker's level of English and linguistic awareness, they tend to hazard this technique with various degrees of confidence; the "English-sounding" pronunciation might be far from perfect, spelling might turn out to be plain Spanish when done in writing and the right register is very often missed but communication is maintained and the message is delivered.

Researchers of language learning call it L1 interference and it's easy to pinpoint the background reasons to it in the case of Spanish and English. There's a vast amount of shared vocabulary between them. Spanish is a Latin language and English has a body of Latin loan words coming directly from church Latin or via French. [This website](https://www.colorincolorado.org/guide/cognate-list-english-and-spanish) claims 30-40% of all English words "have a related word in Spanish" and [here is](https://www.quia.com/files/quia/users/ijcano/SPAN_FALL_2010/SPAN_2001/Instant-Spanish-Vocabulary---September-2010.pdf) an attempt, written for English speakers, to help them boost their Spanish vocabulary.

Categorizing and quantifying different types of errors at different levels of the learning process could offer useful statistical insights to learners and teachers alike, that's what this project is all about.

## the data

Part of my job was marking writing, mock exams most of the time or assignments modelled after typical exam tasks, so I was exposed to written Spanglish. There was an emphasis on giving learners and parents quality feedback on both written and spoken English. After a while my initial amusement turned into an interest in trying to get a deeper understanding of the types of mistakes my students made and I started collecting them. This project is nothing else than an attempt to build a framework around the data in my notes. Of course, more data would offer more refined statistics but that remains an open question for a next step in the future.

The original idea of a possible project was something that would only look at spelling mistakes. The outcome of it would have been a blog post or an updatable database interface listing misspelled words ordered by frequency. However, once you start sorting the material into different types, ignoring any example feels like a lost opportunity, even if you need to rethink your system of categories again and agan. To cut it short, I decided to go for the whole hog and try to include everything, be it spelling, vocabulary, syntax, etc. More work, slower progress but also more exciting outcome, hopefully.

## levels and courses

This is a list of Common European Framework of Reference levels and the preparation courses at the academy my data comes from. From B1 up, each level is covered by two 1-year courses, named loosely after their targeted Cambridge exam. Since these courses break up each level into two sublevels, including both levels AND courses in the database will offer more refined statistics. There's no data for A1 and A2 levels at the moment.

| CEFR level |    course    |
| :---------: | :----------- |
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

## design principles

Needless to say, I'm aiming at an even data distribution across all levels/courses in terms of the number of writers (ie. students) and "assignments" (ie. pieces of writing), otherwise some of the queries below would bring up distorted statistics.

## the outcome

here is a quick list of example queries:
* list and sort the most common spelling mistakes and the correct forms at a given level
* show a statistical overview of the number of errors using false friends across different levels
* show a statistical overview of all the different types of errors across different levels (begs for some kind of dataviz)
* list and sort all errors according to frequency, filtering for a selected level
* list and sort all types errors according to frequency, filtering for a selected level
* list and sort selected categories of errors according to frequency, filtering for a selected level
