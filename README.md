<h1 align="center"><img src="./icon/32x32.png" height="21px" alt=""> RapidJournalQualCheck </h1> 
<h3 align="center"> Rapid Quality Check for Academic Journals in Google Scholar Search Results </h3>
</br>
<p align="center">
    <a href="https://github.com/JuRaKlWi/RapidJournalQualCheck">
        <img alt="GitHub manifest version" src="https://img.shields.io/github/manifest-json/v/JuRaKlWi/RapidJournalQualCheck?color=%23EA4AAA&label=Github&logo=github&logoColor=%23EA4AAA">
    </a>
</p>

<b> This is a Firefox port of the Chrome extension by [Dr.Wichmann](https://de.linkedin.com/in/julianwichmann) to display SJR along with the H-Index and CCF score next to Google Scholar search results. </b>

For the original post see [here](https://de.linkedin.com/posts/julianwichmann_google-scholar-extension-activity-6967463018607611904-nsbm)

</p> Based on and adapted from CCFrank by WenyanLiu: https://github.com/WenyanLiu/CCFrank4dblp
</br> Using the public Crossref API: https://api.crossref.org/swagger-ui/index.html
</br> Using the public dblp API: https://dblp.org/
</br> Using Australian Business Deans Council (ABDC) list: https://abdc.edu.au/research/abdc-journal-quality-list/
</br> Using Academic Journal Guide (AJG) by the Chartered Association of Business Schools (C_ABS): https://charteredabs.org/academic-journal-guide-2021/
</br> Using Bibliometriske Forskningsindikator (BFI) of the Danish Ministry of Higher Education and Science ranking: ufm.dk
</br> Using Ranking of the Chinese Computer Foundation (CCF): https://www.ccf.org.cn/en/Bulletin/2019-05-13/663884.shtml
</br> Using CNRS ranking: https://www.gate.cnrs.fr/spip.php?rubrique31&lang=en
</br> Using Foundation National pour l’Enseignement de la Gestion des Enterprises (FNEGE) ranking: https://www.fnege.org/classement-des-revues-scientifiques-en-sciences-de-gestion/
</br> Using Financial Times (FT) research rank:
</br> Using High Council for Evaluation of Research & Higher Education (HCERES) ranking: https://www.hceres.fr/sites/default/files/media/downloads/2020-liste-hceres-domaine-shs1-economie-et-gestion_0.pdf
</br> Using SCImago Journal & Country Rank (retrieved July 20th, 2022): http://www.scimagojr.com
</br> Using CORE journal and conference ranking: http://portal.core.edu.au/jnl-ranks/
</br> Using Financial Time's FT50 ranking: https://www.ft.com/content/3405a512-5cbb-11e1-8f1f-00144feabdc0
</br> Icons from Flaticon.com: https://www.flaticon.com/free-icons/research

## Preview

Journal rankings are directly added to Google Search results.
<br />![SJR and VHB Scores](./img/SJR_VHB.PNG)

<br /><br />Currently includes a broad range of rankings. Please check the links above for more information on each ranking. The colors also indicate quality from green (higher quality) to red (lower quality).
![SJR and CCF Scores](./img/SJR_and_CCF.PNG)

<br /><br />Hovering with your cursor over the ranking scores gives you additional information such as the journals h-index and the name of the journal that was identified based on the input from Google Scholar.
![SJR and VHB Scores with mouseover info](./img/SJR_VHB_with%20mouseover.PNG)

<br /><br />Clicking on the ranking scores takes you to the identified work via its DOI. This along with the identified journal name helps you to check, whether indeed the correct journal was identified based on the Google Scholar input.
![Link to DOI](./img/doi_link.PNG)


## Install

<b> Coming soon </b> <br/>
<b> Workaround </b> <br/>
First ensure that the whole repository exists on your local machine.
You can temporarily install the addon under Firefox by visiting about:debugging#/runtime/this-firefox in your browser and clicking on "Load Temporary Add-on...".
![Temporary Addon](./img/temporary_install.png)

<br /><br />Next you have to navigate to the folder where you installed the repo to and select the "manifest.json" file.
![Adding Manifest](./img/add_manifest.png)

<br /><br />Finally, in the top right corner you can navigate to the addon settings and set the permissions for the google scholar sites you're using (e.g. https://scholar.google.ch).

![Add permissions](./img/manage_addon.png)

## What's New


## Contributors ✨

This package is based on the Chrome extension by Dr. Julian R. K. Wichmann and in turn on CCFrank by WenyanLiu: https://github.com/WenyanLiu/CCFrank4dblp
Thanks goes to them and their contributors: https://github.com/WenyanLiu/CCFrank4dblp#contributors-

</p> Using the public Crossref API: https://api.crossref.org/swagger-ui/index.html
</p> Using SCImago Journal & Country Rank (retrieved July 20th, 2022): http://www.scimagojr.com
</br> Using VHB-JOURQUAL3 ranking: https://vhbonline.org/en/vhb4you/vhb-jourqual/vhb-jourqual-3
</p> Using China Computer Federation (CCF) ranking: https://www.ccf.org.cn/en/Bulletin/2019-05-13/663884.shtml
</p> Icons from Flaticon.com: https://www.flaticon.com/free-icons/research

Contributions of any kind welcome!

## Reports
