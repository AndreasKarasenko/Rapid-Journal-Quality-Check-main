# Test string
# test_string = """"   NA  NA  NA  NA  NA  NA  NA  NA  NA  NA   1  NA  NA  NA  NA  NA  NA  NA   \\n" + 
# " GRH  NA  NA  NA  3  NA  B  NA  NA  NA  NA  NA  NA  NA  NA  NA  NA  NA  NA  '@GRH \\n" + 
# " ASIANCONFERENCEONMACHINELEARNING  NA  NA  NA  NA  NA  NA  NA  NA  NA  C  NA  NA  NA  NA  NA  NA  NA  NA   Asian Conference on Machine Learning \\n" + 
# " INFORMATIONRETRIEVALFACILITYCONFERENCE  NA  NA  NA  NA  NA  NA  NA  NA  NA  NA   1  NA  NA  NA  NA  NA  NA  NA   Information Retrieval Facility Conference \\n" + 
# " INTERNATIONALCONFERENCEONADVANCEDCOMMUNICATIONSCOMPUTATION  NA  NA  NA  NA  NA  NA  NA  NA  NA  NA  NA  NA  NA  NA  NA  NA  NA  NA   International Conference on Advanced Communications and Computation \\n" + 
# """
import pandas as pd

file = open("Names.txt", "r", encoding="ISO-8859-1")
test = file.readlines()
# Split the string into lines
for i in range(len(test)):
    # Remove leading whitespace, double quote, and tab
    test[i] = test[i].lstrip(' "\t')
    # Remove trailing whitespace, newline character, double quote, space, plus sign, and tab
    test[i] = test[i].rstrip(' \\n"+\n')
    test[i] = test[i].strip("'")
    # Split the string into items
    test[i] = test[i].split('\t')

test[0].insert(0, '')
columns = ["NamesShort", "SJR_Q", "SJR_Hi", "VHB", "FNEGE", "CoNRS", "HCERES", "CORE", "source", "CORE_c", "CCF", "DAEN", "AJG", "JCR", "SNIP", "SJR", "CiteSc", "ABDC", "FT50", "NamesFull"]

### option 1 create a dict of dict

df = pd.DataFrame(test, columns=columns)
df.to_csv("Names.csv", index=False)
dff = pd.read_csv("Names.csv", na_values="NA")
dff.to_csv("Names2.csv", index=False)

# set the index of the dataframe to the NamesShort column
dff.set_index("NamesShort", inplace=True)
dff.fillna("", inplace=True)
# create a dictionary using the index as the key
dd = dff.to_dict(orient="index") # allow O(1) lookup
# dump the file to json
import json
import re
# Dump the dictionary to a JSON file
def saveFile(dictionary, fileName):
    jsonStr = json.dumps(dictionary, ensure_ascii=False);
    removeQuotes = re.sub("\"([^\"]+)\":", r"\1:", jsonStr);
    fileNameCleaned = fileName.split(" ")[0]
        
    with open(fileNameCleaned + ".ts", "w",encoding='utf_8') as outfile:
        outfile.write("export const " + fileNameCleaned + " = " + removeQuotes + ";")

saveFile(dd, "Names_test")        
# with open("Names.json", "w", encoding="UTF-8") as f:
#     json.dump(dd, f, ensure_ascii=False)

### option 2 create a dict of list
dd = dff.transpose().to_dict(orient="list") # allow O(1) lookup
saveFile(dd, "Names_test2") # saves 5MB of space but still needs to be simpliefied somehow