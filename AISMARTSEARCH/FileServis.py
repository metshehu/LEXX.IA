import os
from os import walk
from pathlib import Path

from Main import Parsers

BASE_DIR = Path(__file__).resolve().parent.parent
base_path = os.path.join(BASE_DIR, "static/uploads")

OPENAI_KEY = os.environ.get("OPENAI_API_KEY")  # Define media settings
"""


refacte this like setting make it a path you pass thro the paramteris 
and user info = user value make it type hard 
    """


class FileServices:

    def __init__(self, base_path, whatrever):
        self.base_path = base_path
        self.whatrever = whatrever

    def getalldirs(self, mypath):
        user = []
        for dirpath, dirnames, filenames in walk(mypath):
            user = dirnames
            break
        return user

    def allFileformat(self, mypath, format):
        files = []
        for dirpath, dirnames, filenames in walk(mypath):
            csv_files = [file for file in filenames if file.endswith(format)]
            files.extend(csv_files)
            break
        return files

    def remove_csv(self, user):
        user_path = self.base_path + f"/{user}"

        files = self.allFileformat(user_path, ".csv")

        for i in files:
            newpath = user_path + f"/{i}"
            if os.path.exists(newpath):
                os.remove(newpath)
                print(f"File '{newpath}' has been deleted.")
            else:
                print(f"File '{newpath}' does not exist.")

    def recrate_csvs(self, user_path, user, parser):
        """base path = static +uplaod dir"""
        pdf_files = self.allFileformat(user_path, ".pdf")
        word_files = self.allFileformat(user_path, ".docx")
        files = pdf_files + word_files
        for file_name in files:
            file_url = f"{self.base_path}/{user}/{file_name}"
            fileChunks, fileEmbedings = parser.embedd(file_url)
            parser.SaveCsv(self.base_path + "/" + user, file_name[:-4], fileEmbedings, fileChunks)

    def reembedfiles(
        self,
        user,
        Userinfo,
    ):
        user_path = self.base_path + f"/{user}"
        user_value = Userinfo.objects.filter(user=user).first()
        parser = Parsers(OPENAI_KEY)
        spliter = user_value.splitter
        chunksize = user_value.chunksize
        overlap = user_value.overlap
        parser.SetSpliter(spliter=spliter, chuncksize=chunksize, overlap=overlap)

        self.remove_csv(user)
        self.recrate_csvs(user_path, user, parser)

    def addfiledata(self, dic, file_name, chunks, vectors, sim_score):
        dic[file_name] = {"chunks": chunks, "vectors": vectors, "score": sim_score}
