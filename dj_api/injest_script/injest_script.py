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
    try:
        ExperimentSetups.insert_tuple(dict(experiment_setup_id=int(entry['experiment_setup']), description='inserted by inject_script.py'))
    except Exception as e:
        print(e)

    # Deal with Mouse
    try:
        Mouse.insert_tuple(dict(subject_name=entry['subject_name'], subject_dob=entry['subject_dob'], subject_sex=entry['subject_sex']))
    except Exception as e:
        print(e)

    # Deal with Mouse Retina Experiemnt Sessions
    try:
        experiment_setup_hash = (ExperimentSetups & dict(experiment_setup_id=int(entry['experiment_setup']), description='inserted by inject_script.py')).fetch1('experiment_setup_hash')
        mouse_hash = (Mouse & dict(subject_name=entry['subject_name'], subject_dob=entry['subject_dob'], subject_sex=entry['subject_sex'])).fetch1('mouse_hash')

        MouseRetinaExperimentSessions.insert_tuple(dict(session_date=entry['session_date'], experiment_setup_hash=experiment_setup_hash, mouse_hash=mouse_hash))
    except Exception as e:
        print(e)