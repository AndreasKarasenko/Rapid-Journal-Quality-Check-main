# Why even change anything?
Since Firefox is my main browser I wanted to use the plugin where I already configured all other aspects (UBlock, Tridactyl, ...). However, as stated in the REAMDE firefox is a bit tricky when it comes file sizes. The prior implementation relied on large JS files that contained journal names (or ISSNs), and an entry for each Rating (NA if not rated) as a large string. The lookup was then a string operation that relied on the indexes of specific markers, which resulted in data files larger than 4MB. Additionally it made adding new ratings (such as VHB4) a bit more tricky. You could simply use the ```.indexof``` string-lookup but I figured I could make it more modular.

The obvious solution was to break this file into several smaller files, that only contain information relevant to the current lookup. In other words, each rating has 1 data file, if I want to know a certain rating of a journal I look into the corresponding data file.



# how to change the lookup and rank construction
Individual dicts per ranking (see [cleanup.py](./data/cleanup.py) for an example function):
~~~json
let ccf.VHB = {
    "JOR": "A",
    "JORCS": "C",
    ...
}
~~~

lookup is O(1) and i can have ALL information I want or need in the relevant nested dict.

These columns are the files I need in theory:

| Names                                 | SJR_Q | SJR_Hi | VHB | FNEGE | CoNRS | HCERES | CORE | source | CORE_c | CCF | DAEN | AJG | JCR | SNIP | SJR | CiteSc | ABDC | FT50 |
|---------------------------------------|-------|--------|-----|-------|-------|--------|------|--------|--------|-----|------|-----|-----|------|-----|--------|------|------|
| X_XJOURNALOFRETAILINGCONSUMERSERVICES | Q1    | 104    | C   | 3     | 3     | B      | NA   | NA     | NA     | NA  | 1    | 2   | NA  | 14   | 24  | 12     | A    | NA   |

A new rating would simply be a new column with NA for anything that is not rated by the partial list.

With the second option the advantage is that i can put them into [data/names/](./data/names/), [data/issns/](./data/issns/) and access them individually.
This also necessitates to add the data to the content to the [manifest.json](manifest.json) in the ```content_scripts``` under js.

To add more rankings: changes must be made to ccf.js, scholar_turbo.js, popup.js, manifest.json, background.js, and obviously all data files. For the data files we only need to add a single instance for the new ranking for ISSNs and Names.

Compared to the prior version I simply changed vhb to vhb3 since it is now superseded by vhb4, but we don't have a summarizing list yet.

In the ccf.js file:
~~~js
// e.g. this
let span2 = $("<span>");
rank = rankInfo.AllRanks.VHB;
if (rank != "NA" && rank != undefined) {
    allNA = allNA + 1;
    span2
        .addClass("ccf-rank")
        .addClass("VHB3_" + rank.replace(/[+*/]/g, "plus").toLowerCase() )
        .text(rank); 
}
// and add a new one
let span3 = $("<span>");
rank = rankInfo.AllRanks.VHB4;
if (rank != "NA" && rank != undefined) {
    allNA = allNA + 1;
    span2
        .addClass("ccf-rank")
        .addClass("VHB4_" + rank.replace(/[+*/]/g, "plus").toLowerCase() )
        .text(rank); 
}
...
// then search for something like this
if(settings.VHB === true) { 
    span123.append(span2); 
    popup_text += "VHB3: " + rankInfo.AllRanks.VHB + "   ";
    Ranks_chosen.push(rankInfo.AllRanks.VHB); 
  } else { 
    span456.append(span2); 
    popup_text_add += "VHB3: " + rankInfo.AllRanks.VHB + "   ";
    Ranks_additional.push(rankInfo.AllRanks.VHB); 
  }
if(settings.VHB4 === true) { 
    span123.append(span3); 
    popup_text += "VHB4: " + rankInfo.AllRanks.VHB4 + "   ";
    Ranks_chosen.push(rankInfo.AllRanks.VHB4); 
  } else { 
    span456.append(span3); 
    popup_text_add += "VHB4: " + rankInfo.AllRanks.VHB4 + "   ";
    Ranks_additional.push(rankInfo.AllRanks.VHB4); 
  }
~~~

The "VHB3_" + rank... refers to the style in [style.css](./css/style.css). Here we have to add the respective styles for the possible values.

e.g.
~~~css
/* VHB4 */
.VHB4_a {
    background-color:  var(--a-color);
}

.VHB4_aplus {
    background-color:  var(--aplus-color);
}

.VHB4_b {
    background-color:  var(--b-color);
}

.VHB4_c {
    background-color:  var(--c-color);
}

.VHB4_d {
    background-color:  var(--d-color);
}

.VHB4_aplusb {
    background-color:  var(--aplus-color);
}

.VHB4_bplusc {
    background-color:  var(--b-color);
}

.VHB4_cplusd {
    background-color:  var(--c-color);
}
~~~
The biggest change from the prior version is how we look up ratings. Since we have an object we can simply call it like this ```obj[key]``` where key is the name or ISSN. People familiar with Python know this as a dict lookup, similarly the time complexity is O(1).

~~~js
// new
let position_start = ccf.issnSJR_Q[issn]; // checks if there is an entry for the ISSN

sjrq2 = ccf.SJR_Hi[url] || "NA"; // returns the rating or "NA" if the rating is an empty string
rankInfo.AllRanks.SJR_H = sjrq2;
rankInfo.ranks.push(sjrq2);

// old
let position_start = ccf.FullRank_ISSNs.indexOf("X_X" + issn + "\1/"); // gets the starting position

let sjrq2_pos_s = ccf.FullRank_Names.indexOf("\1/", position_start); // gets the start of the rating string
let sjrq2_pos_e = ccf.FullRank_Names.indexOf("\2/", position_start); // gets the end of the rating string
let sjrq2 = ccf.FullRank_Names.substring( (sjrq2_pos_s + 2), sjrq2_pos_e); // retrieves the rating
rank = sjrq2;  
rankInfo.AllRanks.SJR_Q2 = rank;
rankInfo.ranks.push(rank);
~~~
There are a few more things that had to be changed like checking position_start for undefined instead of -1. But you can peak into the git diffs for these things ;).

## Adding VHB4
In april of 2024 the "Verband der Hochschullehrerinnen und Hochschullehrer für Betriebswirtschaft" (VHB) published their new journal rating (more info [here](https://www.vhbonline.org/service/vhb-rating-2024)). Unfortunately as of writing these notes (24.04.24) there is no summary list of ratings and only partial ratings ("Teilratings"). Some of these ratings differ between partials, therefore I chose to only add MARK and NAMA. For these 2 I made sure, that no conflicts exist and expanded the list where necessary.

The [extract_vhb](./data/extract_vhb.py) script uses tabula-py to extract the tabular information of the ratings from the pdfs and add them to the relevant data files. Other PDFs have different structures (double rows, indents, and more columns) which does not allow the script to be transferable. Ideally VHB would publish a CSV with the data.

First use cleanup to construct the base csv files. Then use extract_vhb to modify them with the new ratings. Then use the saveFile function to rebuild the data files and add them to the respective folders.
