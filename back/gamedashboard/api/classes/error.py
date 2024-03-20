

class Error:


    def __init__(self) -> None:
        pass

    @staticmethod
    def throw(status, description):

        return {
            'success': False, 
            'errors': {
                'description': description,
            'status': status
            } 
        }
