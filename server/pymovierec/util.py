#!/bin/python3

"""
Small utility for dealing with the verbosity of the module.

:author:    Davor Risteski
:version:   05.13.2019
"""

def decorated_print(*args):
    """
    Prepends '[pymovierec]' to a message prior to printing out to standard out.

    :str:   The message to print.
    """
    print("[pymovierec]:", *args)
