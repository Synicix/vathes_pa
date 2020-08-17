import json
from dj_api.datajoint_tables.ExperimentSetups import ExperimentSetups
from dj_api.datajoint_tables.Mouse import Mouse
from dj_api.datajoint_tables.MouseRetinaExperimentSessions import MouseRetinaExperimentSessions

# Load the data in
data_file = open('data.json')
data = json.loads(data_file.read())

# Iterate though the data and insert in to database
for entry in data:
    # Deal with ExperimentSetups first
    ExperimentSetups.insert_tuple(dict(experiement_setup_id))