import pandas as pd
import os

#read csv file and create a list of lists, where the first index is the attributes
def read(file_name):

    data = pd.read_csv(file_name, sep = ",")

    taskList = [data.columns.tolist()] + data.values.tolist()

    print(taskList)