# ensure you have tabula-py installed (see also the requirements.txt)
from re import A

from utils.read_vhb_ranks import read_vhb

dfs = read_vhb("raw/VHB4_MARK.pdf")
# A sample of the data:

#                            Title       ISSN Rating  Votes ≥ rating [%]                        Publisher  Link
# 0                         Nature  1476-4687     A+                  91  London: Nature Publishing Group  Link
# 1                        Science  1095-9203     A+                  90      Washington D.C.: of Science  Link
# 2  Academy of Management Journal  1948-0989     A+                  85            Academy of Management  Link
# 3           Journal of Marketing  1547-7185     A+                  84                             SAGE  Link
# 4   Journal of Consumer Research  1537-5277     A+                  83          Oxford University Press  Link

# first we should fix the ISSN column so it fits our data format. We also don't care about the publisher, the link, or the votes.

dfs = dfs.loc[:, ["Title", "ISSN", "Rating"]]

dfs["ISSN"] = dfs["ISSN"].str.replace("-", "", regex=False)  # much better
dfs = dfs.rename(columns={"Title": "NF", "Rating": "VHB4"})

#                            Title      ISSN Rating
# 0                         Nature  14764687     A+
# 1                        Science  10959203     A+
# 2  Academy of Management Journal  19480989     A+
# 3           Journal of Marketing  15477185     A+
# 4   Journal of Consumer Research  15375277     A+

# we can now add the NAMA partial ratings to the data

dfnama = pd.read_excel("dfnama.xlsx")  # handcrafted from vhb4
dfnama["ISSN"] = dfnama["ISSN"].str.replace("-", "", regex=False)
dfnama.rename(columns={"Title": "NF", "Rating": "NAMA"}, inplace=True)
dfnama = dfnama.loc[:, ["NF", "ISSN", "NAMA"]]

test = pd.merge(dfs, dfnama, how="outer", on="NF")  # full join of the dataframe
test = test.iloc[:, [0, 2, 4]]  # only NF, VHB4, NAMA
print(
    test[test["VHB4"] != test["NAMA"]].dropna()
)  # check if there are any differences between the two ratings
### >>> no differences! <<<
# merge with NA replace to add whatever was missing from the NAMA list
test = pd.merge(dfs, dfnama, how="outer", on="NF")  # full join of the dataframe
test.VHB4.fillna(test.NAMA, inplace=True)  # if VHB4 is missing, fill with NAMA
test["ISSN_x"].fillna(
    test["ISSN_y"], inplace=True
)  # if ISSN is missing, fill with NAMA

# now we need to add them to our Names.csv and ISSNs.csv files
# we can do this by reading the files, appending the new data, and writing them back
import pandas as pd

names = pd.read_csv("data/Names.csv", keep_default_na=False)


merged_names = pd.merge(names, test.loc[:, ["NF", "VHB4"]], how="left", on="NF")
# swap last two columns
merged_names["NF"], merged_names["VHB4"] = (
    merged_names["VHB4"],
    merged_names["NF"],
)  # column names wrong TODO

merged_names.rename(columns={"VHB4": "NF", "NF": "VHB4"}, inplace=True)
merged_names.VHB4.fillna("NA", inplace=True)  # fill missing values with NA

merged_names.to_csv("data/Names.csv", index=False)

# repeat for ISSNs
test.rename(columns={"ISSN_x": "ISSN"}, inplace=True)
issns = pd.read_csv("data/ISSNs.csv", keep_default_na=False)

merged_issns = pd.merge(issns, test.loc[:, ["ISSN", "VHB4"]], how="left", on="ISSN")
# swap last two columns
merged_issns["NF"], merged_issns["VHB4"] = (
    merged_issns["VHB4"],
    merged_issns["NF"],
)  # column names wrong TODO

merged_issns.rename(columns={"VHB4": "NF", "NF": "VHB4"}, inplace=True)
merged_issns.VHB4.fillna("NA", inplace=True)  # fill missing values with NA

merged_issns.to_csv("data/ISSNs.csv", index=False)

# names has the preprocessed names (uppercase, no special characters, etc.) all ratings so far, and the full names
# we only have the full names to match to our old list
# so we need to match our dfs["Title"] to names["Full Name"] and add the rating of dfs.Rating to names["VHB4"]
