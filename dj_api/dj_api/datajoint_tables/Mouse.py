import datajoint as dj
from .BaseTable import BaseTable, schema

@schema
class Mouse(BaseTable, dj.Manual):
    definition = """
    mouse_hash: char(128)
    ---
    subject_name: varchar(63)
    subject_dob: date
    subject_sex: char(1)
    """
    
    @classmethod
    def insert_tuple(cls, tuple_to_insert):
        tuple_to_insert['mouse_hash'] = super().compute_md5_hash(tuple_to_insert)
        cls.insert1(tuple_to_insert)

    @classmethod
    def delete_by_mouse_hash_dict(cls, restriction_dict):
        # Check if request.data has the session_hash if not raise an error
        if len(restriction_dict.keys()) != 1 or 'mouse_hash' not in restriction_dict.keys():
            raise Exception('Invalid restriction for deletion, must use only mouse_hash')

        super().delete_by_restriction_dict(restriction_dict)