import pytest
from src.config.firestoreUtils import initialiseFirestore
from src.auth.register import authRegister


@pytest.fixture
def testRegister():
    #Creates a taskMaster
    user = authRegister(
        'first',
        'last',
        'password',
        'email'
    )
    return user




