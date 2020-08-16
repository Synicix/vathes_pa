import datajoint as dj
import hashlib

schema = dj.schema('synicix22_vathes_pa')

class BaseTable:
    """
    Parent table for all datajoint classes which contains some useful function typcially used in tables and the schema pointer

    All datajoint tables part of the main framework will inherite from this table.
    """

    @staticmethod
    def compute_md5_hash(tuple_dict):
        """
        Utility helper function to compute the md5 hash given the tuple_dict

        Parameters:
            tuple_dict (dict): dictionary to hash

        Returns:
            str: 128 byte md5 hash string
        """
        string_to_hash = ""
        for _, data in tuple_dict.items():
            string_to_hash += (str(data))
        return hashlib.md5(string_to_hash.encode()).hexdigest()

    @classmethod
    def delete_by_restriction_dict(cls, restriction_dict):
        tuple_to_delete = cls & restriction_dict

        # Check if there is a tuple that matches that restrction
        if len(tuple_to_delete) != 1:
            raise Exception('Nothing to delete')
        
        # All conditions passed, thus delete
        tuple_to_delete.delete_quick()