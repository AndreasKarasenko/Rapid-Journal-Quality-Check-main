

document.getElementById('settings').addEventListener('click', function() {
  if (browser.runtime.openOptionsPage) {
    browser.runtime.openOptionsPage();
  } else {
    window.open(browser.runtime.getURL('popup.html'));
  }
});

document.getElementById('refresh').addEventListener('click', function() {
    browser.tabs.reload({bypassCache: true});
});

// Saves options to browser.storage --> local.set /.get vs. sync.set /.get!! TODO unsure if this is correct like this
function save_options() {
  var on_off = document.getElementById('on').checked;
  browser.storage.local.set({
    ext_on: on_off,
    SJR: document.getElementById('SJR').checked,
    VHB: document.getElementById('VHB').checked,
    VHB4: document.getElementById('VHB4').checked,
    FNEGE: document.getElementById('FNEGE').checked,
    CoNRS: document.getElementById('CoNRS').checked,
    HCERE: document.getElementById('HCERE').checked,
    CORE: document.getElementById('CORE').checked,
    CCF: document.getElementById('CCF').checked,
    DAEN: document.getElementById('DAEN').checked,
    AJG: document.getElementById('AJG').checked,
    ABDC: document.getElementById('ABDC').checked,
    FT50: document.getElementById('FT50').checked,
    turbo: document.getElementById('turbo').checked
  });
  if(on_off === false) {
        chrome.action.setBadgeText({text: 'OFF'}); 
    } else {
        chrome.action.setBadgeText({text: ''}); 
    }
} 
// TODO the two chrome actions above are part of the firefox mdn documentation 
// https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/browserAction/setBadgeText

// Restores select box and checkbox state using the preferences
// stored in browser.storage. TODO again unsure if correct
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  browser.storage.local.get({
    ext_on: true,
    SJR: document.getElementById('SJR').checked,
    VHB: document.getElementById('VHB').checked,
    VHB4: document.getElementById('VHB4').checked,
    FNEGE: document.getElementById('FNEGE').checked,
    CoNRS: document.getElementById('CoNRS').checked,
    HCERE: document.getElementById('HCERE').checked,
    CORE: document.getElementById('CORE').checked,
    CCF: document.getElementById('CCF').checked,
    DAEN: document.getElementById('DAEN').checked,
    AJG: document.getElementById('AJG').checked,
    ABDC: document.getElementById('ABDC').checked,
    FT50: document.getElementById('FT50').checked,
    turbo: document.getElementById('turbo').checked
  }, function(items) {
    document.getElementById('on').checked = items.ext_on;
    document.getElementById('SJR').checked = items.SJR;
    document.getElementById('VHB').checked = items.VHB;
    document.getElementById('VHB4').checked = items.VHB4;
    document.getElementById('FNEGE').checked = items.FNEGE;
    document.getElementById('CoNRS').checked = items.CoNRS;
    document.getElementById('HCERE').checked = items.HCERE;
    document.getElementById('CORE').checked = items.CORE;
    document.getElementById('CCF').checked = items.CCF;
    document.getElementById('DAEN').checked = items.DAEN;
    document.getElementById('AJG').checked = items.AJG;
    document.getElementById('ABDC').checked = items.ABDC;
    document.getElementById('FT50').checked = items.FT50;
    document.getElementById('turbo').checked = items.turbo;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('on').addEventListener('click', save_options);
document.getElementById('SJR').addEventListener('click', save_options);
document.getElementById('VHB').addEventListener('click', save_options);
document.getElementById('VHB4').addEventListener('click', save_options);
document.getElementById('FNEGE').addEventListener('click', save_options);
document.getElementById('CoNRS').addEventListener('click', save_options);
document.getElementById('HCERE').addEventListener('click', save_options);
document.getElementById('CORE').addEventListener('click', save_options);
document.getElementById('CCF').addEventListener('click', save_options);
document.getElementById('DAEN').addEventListener('click', save_options);
document.getElementById('AJG').addEventListener('click', save_options);
document.getElementById('ABDC').addEventListener('click', save_options);
document.getElementById('FT50').addEventListener('click', save_options);
document.getElementById('turbo').addEventListener('click', save_options);


/* ############# */
function loadSettings() {
    return new Promise(function(resolve, reject) {
        browser.storage.local.get(function(items) {
            resolve(items);
         })
    });
};

let settings = {};
function getSettings() {
    loadSettings().then(function(items) {

        settings.SJR = items.SJR;
        settings.VHB = items.VHB;
        settings.VHB4 = items.VHB4;
        settings.FNEGE = items.FNEGE;
        settings.CoNRS = items.CoNRS;
        settings.HCERE = items.HCERE;
        settings.CORE = items.CORE;
        settings.CCF = items.CCF;
        settings.DAEN = items.DAEN;
        settings.AJG = items.AJG;
        settings.ABDC = items.ABDC;
        settings.FT50 = items.FT50;
        settings.turbo = items.turbo;
        settings.ext_on = items.ext_on;
        
        joursearch_func(settings) 
    });
}


function toUnicodeVariant(str, variant, flags) {
    const offsets = {
        m: [0x1d670, 0x1d7f6],
        b: [0x1d400, 0x1d7ce],
        i: [0x1d434, 0x00030],
        bi: [0x1d468, 0x00030],
        c: [0x1d49c, 0x00030],
        bc: [0x1d4d0, 0x00030],
        g: [0x1d504, 0x00030],
        d: [0x1d538, 0x1d7d8],
        bg: [0x1d56c, 0x00030],
        s: [0x1d5a0, 0x1d7e2],
        bs: [0x1d5d4, 0x1d7ec],
        is: [0x1d608, 0x00030],
        bis: [0x1d63c, 0x00030],
        o: [0x24B6, 0x2460],
        p: [0x249C, 0x2474],
        w: [0xff21, 0xff10],
        u: [0x2090, 0xff10]
    }

    const variantOffsets = {
        'monospace': 'm',
        'bold': 'b',
        'italic': 'i',
        'bold italic': 'bi',
        'script': 'c',
        'bold script': 'bc',
        'gothic': 'g',
        'gothic bold': 'bg',
        'doublestruck': 'd',
        'sans': 's',
        'bold sans': 'bs',
        'italic sans': 'is',
        'bold italic sans': 'bis',
        'parenthesis': 'p',
        'circled': 'o',
        'fullwidth': 'w'
    }

    // special characters (absolute values)
    var special = {
        m: {
            ' ': 0x2000,
            '-': 0x2013
        },
        i: {
            'h': 0x210e
        },
        g: {
            'C': 0x212d,
            'H': 0x210c,
            'I': 0x2111,
            'R': 0x211c,
            'Z': 0x2128
        },
        o: {
            '0': 0x24EA,
            '1': 0x2460,
            '2': 0x2461,
            '3': 0x2462,
            '4': 0x2463,
            '5': 0x2464,
            '6': 0x2465,
            '7': 0x2466,
            '8': 0x2467,
            '9': 0x2468,
        },
        p: {},
        w: {}
    }
    //support for parenthesized latin letters small cases 
    for (var i = 97; i <= 122; i++) {
        special.p[String.fromCharCode(i)] = 0x249C + (i - 97)
    }
    //support for full width latin letters small cases 
    for (var i = 97; i <= 122; i++) {
        special.w[String.fromCharCode(i)] = 0xff41 + (i - 97)
    }

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';

    var getType = function (variant) {
        if (variantOffsets[variant]) return variantOffsets[variant]
        if (offsets[variant]) return variant;
        return 'm'; //monospace as default
    }
    var getFlag = function (flag, flags) {
        if (!flags) return false
        return flags.split(',').indexOf(flag) > -1
    }

    var type = getType(variant);
    var underline = getFlag('underline', flags);
    var strike = getFlag('strike', flags);
    var result = '';

    for (var k of str) {
        let index
        let c = k
        if (special[type] && special[type][c]) c = String.fromCodePoint(special[type][c])
        if (type && (index = chars.indexOf(c)) > -1) {
            result += String.fromCodePoint(index + offsets[type][0])
        } else if (type && (index = numbers.indexOf(c)) > -1) {
            result += String.fromCodePoint(index + offsets[type][1])
        } else {
            result += c
        }
        if (underline) result += '\u0332' // add combining underline
        if (strike) result += '\u0336' // add combining strike
    }
    return result
}



function joursearch_func(settings) {
//function joursearch_func() {
    
    input = document.getElementById("journal_query").value;
    let url;
    
    url = input;
        
    url = url.toUpperCase();
    url = url.replace(/&AMP;/g, "&");
    url = url.replace(/ AND /g, "");
    url = url.replace(/^THE /g, "");
    url = url.replace(/, THE$/g, "");
    url = url.normalize('NFD');
    url = url.replace(/[^A-Z0-9]/ig, "");
    
    // let position_start = FullRank_Names.indexOf("X_X" + url + "\1/");
    let position_start = SJR_Q[url];
     
    let span_popup = getRankSpan(url, "full_cap", "", "", "", "", "", "", settings)
    //let span_popup = getRankSpan(url, "full_cap", "", "", "", "", "", "")
    
    names = []; 
    names.push("SJR");
    names.push("VHB");    
    names.push("FNEGE");    
    names.push("CoNRS");        
    names.push("HCERE");    
    names.push("CORE_Jour");    
    names.push("CORE_Conf");    
    names.push("CCF");    
    names.push("DAEN");    
    names.push("AJG");    
    names.push("ABDC");    
    names.push("FT50");    
    names.push("VHB4");


    // create a div element to display the results
    let resultDiv = document.createElement("div");

    if(input.length == 0) {
        alert("Please enter a journal name.");
    } else if (position_start !== undefined) {
       
    const res_list = {};
    names.forEach((element, index) => {
      res_list[element] = span_popup[index];
    });

    Object.keys(res_list).forEach(key => {
      if (res_list[key]=="NA") delete res_list[key];
    });
    
    let red_list = res_list;
    
    let i = 0;
    let text2 = "";
    while (i < 14 && Object.keys(red_list)[i] !== undefined ) {
        text2 += Object.keys(red_list)[i] + ": " + toUnicodeVariant( Object.values(red_list)[i], 'bold') + ";       "  
        i++;
    } 
   
/*    let text2_smile = text2; 
    text2_smile = text2_smile.replace(/Q1/g, "Q1 \u231A") 
*/    
   
    // add some text to the div element
    //resultDiv.innerText = "Journal found! Here are the results: " + text2;


    alert( toUnicodeVariant(input, 'bold italic') + ": \n" + text2);
    
    } else {
        alert("Journal not found, please check the spelling.");    
    }

    // add the div element to the page
    // document.body.appendChild(resultDiv);

}

document.getElementById("joursearch_form").addEventListener('submit', getSettings);
// document.getElementById("joursearch_form").addEventListener('submit', joursearch_func);



/* ##### lookup ###### */
const ccf = {};

function loadCCF(ratingName, url) {
    return browser.runtime.sendMessage({message: `get${ratingName}`, url: url});
}

getRankInfo = function (refine, type, ISSN1, ISSN2, dblp_venue) {
    let rankInfo = {};
    rankInfo.ranks = [];
    rankInfo.AllRanks = {};
    rankInfo.rank_CORE = "";
    rankInfo.refine_CORE = "";
    rankInfo.only_CORE = 0;
    rankInfo.info = "";
    rankInfo.info2 = "";
    rankInfo.txt = "";
    let rank;
    let hindex;
    let rank_txt;

    refine = refine.replace(/&amp;/g, "&");

    url = refine;
    url = url.toUpperCase();
    url = url.replace(/&AMP;/g, "&");
    url = url.replace(/ AND /g, "");
    url = url.replace(/^THE /g, "");
    url = url.replace(/, THE$/g, "");
    url = url.normalize('NFD');
    url = url.replace(/[^A-Z0-9]/ig, "");

    // position_start = FullRank_Names.indexOf("X_X" + url + "\1/");

    loadCCF("VHB", url).then(response => {
        if (response !== undefined) {
            let sjrq2 = response || "NA";
            rankInfo.AllRanks.VHB = sjrq2;
            rankInfo.ranks.push(sjrq2);

            loadCCF("VHB4", url).then(response => {
                let sjrq2 = response || "NA";
                rankInfo.AllRanks.VHB4 = sjrq2;
                rankInfo.ranks.push(sjrq2);
            });

            loadCCF("SJRQ2", url).then(response => {
                let sjrq2 = response || "NA";
                rankInfo.AllRanks.SJR_Q2 = sjrq2;
                rankInfo.ranks.push(sjrq2);
            });

            loadCCF("SJRH", url).then(response => {
                let sjrq2 = response || "NA";
                rankInfo.AllRanks.SJR_H = sjrq2;
                rankInfo.ranks.push(sjrq2);
            });

            loadCCF("FNEGE", url).then(response => {
                let sjrq2 = response || "NA";
                rankInfo.AllRanks.FNEGE = sjrq2;
                rankInfo.ranks.push(sjrq2);
            });

            loadCCF("CoNRS", url).then(response => {
                let sjrq2 = response || "NA";
                rankInfo.AllRanks.CoNRS = sjrq2;
                rankInfo.ranks.push(sjrq2);
            });

            loadCCF("HCERES", url).then(response => {
                let sjrq2 = response || "NA";
                rankInfo.AllRanks.HCERE = sjrq2;
                rankInfo.ranks.push(sjrq2);
            });

            loadCCF("CORE", url).then(response => {
                let sjrq2 = response || "NA";
                rankInfo.AllRanks.CORE = sjrq2;
                rankInfo.ranks.push(sjrq2);
            });

            loadCCF("CORE_source", url).then(response => {
                let sjrq2 = response || "NA";
                rankInfo.AllRanks.CORE_source = sjrq2;
                rankInfo.ranks.push(sjrq2);
            });

            loadCCF("CORE_c", url).then(response => {
                let sjrq2 = response || "NA";
                rankInfo.AllRanks.CORE_Conf = sjrq2;
                rankInfo.ranks.push(sjrq2);
            });

            loadCCF("CCF", url).then(response => {
                let sjrq2 = response || "NA";
                rankInfo.AllRanks.CCF = sjrq2;
                rankInfo.ranks.push(sjrq2);
            });

            loadCCF("DAEN", url).then(response => {
                let sjrq2 = response || "NA"; // maybe hard-cast to NA TODO
                rankInfo.AllRanks.DAEN = sjrq2;
                rankInfo.ranks.push(sjrq2);
            });

            loadCCF("AJG", url).then(response => {
                let sjrq2 = response || "NA";
                rankInfo.AllRanks.AJG = sjrq2;
                rankInfo.ranks.push(sjrq2);
            });

            loadCCF("JCR", url).then(response => {
                let sjrq2 = response || "NA";
                rankInfo.AllRanks.JCR = sjrq2;
                rankInfo.ranks.push(sjrq2);
            });

            loadCCF("SNIP", url).then(response => {
                let sjrq2 = response || "NA";
                rankInfo.AllRanks.SNIP = sjrq2;
                rankInfo.ranks.push(sjrq2);
            });

            loadCCF("SJR", url).then(response => {
                let sjrq2 = response || "NA";
                rankInfo.AllRanks.SJR = sjrq2;
                rankInfo.ranks.push(sjrq2);
            });

            loadCCF("CiteSc", url).then(response => {
                let sjrq2 = response || "NA";
                rankInfo.AllRanks.CiteScore = sjrq2;
                rankInfo.ranks.push(sjrq2);
            });

            loadCCF("ABDC", url).then(response => {
                let sjrq2 = response || "NA";
                rankInfo.AllRanks.ABDC = sjrq2;
                rankInfo.ranks.push(sjrq2);
            });

            loadCCF("FT50", url).then(response => {
                let sjrq2 = response || "NA";
                rankInfo.AllRanks.FT50 = sjrq2;
                rankInfo.ranks.push(sjrq2);
            });

        } else {

            rank_txt = "NA";
            rankInfo.info = "No ranking found for '" + refine + "'";
            rankInfo.info2 = "";
        }

    });
    // let position_start = SJR_Q[url];
        
    //         if (position_start !== undefined) {
        
    //             sjrq2 = position_start || "NA"; // if the rating is an empty string, we replace it with NA
    //             rankInfo.AllRanks.SJR_Q2 = sjrq2;
    //             rankInfo.ranks.push(sjrq2);

    //             sjrq2 = ccf.SJR_Hi[url] || "NA";
    //             rankInfo.AllRanks.SJR_H = sjrq2;
    //             rankInfo.ranks.push(sjrq2);

    //             sjrq2 = ccf.VHB[url] || "NA";
    //             rankInfo.AllRanks.VHB = sjrq2;
    //             rankInfo.ranks.push(sjrq2);

    //             sjrq2 = ccf.VHB4[url] || "NA";
    //             rankInfo.AllRanks.VHB4 = sjrq2;
    //             rankInfo.ranks.push(sjrq2);

    //             sjrq2 = ccf.FNEGE[url] || "NA";
    //             rankInfo.AllRanks.FNEGE = sjrq2;
    //             rankInfo.ranks.push(sjrq2);

    //             sjrq2 = ccf.CoNRS[url] || "NA";
    //             rankInfo.AllRanks.CoNRS = sjrq2;
    //             rankInfo.ranks.push(sjrq2);

    //             sjrq2 = ccf.HCERES[url] || "NA";
    //             rankInfo.AllRanks.HCERE = sjrq2;
    //             rankInfo.ranks.push(sjrq2);

    //             sjrq2 = ccf.CORE[url] || "NA";
    //             rankInfo.AllRanks.CORE = sjrq2;
    //             rankInfo.ranks.push(sjrq2);

    //             sjrq2 = ccf.source[url] || "NA";
    //             rankInfo.AllRanks.CORE_source = sjrq2;
    //             rankInfo.ranks.push(sjrq2);

    //             sjrq2 = ccf.CORE_c[url] || "NA";
    //             rankInfo.AllRanks.CORE_Conf = sjrq2;
    //             rankInfo.ranks.push(sjrq2);

    //             sjrq2 = ccf.CCF[url] || "NA";
    //             rankInfo.AllRanks.CCF = sjrq2;
    //             rankInfo.ranks.push(sjrq2);

    //             sjrq2 = "NA";
    //             rankInfo.AllRanks.DAEN = sjrq2;
    //             rankInfo.ranks.push(sjrq2);

    //             sjrq2 = ccf.AJG[url] || "NA";
    //             rankInfo.AllRanks.AJG = sjrq2;
    //             rankInfo.ranks.push(sjrq2);

    //             sjrq2 = ccf.JCR[url] || "NA";
    //             rankInfo.AllRanks.JCR = sjrq2;
    //             rankInfo.ranks.push(sjrq2);

    //             sjrq2 = ccf.SNIP[url] || "NA";
    //             rankInfo.AllRanks.SNIP = sjrq2;
    //             rankInfo.ranks.push(sjrq2);

    //             sjrq2 = ccf.SJR[url] || "NA";
    //             rankInfo.AllRanks.SJR = sjrq2;
    //             rankInfo.ranks.push(sjrq2);

    //             sjrq2 = ccf.CiteSc[url] || "NA";
    //             rankInfo.AllRanks.CiteScore = sjrq2;
    //             rankInfo.ranks.push(sjrq2);

    //             sjrq2 = ccf.ABDC[url] || "NA";
    //             rankInfo.AllRanks.ABDC = sjrq2;
    //             rankInfo.ranks.push(sjrq2);

    //             sjrq2 = ccf.FT50[url] || "NA";
    //             rankInfo.AllRanks.FT50 = sjrq2;
    //             rankInfo.ranks.push(sjrq2);

    
    //         } else {

    //             rank_txt = "NA";
    //             rankInfo.info = "No ranking found for '" + refine + "'";
    //             rankInfo.info2 = "";
    //         }     
  
    if (refine == "" && ISSN1 == "" && (rankInfo.rank_CORE == "NA"  || rankInfo.rank_CORE == undefined) ) {
        rank_txt = "NA";
        rankInfo.info = "No journal identifiable";
        rankInfo.info2 = "";
    }
    
    if (refine == "" && ISSN1 == "" && rankInfo.rank_CORE != "NA"  && rankInfo.rank_CORE != undefined) {
        rank_txt = rankInfo.rank_CORE;
        rankInfo.info = refine;
        rankInfo.info += "; H-Index: NA";
        rankInfo.info2 = "";
    }
            
    if ( Object.keys(rankInfo.AllRanks).length !== 0 && rankInfo.AllRanks.constructor === Object ) { 
      if(rankInfo.AllRanks.SJR_H !== undefined) {
        hindex = rankInfo.AllRanks.SJR_H;
        rankInfo.info = refine;
        rankInfo.info += "; H-Index: " + hindex;
      } else {
        rankInfo.info = refine;
        rankInfo.info += "; H-Index: NA";
      }    
    }
    
    return rankInfo;
};


getRankClass = function (ranks) {
    quarts = ["Q1", "Q2", "Q3", "Q4", "A", "B", "C", "D", "I", "II", "III"]
    if(ranks == "A+") {
        return "ccf-Aplus";
    } else if (ranks == "A/B") {
        return "ccf-b";
    } else if (ranks == "B/C") {
        return "ccf-c"; 
    } else if (ranks == "C/D") {
        return "ccf-d";    
    } else {
        for (let rank of quarts) {
            for (let r of ranks) {
                if (r == rank) {
                    return "ccf-" + rank.toLowerCase();
                }
            }
        }
    }        
    return "ccf-none"; 
};



function loadSettings() {
    return new Promise(function(resolve, reject) {
        browser.storage.local.get(function(items) {
            resolve(items);
         })
    });
};


getRankSpan = function (refine, type, doi, elid, ISSN1, ISSN2, dblp_venue, dblp_doi, settings) {
   
    let allNA = 1;
 
    let rankInfo = getRankInfo(refine, type, ISSN1, ISSN2, dblp_venue);
 
    let rank = [];
    rank.push(rankInfo.AllRanks.SJR_Q2);
    rank.push(rankInfo.AllRanks.VHB);
    rank.push(rankInfo.AllRanks.VHB4)
    rank.push(rankInfo.AllRanks.FNEGE);
    rank.push(rankInfo.AllRanks.CoNRS);
    rank.push(rankInfo.AllRanks.HCERE);
    rank.push(rankInfo.AllRanks.CORE);
    rank.push(rankInfo.AllRanks.CORE_Conf);
    rank.push(rankInfo.AllRanks.CCF);
    rank.push(rankInfo.AllRanks.DAEN);
    rank.push(rankInfo.AllRanks.AJG);
    rank.push(rankInfo.AllRanks.ABDC);
    rank.push(rankInfo.AllRanks.FT50);
    return(rank);      
};    
