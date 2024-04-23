import json
import re


def saveFile(dictionary, fileName):
    jsonStr = json.dumps(dictionary, ensure_ascii=False)
    # removeQuotes = re.sub('"([^"]+)":', r"\1:", jsonStr)
    fileNameCleaned = fileName.split(" ")[0]

    with open("ccf." + fileNameCleaned + ".js", "w", encoding="utf_8") as outfile:
        outfile.write("ccf." + fileNameCleaned + " = " + jsonStr + ";")
