import pandas as pd
import os

data = pd.read_csv("Tasks.csv", sep = ",")

taskList = [data.columns.tolist()] +data.values.tolist()

print(taskList)