import datajoint as dj
from .BaseTable import BaseTable, schema

@schema
class ExperimentSetups(BaseTable, dj.Manual):
    """
    Table to contain Experiment Setups and its info
    """

    definition = """
    experiment_setup_hash: char(128)
    ---
    experiment_setup_id: smallint unsigned
    description: varchar(255)
    """
    
    """
    Utility function to handle computation of mouse_hash

    Parameters:
        tuple_to_insert (dict): dictionary containing the columns of ExperimentSetups except for experiment_setup_hash

    Returns:
        None
    """
    @classmethod
    def insert_tuple(cls, tuple_to_insert):
        tuple_to_insert['experiment_setup_hash'] = super().compute_md5_hash(tuple_to_insert)
        cls.insert1(tuple_to_insert)

    """
    Utility function to handle deletion of a single ExperimentSetups tuple

    Parameters:
        restriction_dict (dict): dict for restricting ExperimentSetups with

    Returns:
        None
    """
    @classmethod
    def delete_by_experiment_setup_hash_dict(cls, restriction_dict):
        # Check if request.data has the session_hash if not raise an error
        if len(restriction_dict.keys()) != 1 or 'experiment_setup_hash' not in restriction_dict.keys():
            raise Exception('Invalid restriction for deletion, must use only mouse_hash')

        super().delete_by_restriction_dict(restriction_dict)