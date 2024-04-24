### short function to read the ranks of the VHB journal list from one of the "Teilratings"
# see https://www.vhbonline.org/service/vhb-rating-2024
# the input file is supposed to be one of these pdf files e.g. https://www.vhbonline.org/fileadmin/user_upload/VHB_Rating_2024_Area_rating_MARK.pdf

from typing import List

import pandas as pd
import tabula


def read_vhb(path: str):
    """Returns a pandas DataFrames with the VHB ranks from the given PDF file."""
    dfs = tabula.read_pdf(
        path, pages="all", columns=[1], guess=True, multiple_tables=True
    )
    dfs = pd.concat(dfs)
    return dfs
