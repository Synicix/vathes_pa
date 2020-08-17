# vathes_pa

# Instruction for launching Web and api server
1) Clone git repo
2) Create datajoint_credentials.env with datajoint credentials and throw it in the root directory of the repo (that or ask Daniel for it)
3) run ```sudo docker-compose up```

Website shoud be accessable via localhost:3000 or <computer-name>:3000

CREATE, GET are implmented for all 3 tables, however only Experiment Setup has UPDATE and DELETE functionallity too. The backend API is implmented for all three though.
(This is cause it is quite tedious to do it for all 3 and unfortunately I have other commitments I need to fullfill.

The react website doesn't have that much extensive docs mainly cause of time constraints.
