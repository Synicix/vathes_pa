import datajoint as dj
from .BaseTable import BaseTable, schema
from .Mouse import Mouse
from .ExperimentSetups import ExperimentSetups

@schema
class MouseRetinaExperimentSessions(BaseTable, dj.Manual):
    """
    Table to contain MouseRetinaExperimentSessions and references Mouse and ExpiermentSetups
    """
    definition = """
    session_hash: char(128)
    ---
    session_date: date
    -> ExperimentSetups
    -> Mouse
    """
    
    """
    Utility function to handle computation of session_hash

    Parameters:
        tuple_to_insert (dict): dictionary containing the columns of MouseRetinaExperimentSessions except for session_hash

    Returns:
        None
    """
    @classmethod
    def insert_tuple(cls, tuple_to_insert):
        tuple_to_insert['session_hash'] = super().compute_md5_hash(tuple_to_insert)
        cls.insert1(tuple_to_insert)

    """
    Utility function to handle deletion of a single MouseRetinaExperimentSessions tuple

    Parameters:
        restriction_dict (dict): dict for restricting MouseRetinaExperimentSessions with

    Returns:
        None
    """
    @classmethod
    def delete_by_session_hash_dict(cls, restriction_dict):
        # Check if request.data has the session_hash if not raise an error
        if len(restriction_dict.keys()) != 1 or 'session_hash' not in restriction_dict.keys():
            raise Exception('Invalid restriction for deletion, must use only session_hash')

        # Proceed with delete
        tuple_to_delete = cls & restriction_dict

        # Check if there is a tuple that matches that restrction
        if len(tuple_to_delete) != 1:
            raise Exception('Nothing to delete')
        
        # All conditions passed, thus delete
        tuple_to_delete.delete_quick()
