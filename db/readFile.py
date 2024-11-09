import pandas as pd
import os
from csv import writer # Import writer class from csv module

#read csv file and create a list of lists, where the first index is the attributes
def read(file_name):

    data = pd.read_csv(file_name, sep = ",")

    taskList = [data.columns.tolist()] + data.values.tolist()

    print(taskList)

'''
# edits value in csv file
def edit_value(new_value, old_value, column_title, file_name):
    # reading the csv file 
    df = pd.read_csv(file_name) 
    
    # updating the column value/data 
    df['column_title'] = df['column_title'].replace({old_value: new_value}) 
    
    # writing into the file 
    df.to_csv("AllDetails.csv", index=False) 
'''

# adds a task as the new row to the csv file
def add_task(task_Name, difficulty_level, urgency_level, status, start_date, due_date, points_awarded, file_name):
    
    # List that we want to add as a new row
    List = [task_Name, difficulty_level, urgency_level, status, start_date, due_date, points_awarded]
    
    # Open our existing CSV file in append mode
    # Create a file object for this file
    with open(file_name, 'a') as f_object:
        
        # Pass this file object to csv.writer()
        # and get a writer object
        writer_object = writer(f_object)
    
        # Pass the list as an argument into
        # the writerow()
        writer_object.writerow(List)
    
        # Close the file object
        f_object.close()