from flask import Flask, request
from flask_cors import CORS
import json

from .datajoint_tables.Mouse import Mouse
from .datajoint_tables.ExperimentSetups import ExperimentSetups
from .datajoint_tables.MouseRetinaExperimentSessions import MouseRetinaExperimentSessions

app = Flask('dj_api')
cors = CORS(app)

@app.route('/')
def server_status_response():
    return 'Server is alive'

# Mouse endpoints
@app.route('/get-mouse')
def get_mouse():
    try:
        return dict(data=Mouse.fetch(as_dict=True))
    except Exception as e:
        return dict(error_message=str(e))

@app.route('/insert-into-mouse', methods=['POST'])
def insert_into_mouse():
    try:
        Mouse.insert_tuple(json.loads(request.data))
        return dict(message='Scan successfully inserted')
    except Exception as e:
        return dict(error_message=str(e))

@app.route('/update-tuple-from-mouse', methods=['POST'])
def update_tuple_from_mouse():
    try:
        tuple_dict = json.loads(request.data)

        # Delete entry first
        Mouse.delete_by_mouse_hash_dict(dict(mouse_hash=tuple_dict.pop('mouse_hash', None)))

        # Insert the updated tuple
        Mouse.insert_tuple(tuple_dict)
        return dict(message='Successfuly update tuple')
    except Exception as e:
        return dict(error_message=str(e))

@app.route('/delete-mouse', methods=['POST'])
def delete_from_mouse():
    try:
        Mouse.delete_by_mouse_hash_dict(json.loads(request.data))
        return dict(message='Successfuly delete tuple')
    except Exception as e:
        return dict(error_message=str(e))

# ExperimentSetups endpoints
@app.route('/get-experiment-setups')
def get_experimental_setups():
    try:
        return dict(data=ExperimentSetups.fetch(as_dict=True))
    except Exception as e:
        return dict(error_message=str(e))

@app.route('/get-experiment-setups-by-hash', methods=['POST'])
def get_experimental_setups_by_hash():
    try:
        print(request.data)
        result = ExperimentSetups & json.loads(request.data)
        if len(result) != 1:
            raise Exception('Query return 0 or more then 1 entry')
        return dict(data=result.fetch1())
    except Exception as e:
        return dict(error_message=str(e))

@app.route('/insert-into-experiment-setups', methods=['POST'])
def insert_into_experimental_setups():
    try:
        ExperimentSetups.insert_tuple(json.loads(request.data))
        return dict(message='Scan successfully inserted')
    except Exception as e:
        return dict(error_message=str(e))

@app.route('/update-tuple-from-experiment-setups', methods=['POST'])
def update_tuple_from_experimental_setups():
    try:
        # Datajoint doesn't have an update option thus we delete then insert
        tuple_dict = json.loads(request.data)

        # Delete entry first
        ExperimentSetups.delete_by_experiment_setup_hash_dict(dict(experiment_setup_hash=tuple_dict.pop('experiment_setup_hash', None)))

        # Insert the updated tuple
        ExperimentSetups.insert_tuple(tuple_dict)
        return dict(message='Successfuly update tuple')
    except Exception as e:
        return dict(error_message=str(e))

@app.route('/delete-from-experiment-setup', methods=['POST'])
def delete_from_experimental_setups():
    try:
        ExperimentSetups.delete_by_experiment_setup_hash_dict(json.loads(request.data))
        return dict(message='Successfuly delete tuple')
    except Exception as e:
        return dict(error_message=str(e))

# Sessions endpoints
@app.route('/get-mouse-retina-experiment-sessions')
def get_mouse_retina_experiment_sessions():
    try:
        return dict(data=(MouseRetinaExperimentSessions * Mouse * ExperimentSetups).fetch(as_dict=True))
    except Exception as e:
        return dict(error_message=str(e))
    
@app.route('/insert-into-mouse-retina-experiment-sessions', methods=['POST'])
def insert_into_mouse_retina_experiment_sessions():
    try:
        MouseRetinaExperimentSessions.insert_tuple(json.loads(request.data))
        return dict(message='Scan successfully inserted')
    except Exception as e:
        return dict(error_message=str(e))

@app.route('/update-tuple-from-mouse-retina-experiment-sessions', methods=['POST'])
def update_tuple_from_mouse_retina_experiment_sessions():
    try:
        # Datajoint doesn't have an update option thus we delete then insert
        tuple_dict = json.loads(request.data)

        # Delete entry first
        MouseRetinaExperimentSessions.delete_by_session_hash_dict(dict(session_hash=tuple_dict.pop('session_hash', None)))

        # Insert the updated tuple
        MouseRetinaExperimentSessions.insert_tuple(tuple_dict)
        return dict(message='Successfuly update tuple')
    except Exception as e:
        return dict(error_message=str(e))

@app.route('/delete-from-mouse-retina-experiment-sessions', methods=['POST'])
def delete_from_mouse_retina_experiment_sessions():
    try:
        MouseRetinaExperimentSessions.delete_by_session_hash_dict(json.loads(request.data))
        return dict(message='Successfuly delete tuple')
    except Exception as e:
        return dict(error_message=str(e))