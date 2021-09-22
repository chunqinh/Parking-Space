import pymongo

myclient = pymongo.MongoClient('mongodb+srv://prasoonn:CSE442@trial.tfypl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')

mydb = myclient['trial']

mycol = mydb["customers"]

mydict = { "name": "Sam", "address": "Buffalo,NY" }

y = mycol.insert_one(mydict)

myquery = { "address": "Buffalo,NY" }

mydoc = mycol.find(myquery)

for x in mydoc:
  print(x)




