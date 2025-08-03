---
title: Errorbank - Categories
author: Leventemo
pubDatetime: 2025-06-30T15:10:43Z
postSlug: errorbank-categories
draft: true
tags:
  - projects
  - language
description: "... in which frogs don't just sit, each in a box. But some boxes do."
---

## Table of contents


## recording errors

isolating errors - where possible without distorting data
* *Also put in the summer snails.*
  + *They also put snails in the summer.* -> *They also serve snails in the summer.*
  + *Also offer snails in the summer.* -> *They also offer snails in the summer.*
  + *They also offer in the summer snails.* -> *They also offer snails in the summer.*
* *Can you borrow to my your bycicle?*
  + *Can you borrow me your bicycle?* -> *Can you lend me your bicycle?*
  + *Can you lend to me your bicycle?* -> *Can you lend me your bicycle?*
  + *to my* -> *to me*
  + *bycicle* -> *bicycle*

not isolating where not possible/needed
* *I like her decoration and her pizzas are awesome.* -> *I like the decoration (inside) and the pizzas are awesome.* - one error in two "implementation"

as it's visible now, I manipulate data ...
* arguably not scientific
* SOLUTION: record "orig" as well

## error categories

### one error, one box

As long as an error fits into one of a series of distinct, exclusive categories, no problem. **tipical* -> *typical* is one type of error, **Is wonderful.* -> *It is wonderful.* is a completely different one. That's the scenario I had in mind when I started playing with the idea of an error bank. And that's a strict model you might expect from a database: there are, say, 100 records in the rows and you are told how-many-of-a-hundred each of your categories reach. Nice and clean. So clean you already see it in the form of some graph. So nice it took me a while to give up fighting real data just because I wanted to stick to this model.

### one error, many boxes

As I started looking at examples and categorizing them, I realized that a bulk of them fall into multiple types. The error **I'll give it back for you.* -> *I'll give it back to you.* can be - and should be - categorized as __vocab__ > __preposition__ but if we want information about how the ability to use indirect objects evolves across levels, we might want to mark it as __syntax__ > __indirect_obj__ as well. This is exactly what a database is good for and good at: with both categories marked true, it will list the error when we want to look at mistakes of the prepositions type as well as mistakes of the indirect object types. Obviously, not all errors of the __preposition__ type will be marked as __indirect_obj__ and vica versa.

#### more examples

Here is an example of two similar but not identical types of error:
* *my restaurant favourite* -> *my favourite restaurant*
	+ This is clearly a problem with the word order of adjectives. One error, one box: __syntax__ > __adj__
  * NOTE: Actually, it might not be the best example bc we might decide to set up a __pool_word_order__ category
* *about my places favourites* -> *about my favourite places*
	+ There are two mistakes being made here: one is identical to what we see in the previous example (__syntax__ > __adj__), the other has something to do with the use of singular/plural (__syntax__ > __sing_plur__)

### no error, no box

I also realized that I'm free :) All my categories about language are arbitrary and there's no need to strive for a complete system that describes language as a whole. That's not our goal and there have been attempts to do that anyway, [one](https://en.wikipedia.org/wiki/A_Comprehensive_Grammar_of_the_English_Language) of them causing sleepless nights to at least one student at uni. It's also amusing that we use language to describe language but that IS a whole different box of frogs, really. Back to the point, if I find that I as a language teacher or language learner want to be informed about something, I can set up a category for that. If, when all data is fed into the database, there remain a couple of empty category columns, hey, I'm free to delete them!

### boxes in boxes

... and I can set up categories that overlap with or contain another. I just need to be consistent while feeding data into all these categories.

example: ...pool

 _friday_ is a spelling mistake but it could/should be listed as a capitalization error as well. Should these two categories be exclusive or inclusive (one category being part of the other)? A framework needs to be developed but it can only be done on the fly, renaming, adjusting, restructuring it while filling up the database.


* **friday*
	+ spelling (writing mechanics)
	+ capitals (capitalisation)

#### more examples
 ...







sometimes the boundaries are not so clear
* **They put very big tapas.* - put & poner(se) - are they false friends or do they just sound too similar to be distinguished?

many of the __vocab_form__ type errors are also __syntax__ errors
```
SELECT errors.id, error, correct, spelling_id, vocab_id, syntax_id, tense_id
FROM errors
INNER JOIN vocab ON vocab.id = vocab_id
WHERE form = true;
```

The interesting thing is, many of these errors come across as one type but the root of the error is another type. Eg.: **the people is very nice* As a teacher marking this, you would probably underline the word "is" in this phrase but the real reason is the Spanish equivalent of the word "people" (la gente), which is always uncountable. Should it be classified as a vocab error or a syntax error? A good database should probably shore it up at both sides.

### a tree view with examples:

SQL:
```
SELECT errors.id, error, correct, spelling.id, spelling.capitals, spelling.orthography FROM errors
JOIN spelling ON spelling.id = spelling_id
WHERE errors.spelling_id IS NOT NULL;
```

__vocabulary__ (inclusive sub-categories here!)
* __meaning__, eg. ...
* __form__, eg. ...
* __use__, eg. ...
* __register__, eg. ...

eg. they put very good tapas (poner)
* NOTE: the notion of vocabulary includes MEANING & FORM
* so the appropriate word is used but with an incorrect garammar, that is still counted as a vocabulary mistake
	+ eg. **They serve a very big tapas.* -> *They serve very big tapas.*
* but if relevant, also marked for syntax at the same time
	+ eg. as mentioned above, **the people is very nice* is marked for both vocab and syntax
* funny vs fun: treated as two words -> **it's very funny*: labelled as __vocab.meaning__

* __false_friend__ (inclusive with __meaning__)
	+ eg. **The plate was potatoes with bacon.* (un plato "dish")
	+ did you know there are "false false friends", probably based on similar-sounding forms?
		- **In the restaurant have a friendly atmosphere.* (hay)
		- **In the street have a lot of children.* (hay)
		- **They put very good tapas.* (poner)
	+ __mng_false friends__ are also marked for __mng_pool__

* __collocation__, eg. ...

* __phrasal_verb__ (inclusive with __meaning__ or __form__ or __use__), eg. ...

* __preposition__ (probably inclusive with __meaning__ or __form__ or __use__), eg. ...
	+ eg. **I'll give it back for you.* -> *I'll give it back to you.*


SQL:
```sql
SELECT errors.id, error, correct, meaning, form, use, register, false_friend, collocation, phrasal_verb, preposition, prefix, suffix, chunk FROM errors
JOIN vocab ON vocab.id = vocab_id
WHERE errors.vocab_id IS NOT NULL;
```


verb pattern - verb patterns: https://dictionary.cambridge.org/grammar/british-grammar/verb-patterns
* the cases mentioned in the above link plus give, send, etc: direct-indirect objects

word order - word order: https://dictionary.cambridge.org/grammar/british-grammar/word-order-structures?q=word+order
* although word order is part of syntax, for now, a word order column is still included but a word order error is always marked for syntax as well
	+ when data accumulates and we'll see what other types of syntax errors emerge, we'll decide if it worth keeping or can be deleted

syntax
* eg. * I know this people. (also marked for vocabulary)

tenses

other

marked for 2 categories:
* * I know this people. (vocabulary + syntax)
* word order is always marked for syntax as well
* I can give to you my bike. (preposition + verb pattern)


pronunciation: no records, unfortunately

## error categories

WRITING_MECHANICS
* spelling, eg. **wicht* -> *with*
* capitalisation, eg. **friday* -> *Friday*

VOCABULARY
* mng_pool
* mng_false friends
* mng_phrasal_verb
* mng_idiom
* form_pool
* form_phrasal_verb
* form_idiom
* form_irregular_verb
* form_plural (move to syntax?)
* form_irregular_plural
* form_prefix
* form_suffix
* form_chunk
* use_pool
* use_countable_uncountable
* register
* collocation
* preposition

SYNTAX
* subject_pool
* missing_subject, eg. **Is a fast food restaurant.* -> *It is a fast food restaurant.*
* object_pool
* indirect_obj
* verb_pattern
* adjective_pool
* adjective_word_order
* adjective_sing_plur
* sing_plur_pool
* adverb
* third_singular
* article
* some_any
* word_order_pool

TENSE
* pres_simp
* pres_cont
* pres_perf_simp
* pres_perf_cont
* past_simp
* past_cont
* past_perf_simp
* past_perf_cont
* fut_simp
* fut_cont
* fut_perf_simp
* fut_perf_cont
* arranged
* insta_decision
* gonna_plan
* gonna_evidence

REVISIT

## creating records

### focus on the target language

Looking at a simple example, when dealing with a tense error like **This weekend I'll go to Granada with my friends.*, although the wrong word is "will", the chosen label should have nothing to do with it or __fut_simp__. In order to be consitent and informative, it should be labelled according to what the intended (but missed) wording would be. In this case this is what we call "Present Continuous for arrangements" (__arranged__ for short in our db).

You might be tempted to think that the error **give for you information* is a __vocab > preposition__ error and cast it that. However, when categorizing mistakes it's essential to focus on the target language rather than what emerges from the erroneous form. Although there's a preposition in the error, the intended/target language is indirect object. We should use/create categories based on that target language so it got labbelled as __syntax > indirect_obj__.

That means the following:

| error                     | preposition | indirect_obj |
| :------------------------ |:-----------:|:------------:|
| give for you information  | no          | yes          |
| I can give to you my bike.| no          | yes          |
| I couldn't write you.     | yes         | yes          |

still, if possible, avoid casting errors under multiple categories
* reasons
	+ distorts statistics?
	+ leads to more error-prone records?

### 2 errors in one

#### a) an error cluster

when 2 or more errors in one: recorded as 2 entries, pruning the text a bit in order to focus on the error.
* eg. * **Also put in the summer snails*. became 3 records
	+ * **They also put snails in the summer.* (vocabulary error)
	+ * **Also offer snails in the summer.* (syntax: missing subject)
	+ * **They also offer in the summer snails.* (word order)

#### b) one error allowing for multiple interpetations

**I know this people.* Should it be labelled as __vocab.form__ or as __syntax.sing_plur__? Or both?

It is true we see a fair number of incorrect use of the word "this" and that's the incorrect word here but what really generates this error is the Spanish word *la gente* which is singular. Examples without the word *this* attest to it, **the people is very nice*. The are categorized as __vocab.form__ although errors like **I like this restaurants* will go under __syntaxsing_plur__.

multiple categories used:
* __false_friend__ - __vocab.meaning__

## SQL

list all spelling errors
```sql
SELECT error, correct
FROM errors
JOIN spelling ON spelling.id = errors.spelling_id;
```

list spelling errors of the "capitals" type
```sql
SELECT error, correct
FROM errors
JOIN spelling ON spelling.id = errors.spelling_id
WHERE capitals = TRUE;
```

spelling errors grouped by correct form, groups sorted by group frequency count, all levels
```sql
SELECT
  CASE WHEN row_num = 1 THEN correct ELSE NULL END AS correct,
  CASE WHEN row_num = 1 THEN frequency ELSE NULL END AS frequency,
  error
FROM (
  SELECT correct, error,
         ROW_NUMBER() OVER (PARTITION BY correct ORDER BY error) AS row_num,
         COUNT(*) OVER (PARTITION BY correct) AS frequency,
         COUNT(*) OVER (PARTITION BY error) AS error_count,
         group_frequency
  FROM (
    SELECT correct, error,
           COUNT(*) OVER (PARTITION BY correct) AS group_frequency
    FROM errors
    WHERE spelling_id IS NOT NULL
  ) e
) e
WHERE row_num = 1 OR error_count = 1
ORDER BY group_frequency DESC;
```

spelling errors grouped by correct form, groups sorted by group frequency count, level 2
```sql
SELECT
  CASE WHEN row_num = 1 THEN correct ELSE NULL END AS correct,
  CASE WHEN row_num = 1 THEN frequency ELSE NULL END AS frequency,
  error
FROM (
  SELECT correct, error,
         ROW_NUMBER() OVER (PARTITION BY correct ORDER BY error) AS row_num,
         COUNT(*) OVER (PARTITION BY correct) AS frequency,
         COUNT(*) OVER (PARTITION BY error) AS error_count,
         group_frequency
  FROM (
    SELECT correct, error,
           COUNT(*) OVER (PARTITION BY correct) AS group_frequency
    FROM errors
    WHERE spelling_id IS NOT NULL
		AND level_id = 2
  ) e
) e
WHERE row_num = 1 OR error_count = 1
ORDER BY group_frequency DESC;
```

## landing page

X students
X levels
X courses
X pieces of writing
X errors categorized as
* ... (a list + number of errors)
X average number of errors in assignments per level


