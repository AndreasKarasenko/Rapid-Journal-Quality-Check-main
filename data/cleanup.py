# Test string
# test_string = """"   NA  NA  NA  NA  NA  NA  NA  NA  NA  NA   1  NA  NA  NA  NA  NA  NA  NA   \\n" +
# " GRH  NA  NA  NA  3  NA  B  NA  NA  NA  NA  NA  NA  NA  NA  NA  NA  NA  NA  '@GRH \\n" +
# " ASIANCONFERENCEONMACHINELEARNING  NA  NA  NA  NA  NA  NA  NA  NA  NA  C  NA  NA  NA  NA  NA  NA  NA  NA   Asian Conference on Machine Learning \\n" +
# " INFORMATIONRETRIEVALFACILITYCONFERENCE  NA  NA  NA  NA  NA  NA  NA  NA  NA  NA   1  NA  NA  NA  NA  NA  NA  NA   Information Retrieval Facility Conference \\n" +
# " INTERNATIONALCONFERENCEONADVANCEDCOMMUNICATIONSCOMPUTATION  NA  NA  NA  NA  NA  NA  NA  NA  NA  NA  NA  NA  NA  NA  NA  NA  NA  NA   International Conference on Advanced Communications and Computation \\n" +
# """
from typing import List

import pandas as pd

columns = [
    "NS",  # NamesShort
    "SJR_Q",
    "SJR_Hi",
    "VHB",
    "FNEGE",
    "CoNRS",
    "HCERES",
    "CORE",
    "source",
    "CORE_c",
    "CCF",
    "DAEN",
    "AJG",
    "JCR",
    "SNIP",
    "SJR",
    "CiteSc",
    "ABDC",
    "FT50",
    "VHB4",
    "NF",  # NamesFull
]


def read_names(file: str):
    """Read the base Names.txt file and return a DataFrame"""
    columns = [
        "NS",  # NamesShort
        "SJR_Q",
        "SJR_Hi",
        "VHB",
        "FNEGE",
        "CoNRS",
        "HCERES",
        "CORE",
        "source",
        "CORE_c",
        "CCF",
        "DAEN",
        "AJG",
        "JCR",
        "SNIP",
        "SJR",
        "CiteSc",
        "ABDC",
        "FT50",
        "NF",  # NamesFull
    ]
    file = open(file, "r", encoding="ISO-8859-1")
    file = file.readlines()
    for i in range(len(file)):
        # Remove leading whitespace, double quote, and tab
        file[i] = file[i].lstrip(' "\t')
        # Remove trailing whitespace, newline character, double quote, space, plus sign, and tab
        file[i] = file[i].rstrip(' \\n"+\n')
        file[i] = file[i].strip("'")
        # Split the string into items
        file[i] = file[i].split("\t")
    file[0].insert(0, "")
    df = pd.DataFrame(file, columns=columns)
    df = df.map(lambda x: x.strip() if isinstance(x, str) else x)
    return df


df = read_names("Names.txt")
df.to_csv("Names.csv", index=False)
df.replace("NA", "", inplace=True)

# if you want to read from saved file
# df = pd.read_csv("Names.csv", keep_default_na=False)
# df.replace("NA", "", inplace=True)

df.set_index("NS", inplace=True)
from utils.save_file import saveFile

# this produces files with size ~1.4MB
for i in range(df.shape[-1]):
    dd = df.iloc[:, i].to_dict()
    saveFile(dd, f"{columns[i+1]}")


# TODO currently trainling n at NAME level is cut off in the output file
### repeat for ISSNs
def read_issns(file: str):
    file = open(file, "r", encoding="ISO-8859-1")
    file = file.readlines()
    columns = [
        "ISSN",
        "SJR_Q",
        "SJR_H",
        "VHB",
        "FNEGE",
        "CoNRS",
        "HCERE",
        "CORE",
        "sourc",
        "DAEN",
        "AJG",
        "JCR",
        "SNIP",
        "SJR",
        "CiteS",
        "ABDC",
        "NF",
    ]
    for i in range(len(file)):
        # Remove leading whitespace, double quote, and tab
        file[i] = file[i].lstrip(' "\t')
        # Remove trailing whitespace, newline character, double quote, space, plus sign, and tab
        file[i] = file[i].rstrip(' \\n"+\n')
        file[i] = file[i].strip("'")
        # Split the string into items
        file[i] = file[i].split("\t")
    df = pd.DataFrame(file, columns=columns)
    df = df.map(lambda x: x.strip() if isinstance(x, str) else x)
    return df


columns = [
    "ISSN",
    "SJR_Q",
    "SJR_H",
    "VHB",
    "FNEGE",
    "CoNRS",
    "HCERE",
    "CORE",
    "sourc",
    "DAEN",
    "AJG",
    "JCR",
    "SNIP",
    "SJR",
    "CiteS",
    "ABDC",
    "VHB4",
    "NF",
]


df = read_issns("ISSNs.txt")
df.to_csv("ISSNs.csv", index=False)
df.replace("NA", "", inplace=True)

# TODO fix this so it saves to data/issns/ and gives it a proper name without collision.
df.set_index("ISSN", inplace=True)
for i in range(df.shape[-1]):
    dd = df.iloc[:, i].to_dict()
    saveFile(dd, f"issn{columns[i+1]}")
