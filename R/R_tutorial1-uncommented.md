R Tutorial I: Data summary and wrangling via Tidyverse
================
Sunwoo Jeong
2020/5/19

## Acknowledgement

This tutorial is based heavily on [Mike Frank’s tutorial of
Tidyverse](https://github.com/mcfrank/tidyverse-tutorial), which in turn
is based on Hadley Wickham’s [R for data
scientists](http://r4ds.had.co.nz/). What I’ve mainly done is to adapt
and translate the exercises in their materials so that we can work with
linguistic data that we’ve gathered together throughout the course.
Please access the .Rmd counterpart of this .md document and open it in R
Studio to run the codes included here and try out the
exercises.

<!-- ----------------------------------------------------------------------- -->

## Goals and Introduction

By the end of this tutorial, you will know:

  - What “tidy data” is and why we want our data to be this way
  - How to do some stuff with tidy data
  - How to get your data to be tidy (In particular, how to transform
    non-tidy output from IBEX/Qualtrics/etc. into tidy format)

This intro will describe a few concepts that you will need to know,
using the famous `iris` dataset that comes with `ggplot2`, as well as a
few sample linguistic data sets.

## Data frames

The basic data structure we’re working with is the data frame, or
`tibble` (in the `tidyverse` reimplementation). Data frames have rows
and columns, and each column has a distinct data type. The
implementation in Python’s `pandas` is distinct but most of the concepts
are the same.

`iris` is a data frame showing the measurements of a bunch of different
instances of iris flowers from different species. (Sepals are the things
outside the petals of the flowers that protect the petals while it’s
blooming, petals are the actual petals of the flower). Let’s examine how
the data set looks like, using the `head` command:

``` r
head(iris)
```

**Exercise.** There are many ways to get a particular value of a
variable in a data frame. You can use `$` to access a column, as in
`iris$Sepal.Length` or you can treat the data frame as a matrix, e.g.
`iris[1,1]` or even as a list, as in `iris[[1]]`. You can also mix
numeric references and named references, e.g. `iris[["Sepal.Length"]]`.
Turn to your neighbor (and/or google) and find a way to access the petal
length of the third iris in the dataset (row
3).

``` r
# fill me in with calls to the iris dataset that all return the same cell (third from the top, Petal Length).

iris$Species
```

    ##   [1] setosa     setosa     setosa     setosa     setosa     setosa    
    ##   [7] setosa     setosa     setosa     setosa     setosa     setosa    
    ##  [13] setosa     setosa     setosa     setosa     setosa     setosa    
    ##  [19] setosa     setosa     setosa     setosa     setosa     setosa    
    ##  [25] setosa     setosa     setosa     setosa     setosa     setosa    
    ##  [31] setosa     setosa     setosa     setosa     setosa     setosa    
    ##  [37] setosa     setosa     setosa     setosa     setosa     setosa    
    ##  [43] setosa     setosa     setosa     setosa     setosa     setosa    
    ##  [49] setosa     setosa     versicolor versicolor versicolor versicolor
    ##  [55] versicolor versicolor versicolor versicolor versicolor versicolor
    ##  [61] versicolor versicolor versicolor versicolor versicolor versicolor
    ##  [67] versicolor versicolor versicolor versicolor versicolor versicolor
    ##  [73] versicolor versicolor versicolor versicolor versicolor versicolor
    ##  [79] versicolor versicolor versicolor versicolor versicolor versicolor
    ##  [85] versicolor versicolor versicolor versicolor versicolor versicolor
    ##  [91] versicolor versicolor versicolor versicolor versicolor versicolor
    ##  [97] versicolor versicolor versicolor versicolor virginica  virginica 
    ## [103] virginica  virginica  virginica  virginica  virginica  virginica 
    ## [109] virginica  virginica  virginica  virginica  virginica  virginica 
    ## [115] virginica  virginica  virginica  virginica  virginica  virginica 
    ## [121] virginica  virginica  virginica  virginica  virginica  virginica 
    ## [127] virginica  virginica  virginica  virginica  virginica  virginica 
    ## [133] virginica  virginica  virginica  virginica  virginica  virginica 
    ## [139] virginica  virginica  virginica  virginica  virginica  virginica 
    ## [145] virginica  virginica  virginica  virginica  virginica  virginica 
    ## Levels: setosa versicolor virginica

``` r
summary(iris$Species)
```

    ##     setosa versicolor  virginica 
    ##         50         50         50

Now let’s take a look at some sample linguistic data. The data come from
my undergrad classes: the `korean-vowels` data in particular records
speaker gender/height and their F0, F1, F2, and F3 values. You can call
in the data using the `read.csv` command. You don’t need to set the
working directory as long as the .csv and the R script/markdown file are
under the same folder. If you do need to set the working directory, try
using relative paths rather than absolute ones.

``` r
## load the IBEX data
dati <- read.csv('expsemprag-ibextutorial-results-cleaned.csv')
## load the vowel data
datv <- read.csv('asmt1-korean-vowels.csv')
## load the consonants data
datc <- read.csv('asmt1-korean-stops.csv')
## load the unprocessed qualtrics data
dats <- read.csv('qualtrics-processed-sample.csv')

## set working directory (absolute path like the one below not recommended)
setwd("/Users/sunwoojeong/Documents/ExpLing2019/R-tutorial/")
```

> **Exercise.** Examine what columns are in the dat
dataset.

``` r
# fill me in with a command that could give us an overview of the data structure of datv and datc

head(datv)
summary(datv)
```

## Tidy data

> “Tidy datasets are all alike, but every messy dataset is messy in its
> own way.” –– Hadley Wickham

Here’s the basic idea: In tidy data, every row is a single
**observation** (trial), and every column describes a **variable** with
some **value** describing that trial.

And if you know that data are formatted this way, then you can do
amazing things, basically because you can take a uniform approach to the
dataset. From R4DS:

“There’s a general advantage to picking one consistent way of storing
data. If you have a consistent data structure, it’s easier to learn the
tools that work with it because they have an underlying uniformity.
There’s a specific advantage to placing variables in columns because it
allows R’s vectorised nature to shine.”

`iris` is a tidy dataset. Each row is an observation of an individual
iris, each column is a different variable. `datv` is also a tidy
dataset.

## (A possible first step) Data pre-processing in Excel

Recall our IBEX replication of the quantifier scope experiment (`dati`).
Take a moment to complete it so that we can work with expanded data:
[Link to the
experiment](https://spellout.net/ibexexps/sunwooj/expsemprag-tutorial1/experiment.html)

Take a look at the data. Are they tidy? How can we change them to make
them tidy?

There exists many ways and many different tools to wrangle the data so
that they become tidy. (The easiest would be to design or write up an
experiment so that it records the data in tidy format to begin with;
this is not always possible if you are utilizing external experiment
building softwares such as Qualtrics or IBEX).

Different people have different preferences. Some prefer doing the bulk
of the work in Excel, others mostly in R. I tend to use a little bit of
both if the need arises. While this is primarily an R tutorial, here are
some basic functions in Excel that might come in handy.

  - Data -\> Text to Columns -\> Choose the appropriate delimiter
    (assign a sensible delimiter during the experiment implementation
    phase)
  - Select column -\> F5 -\> Special -\> Blanks/OK -\> Delete/Delete
    Sheet Rows

## Data wrangling in R

Data like `dats` (output of a qualtrics experiment) instantiate another
comman output format that is not a tidy dataset. Let’s make it tidy.

``` r
dats_tidy <-
  dats %>% gather(trialtype, naturalness, -subj_gender, -subj_age, -subj_comm)

head(dats_tidy)
```

## Functions and Pipes

Everything you typically want to do in statistical programming uses
**functions**. `mean` is a good example. `mean` takes one **argument**,
a numeric vector.

``` r
mean(iris$Petal.Length)
```

We’re going to call this **applying** the function `mean` to the
variable `Petal.Length`.

Pipes are a way to write strings of functions more easily. They bring
the first argument of the function to the bedginning. So you can write:

``` r
iris$Petal.Length %>% mean
```

    ## [1] 3.758

That’s not very useful yet, but when you start **nesting** functions, it
gets better.

``` r
mean(unique(iris$Petal.Length))
```

    ## [1] 4.22093

``` r
iris$Petal.Length %>% unique() %>% mean(na.rm=TRUE)
```

    ## [1] 4.22093

or

``` r
round(mean(unique(iris$Petal.Length)), digits = 2)
```

    ## [1] 4.22

``` r
iris$Petal.Length %>% unique %>% mean %>% round(digits = 2)
```

    ## [1] 4.22

``` r
# indenting makes things even easier to read
iris$Petal.Length %>% 
  unique %>% 
  mean %>% 
  round(digits = 2)
```

    ## [1] 4.22

This can be super helpful for writing strings of functions so that they
are readable and distinct.

We’ll be doing a lot of piping of functions with multiple arguments
later, and it will really help keep our syntax simple.

**Exercise.** Rewrite these commands using pipes and check that they do
the same thing\! (Or at least produce the same output). Unpiped version:

``` r
length(unique(iris$Species)) # number of species
```

    ## [1] 3

Piped version:

``` r
# fill in the piped version!
```

**Exercise.** Using piped functions, figure out the mean of height and
the mean of F1, F2. F3, and F0 from datv. Also figure out number of
heights (which likely reduces to number of subjects).

``` r
# fill in the piped version!
```

# Tidy Data Analysis with `dplyr`

Reference: [R4DS Chapter 5](http://r4ds.had.co.nz/transform.html)

Let’s try manipulateing our data using “verbs” from `dplyr`. We’ll only
take a look at four verbs (but there are many other useful ones):

  - `filter` - remove rows by some logical condition
  - `mutate` - create new columns
  - `group_by` - group the data into subsets by some column
  - `summarize` - apply some function over columns in each group

## Exploring and characterizing the dataset

Inspect the various variables before you start any analysis. You can use
`summary`, or look at each variable by itself.

``` r
summary(datv)

unique(datv$word)

datv$word %>%
 unique %>%
 length
```

Alternatively, you can use interactive tools like `View`

``` r
View(datv)
```

## Filtering & Mutating

There are lots of reasons you might want to remove *rows* from your
dataset, including getting rid of outliers, selecting subpopulations,
etc. `filter` is a verb (function) that takes a data frame as its first
argument, and then as its second takes the **condition** you want to
filter on.

So if you wanted to look only at people with heights over 164, you could
do this. (Note you can give two conditions, could also do `ht > 164 & ht
< 178`). (equivalent: `filter(datv, ht > 164, ht < 178)`)

Note that we’re going to be using pipes with functions over data frames
here. The way this works is that:

  - `dplyr` verbs always take the data frame as their first argument,
    and
  - because pipes pull out the first argument, the data frame just gets
    passed through successive operations
  - so you can read a pipe chain as “take this data frame and first do
    this, then do this, then do that.”

This is essentially the huge insight of `dplyr`: you can chain verbs
into readable and efficient sequences of operations over dataframes,
provided 1) the verbs all have the same syntax (which they do) and 2)
the data all have the same structure (which they do if they are tidy).

An example of filtering:

``` r
datv %>%
  filter(ht > 164, 
         ht < 178) 

datv_av <-
  datv %>%
    filter(ht > 164, 
          ht < 178) 
```

What is it doing?

An example using our IBEX results:

``` r
## load the IBEX data which have not been cleaned yet
dati2 <- read.csv('expsemprag-ibextutorial-results.csv')

## Erasing rows where the value of the 'response' column is blank
dati2[dati2==""] <- NA

dati <-
  dati2 %>%
  filter(is.na(response) == 0) 

#Alternatively:
dati <-
  dati2 %>%
  filter(response != "NA") 
```

There are also times when you want to add or remove *columns*. You might
want to remove columns to simplify the dataset. There’s not much to
simplify in `datv`, but if you wanted to do that, the verb is `select`.

``` r
datv %>%
  select(sp, ht, word, wpos, vtype, vpos, F0) 

datv %>%
  select(-group) 

# learn about this with ?select
```

**Exercise.** Get rid of the redundant `stimuli` column in `dati`

``` r
dati <-
  dati %>%
  select(-stimuli)
```

Perhaps more useful is *adding columns*. You might do this perhaps to
compute some kind of derived variable. `mutate` is the verb for these
situations - it allows you to add a column. Let’s add a slope column to
our datc dataset.

``` r
datc_clean <- datc_clean %>%
  mutate(slope = (datc_clean$v1F0on - datc_clean$v2F0off)/duration)

head(datc_clean$slope)
```

Let’s add a new response column, `response2`, to our dataset `dati`,
which keeps track of whether the participant chose the wide scope or the
narrow scope interpretation.

``` r
dati$response <- as.character(dati$response)

dati <-
  dati %>%
  mutate(response = replace(response, str_detect(response, "All"), "wide")) %>% 
  mutate(response = replace(response, str_detect(response, "Each"), "narrow"))

dati$response <- as.factor(dati$response)
```

## Standard psychological descriptives

We typically describe datasets at the level of subjects, not trials. We
need two verbs to get a summary at the level of subjects: `group_by` and
`summarise` (kiwi spelling). Grouping alone doesn’t do much.

``` r
datv %>%
  group_by(sp) 

# What does it actually do? Does it do what we want it to do?
```

All it does is add a grouping marker.

What `summarise` does is to *apply a function* to a part of the dataset
to create a new summary dataset.

The general syntax: `summarise` takes multiple `new_column_name =
function_to_be_applied_to_data(data_column)` entries in a list.

Where these two verbs shine is in combination. Because `summarise`
applies functions to columns in your *grouped data*, not just to the
whole dataset\!

So we can group by age or condition or whatever else we want and then
carry out the same procedure, and all of a sudden we are doing something
extremely useful\!

``` r
datv_means <- datv %>%
  group_by(sp, wpos) %>%
  summarise(meanF0 = mean(F0))
datv_means
```

These summary data are typically very useful for plotting. (To be
covered in next class\!)

**Exercise.** Treat height as a factor and generate a summary of F0 mean
according to height difference.

**Exercise.** In preparation for the next lab class, think of other
summaries that may be useful in analyzing the scope data from IBEX, and
also the data from Jeong’s factivity and prosody paper.
