from setuptools import setup, find_packages
from os import path

here = path.abspath(path.dirname(__file__))

setup(
    name='dj_api',
    version='0.0.0',
    description='vathes_pa',
    author='Daniel Sitonic',
    author_email='synicix@gmail.com',
    url='https://github.com/synicix/',
    packages=find_packages(),
    install_requires=['flask', 'flask-cors', 'datajoint'],
)
