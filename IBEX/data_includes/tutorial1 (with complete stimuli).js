// Section 3 in the tutorial

var shuffleSequence = seq(
    "introduction",
    sepWith("sep", rshuffle(startsWith("main"), startsWith("fill"))));


// Section 4 in the tutorial: setting defaults

var defaults = [
    "AcceptabilityJudgment", {
        q: "Please choose the more likely interpretation!",
    }
];


// Section 2 in the tutorial

var items = [

// Transitions and counters

["sep", "Separator", { }],

["setcounter", "__SetCounter__", { }],

// Intro

["introduction", "Message", {
    html: ["div",
    ["p", "In this experiment... you will do blah blah. The experiment will take 10 mins."],
    ["p", "실험 시작!"]] }
],

// Main trials:
// [["trialtype-trialconditions", item #], "Controller type", {arguments to controllers}]

//Item 1
[["main-every-yesres", 1], "AcceptabilityJudgment", {
    s: "A maid polished every mirror spotless.",
    as: ["Each mirror was polished by a possibly different maid.", "All the mirrors were polished by the same maid."]}
    ],

[["main-every-nores", 1], "AcceptabilityJudgment", {
    s: "A maid polished every mirror.",
    as: ["Each mirror was polished by a possibly different maid.", "All the mirrors were polished by the same maid."]}
    ],

[["main-each-yesres", 1], "AcceptabilityJudgment", {
    s: "A maid polished each mirror spotless.",
    as: ["Each mirror was polished by a possibly different maid.", "All the mirrors were polished by the same maid."]}
    ],

[["main-each-nores", 1], "AcceptabilityJudgment", {
    s: "A maid polished each mirror.",
    as: ["Each mirror was polished by a possibly different maid.", "All the mirrors were polished by the same maid."]}
    ],

//Item 2

[["main-every-yesres", 2], "AcceptabilityJudgment", {
    s: "A helper dyed every shirt blue.",
    as: ["Each shirt was dyed by a possibly different helper until it was the color blue.",
    "All the shirts were dyed by the same helper until they were the color blue."]}
    ],

[["main-every-nores", 2], "AcceptabilityJudgment", {
    s: "A helper dyed every shirt.",
    as: ["Each shirt was dyed by a possibly different helper.", "All the shirts were dyed by the same helper."]}
    ],

[["main-each-yesres", 2], "AcceptabilityJudgment", {
    s: "A helper dyed each shirt blue.",
    as: ["Each shirt was dyed by a possibly different helper until it was the color blue.", "All the shirts were dyed by the same helper until they were the color blue."]}
    ],

[["main-each-nores", 2], "AcceptabilityJudgment", {
    s: "A helper dyed each shirt.",
    as: ["Each shirt was dyed by a possibly different helper.", "All the shirts were dyed by the same helper."]}
    ],

//Item 3

[["main-every-yesres", 3], "AcceptabilityJudgment", {
    s: "A janitor dusted every bookcase spotless.",
    as: ["Each bookcase was dusted by a possibly different janitor until it was spotless.",
    "All the bookcases were dusted by the same janitor until they were spotless."]}
],

[["main-every-nores", 3], "AcceptabilityJudgment", {
    s: "A janitor dusted every bookcase.",
    as: ["Each bookcase was dusted by a possibly different janitor.",
    "All the bookcases were dusted by the same janitor."]}
],

[["main-each-yesres", 3], "AcceptabilityJudgment", {
    s: "A janitor dusted each bookcase spotless.",
    as: ["Each bookcase was dusted by a possibly different janitor until it was spotless.",
    "All the bookcases were dusted by the same janitor until they were spotless."]}
],

[["main-each-nores", 3], "AcceptabilityJudgment", {
    s: "A janitor dusted each bookcase.",
    as: ["Each bookcase was dusted by a possibly different janitor.",
    "All the bookcases were dusted by the same janitor."]}
],

//Item 4

[["main-every-yesres", 4], "AcceptabilityJudgment", {
    s: "A gardener pruned every bush short.",
    as: ["Each bush was pruned by a possibly different gardener until it was short.",
    "All the bushes were pruned by the same gardener until it was short."]}
],

[["main-every-nores", 4], "AcceptabilityJudgment", {
    s: "A gardener pruned every bush.",
    as: ["Each bush was pruned by a possibly different gardener.",
    "All the bushes were pruned by the same gardener."]}
],

[["main-each-yesres", 4], "AcceptabilityJudgment", {
    s: "A gardener pruned each bush short.",
    as: ["Each bush was pruned by a possibly different gardener until it was short.",
    "All the bushes were pruned by the same gardener until it was short."]}
],

[["main-each-nores", 4], "AcceptabilityJudgment", {
    s: "A gardener pruned each bush.",
    as: ["Each bush was pruned by a possibly different gardener.",
    "All the bushes were pruned by the same gardener."]}
],

// fillers

["filler-good1-01", "AcceptabilityJudgment", {
    s: "Only one boy enjoyed the show on the beach.",
    q: "Please choose the more likely interpretation.",
    as: ["Nobody but one boy enjoyed the show on the beach.", "Nobody enjoyed the show on the beach."]}
    ],

["filler-good2-02", "AcceptabilityJudgment", {
    s: "Only three girls went to the movies.",
    q: "Please choose the more likely interpretation.",
    as: ["Exactly two girls went to the movie.", "Exactly three girls went to the movies."]}
],

["filler-good3-03", "AcceptabilityJudgment", {
    s: "Two gardeners and one dancer had a drink.",
    as: ["There were two dancers who had a drink.", "There was one dancer who had a drink."]}
],

["filler-good4-04", "AcceptabilityJudgment", {
    s: "Exactly five smokers brought cigars.",
    as: ["More than ten smokers brought cigars.", "Less than ten smokers brought cigars."]}
]

];
