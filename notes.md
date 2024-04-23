to add more journals simply add them in styles.css and in ccf.js for now

I simply changed vhb to vhb3 since it is now superseded by vhb4.
vhb4 can be added to the styles.


# how to change the lookup and addition maybe
redesign as nested dicts:
~~~json
let journals = {
    "JOR": {
        "var1": 1,
        "var2": 2,
        ...
    }
}
~~~
Or individual dicts per ranking:
~~~json
let ccf.VHB = {
    "JOR": "A",
    "JORCS": "C",
    ...
}
~~~

lookup is O(1) and i can have ALL information I want or need in the relevant nested dict.

These are the files I need in theory:
Names\1/ SJR_Q\2/ SJR_Hi\3/ VHB\4/ FNEGE\5/ CoNRS\6/ HCERES\7/ CORE\8/ source\9/ CORE_c\10/ CCF\11/ DAEN\12/ AJG\13/ JCR\14/ SNIP\15/ SJR\16/ CiteSc\17/ ABDC\18/ FT50\19/

X_XJOURNALOFRETAILINGCONSUMERSERVICES\1/Q1\2/104\3/C\4/3\5/3\6/B\7/NA\8/NA\9/NA\10/NA\11/1\12/2\13/NA\14/14\15/24\16/12\17/A\18/NA\19

| Names                                 | SJR_Q | SJR_Hi | VHB | FNEGE | CoNRS | HCERES | CORE | source | CORE_c | CCF | DAEN | AJG | JCR | SNIP | SJR | CiteSc | ABDC | FT50 |
|---------------------------------------|-------|--------|-----|-------|-------|--------|------|--------|--------|-----|------|-----|-----|------|-----|--------|------|------|
| X_XJOURNALOFRETAILINGCONSUMERSERVICES | Q1    | 104    | C   | 3     | 3     | B      | NA   | NA     | NA     | NA  | 1    | 2   | NA  | 14   | 24  | 12     | A    | NA   |

With the second option the advantage is that i can put them into [data/VHB](./data/)