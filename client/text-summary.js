var dictionary = require('./text');

/**
 * Given a template string to format and serveral strings
 * to fill the template, it returns the formatted string.
 * @param template This is a string containing zero, one or
 *                 more occurrences of "%s".
 * @param ...strings
 * @returns The formattted template.
 */
function format(subject) {
    'use strict';

    var replaces = Array.prototype.slice.apply(arguments, [1, arguments.length]),
        parts = null,
        output,
        i;

    if (subject.match(/%s/g) === null && replaces.length > 0 || replaces.length !== subject.match(/%s/g).length) {
        throw 'Format error: The string count to replace do not matches the argument count. Subject: ' + subject + '. Replaces: ' + replaces;
    }

    output = subject;
    for (i = 1; i < arguments.length; i += 1) {
        parts = output.split('%s');
        output = parts[0] + arguments[i] + parts.slice(1, parts.length).join('%s');
    }

    return output;
}


/**
 * Provides a Text Summary for profiles.
 */
var TextSummary = function () {

    var self = {},
        //dictionary = i18n.getDictionary(lang),
        //tphrase = i18n.translatorFactory.createTranslator(dictionary.phrases); // i18n for phrases
        tphrase = function (key) {return dictionary.phrases[key];};

    // Download all static data.
    self.circumplexData = dictionary.traits;
    self.facetsData = dictionary.facets;
    self.valuesData = dictionary.values;
    self.needsData = dictionary.needs;

    function compareByRelevance(o1, o2) {
        var result = 0;

        if (Math.abs(0.5 - o1.percentile) > Math.abs(0.5 - o2.percentile)) {
            result = -1; // A trait with 1% is more interesting than one with 60%.
        }

        if (Math.abs(0.5 - o1.percentile) < Math.abs(0.5 - o2.percentile)) {
            result = 1;
        }

        return result;
    }

    function compareByValue(o1, o2) {
        var result = 0;

        if (Math.abs(o1.percentile) > Math.abs(o2.percentile)) {
            result = -1; // 100 % has precedence over 99%
        }

        if (Math.abs(o1.percentile) < Math.abs(o2.percentile)) {
            result = 1;
        }

        return result;
    }

    function getCircumplexAdjective(p1, p2, order) {
        console.log("Inside get CircumplexAdjective function");
        // Sort the personality traits in the order the JSON file stored it.
        var ordered = [p1, p2].sort(function (o1, o2) {
            var i1 = 'EANOC'.indexOf(o1.id.charAt(0)),
                i2 = 'EANOC'.indexOf(o2.id.charAt(0));

            return i1 < i2 ? -1 : 1;
        }),

            // Assemble the identifier as the JSON file stored it.
            identifier = ordered[0].id.concat(ordered[0].percentile > 0.5 ? '_plus_' : '_minus_').concat(ordered[1].id).concat(ordered[1].percentile > 0.5 ? '_plus' : '_minus'),
            traitMult = self.circumplexData[identifier][0],
            sentence = "%s";

        if (traitMult.perceived_negatively) {
            switch (order) {
                case 0:
                    sentence = tphrase('a bit %s');
                    break;
                case 1:
                    sentence = tphrase('somewhat %s');
                    break;
                case 2:
                    sentence = tphrase('can be perceived as %s');
                    break;
            }
        }

        return format(sentence, traitMult.word);
    }

    function getFacetInfo(f) {
        var data = self.facetsData[f.id.replace('_', '-').replace(' ', '-')],
            t,
            d;

        if (f.percentile > 0.5) {
            t = data.HighTerm.toLowerCase();
            d = data.HighDescription.toLowerCase();
        } else {
            t = data.LowTerm.toLowerCase();
            d = data.LowDescription.toLowerCase();
        }

        return {
            name: f.id,
            term: t,
            description: d
        };
    }

    function intervalFor(p) {
        // The MIN handles the special case for 100%.
        return Math.min(Math.floor(p * 4), 3);
    }

    function getInfoForValue(v) {
        var data = self.valuesData[v.id.replace(/[_ ]/g, '-')][0],
            d = v.percentile > 0.5 ? data.HighDescription : data.LowDescription;

        return {
            name: v.id,
            term: data.Term.toLowerCase(),
            description: d
        };
    }

    function getWordsForNeed(n) {
        // Assemble the identifier as the JSON file stored it.
        var traitMult = self.needsData[n.id];
        return traitMult;
    }

    function assembleTraits(personalityTree) {
        var sentences = [],
            big5elements = [],
            relevantBig5,
            adj,
            adj1,
            adj2,
            adj3;

        // Sort the Big 5 based on how extreme the number is.
        personalityTree.forEach(function (p) {
            big5elements.push({
                id: p.name,
                percentile: p.percentile
            });
        });
        big5elements.sort(compareByRelevance);

        // Remove everything between 32% and 68%, as it's inside the common people.
        relevantBig5 = big5elements.filter(function (item) {
            return Math.abs(0.5 - item.percentile) > 0.18;
        });
        if (relevantBig5.length < 2) {
            // Even if no Big 5 attribute is interesting, you get 1 adjective.
            relevantBig5 = [big5elements[0], big5elements[1]];
        }

        switch (relevantBig5.length) {
            case 2:
                // Report 1 adjective.
                adj = getCircumplexAdjective(relevantBig5[0], relevantBig5[1], 0);
                sentences.push(format(tphrase('%s'), adj) + '.');
                break;
            case 3:
                // Report 2 adjectives.
                adj1 = getCircumplexAdjective(relevantBig5[0], relevantBig5[1], 0);
                adj2 = getCircumplexAdjective(relevantBig5[1], relevantBig5[2], 1);
                sentences.push(format(tphrase('%s and %s'), adj1, adj2) + '.');
                break;
            case 4:
            case 5:
                // Report 3 adjectives.
                adj1 = getCircumplexAdjective(relevantBig5[0], relevantBig5[1], 0);
                adj2 = getCircumplexAdjective(relevantBig5[1], relevantBig5[2], 1);
                adj3 = getCircumplexAdjective(relevantBig5[2], relevantBig5[3], 2);
                sentences.push(format(tphrase('%s, %s and %s'), adj1, adj2, adj3) + '.');
                break;
        }

        return sentences;
    }

    function assembleFacets(personalityTree) {
        var sentences = [],
            facetElements = [],
            info,
            i;

        // Assemble the full list of facets and sort them based on how extreme
        // is the number.
        personalityTree.forEach(function (p) {
            p.children.forEach(function (f) {
                facetElements.push({
                    id: f.name,
                    percentile: f.percentile,
                    parent: p
                });
            });
        });
        facetElements.sort(compareByRelevance);

        // Assemble an adjective and description for the two most important facets.
        info = getFacetInfo(facetElements[0]);
        sentences.push(format(tphrase('You are %s'), info.term) + ': ' + info.description + '.');
        info = getFacetInfo(facetElements[1]);
        sentences.push(format(tphrase('You are %s'), info.term) + ': ' + info.description + '.');

        // If all the facets correspond to the same feature, continue until a
        // different parent feature is found.
        i = 2;
        if (facetElements[0].parent === facetElements[1].parent) {
            while (facetElements[0].parent === facetElements[i].parent) {
                i += 1;
            }
        }
        info = getFacetInfo(facetElements[i]);
        sentences.push(format(tphrase('And you are %s'), info.term) + ': ' + info.description + '.');

        return sentences;
    }

    /**
     * Assemble the list of values and sort them based on relevance.
     */
    function assembleValues(valuesTree) {
        var sentences = [],
            valuesList = [],
            sameQI,
            info1,
            info2,
            sentence,
            valuesInfo,
            i,
            term1,
            term2;

        valuesTree.forEach(function (p) {
            valuesList.push({
                id: p.name,
                percentile: p.percentile
            });
        });
        valuesList.sort(compareByRelevance);

        // Are the two most relevant in the same quartile interval? (e.g. 0%-25%)
        sameQI = intervalFor(valuesList[0].percentile) === intervalFor(valuesList[1].percentile);

        // Get all the text and data required.
        info1 = getInfoForValue(valuesList[0]);
        info2 = getInfoForValue(valuesList[1]);

        if (sameQI) {
            // Assemble the first 'both' sentence.
            term1 = info1.term;
            term2 = info2.term;
            switch (intervalFor(valuesList[0].percentile)) {
                case 0:
                    sentence = format(tphrase('You are relatively unconcerned with both %s and %s'), term1, term2) + '.';
                    break;
                case 1:
                    sentence = format(tphrase("You don't find either %s or %s to be particularly motivating for you"), term1, term2) + '.';
                    break;
                case 2:
                    sentence = format(tphrase('You value both %s and %s a bit'), term1, term2) + '.';
                    break;
                case 3:
                    sentence = format(tphrase('You consider both %s and %s to guide a large part of what you do'), term1, term2) + '.';
                    break;
            }
            sentences.push(sentence);

            // Assemble the final strings in the correct format.
            sentences.push(info1.description + '.');
            sentences.push(format(tphrase('And %s'), info2.description.toLowerCase()) + '.');
        } else {
            valuesInfo = [info1, info2];
            for (i = 0; i < valuesInfo.length; i += 1) {
                // Process it this way because the code is the same.
                switch (intervalFor(valuesList[i].percentile)) {
                    case 0:
                        sentence = format(tphrase('You are relatively unconcerned with %s'), valuesInfo[i].term);
                        break;
                    case 1:
                        sentence = format(tphrase("You don't find %s to be particularly motivating for you"), valuesInfo[i].term);
                        break;
                    case 2:
                        sentence = format(tphrase('You value %s a bit more'), valuesInfo[i].term);
                        break;
                    case 3:
                        sentence = format(tphrase('You consider %s to guide a large part of what you do'), valuesInfo[i].term);
                        break;
                }
                sentence = sentence.concat(': ').concat(valuesInfo[i].description.toLowerCase()).concat('.');
                sentences.push(sentence);
            }
        }

        return sentences;
    }

    /**
     * Assemble the list of needs and sort them based on value.
     */
    function assembleNeeds(needsTree) {
        var sentences = [],
            needsList = [],
            word,
            sentence;

        needsTree.forEach(function (p) {
            needsList.push({
                id: p.name,
                percentile: p.percentile
            });
        });
        needsList.sort(compareByValue);

        // Get the words required.
        word = getWordsForNeed(needsList[0])[0];

        // Form the right sentence for the single need.
        switch (intervalFor(needsList[0].percentile)) {
            case 0:
                sentence = tphrase('Experiences that make you feel high %s are generally unappealing to you');
                break;
            case 1:
                sentence = tphrase('Experiences that give a sense of %s hold some appeal to you');
                break;
            case 2:
                sentence = tphrase('You are motivated to seek out experiences that provide a strong feeling of %s');
                break;
            case 3:
                sentence = tphrase('Your choices are driven by a desire for %s');
                break;
        }
        sentence = format(sentence, word).concat(".");
        sentences.push(sentence);

        return sentences;
    }

    /**
     * Given a TraitTree returns a text
     * summary describing the result.
     *
     * @param tree A TraitTree.
     * @return An array of strings representing the
     *         paragraphs of the text summary.
     */
    function assemble(tree) {
        return [assembleTraits(tree.personality), assembleFacets(tree.personality), assembleNeeds(tree.needs), assembleValues(tree.values)];
    }

    /**
     * Given a TraitTree returns a text
     * summary describing the result.
     *
     * @param tree A TraitTree.
     * @return A String containing the text summary.
     */
    function getSummary(tree) {
        console.log("Tree :", tree);
        return assemble(tree).map(function (paragraph) {
            return paragraph.join(" ");
        }).join("\n");
    }

    /* Text-Summary API */
    self.assembleTraits = assembleTraits;
    self.assembleFacets = assembleFacets;
    self.assembleNeeds = assembleNeeds;
    self.assembleValues = assembleValues;
    self.assemble = assemble;
    self.getSummary = getSummary;

    return self;
};

export default TextSummary;
