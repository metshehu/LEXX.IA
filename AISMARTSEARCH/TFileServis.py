import os
from os import walk
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
STATIC_UPLOAD_DIR = os.path.join(BASE_DIR, "static/uploads")


class FileServices:

    def __init__(self, path, whatrever):
        self.path = path
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

        user_path = settings.STATIC_UPLOAD_DIR + f"/{user}"

        files = self.allFileformat(user_path, ".csv")

        for i in files:
            newpath = user_path + f"/{i}"
            if os.path.exists(newpath):
                os.remove(newpath)
                print(f"File '{newpath}' has been deleted.")
            else:
                print(f"File '{newpath}' does not exist.")

    def recrate_csvs(self, user_path, user, parser):
        pdf_files = self.allFileformat(user_path, ".pdf")
        word_files = self.allFileformat(user_path, ".docx")
        files = pdf_files + word_files
        for file_name in files:
            file_url = f"{settings.STATIC_UPLOAD_DIR}/{user}/{file_name}"
            fileChunks, fileEmbedings = parser.embedd(file_url)
            parser.SaveCsv(
                settings.STATIC_UPLOAD_DIR + "/" + user, file_name[:-4], fileEmbedings, fileChunks
            )

    def reembedfiles(self, user):
        user_path = settings.STATIC_UPLOAD_DIR + f"/{user}"
        user_value = UserValues.objects.filter(user=user).first()
        parser = Parsers(settings.OPENAI_KEY)
        spliter = user_value.splitter
        chunksize = user_value.chunksize
        overlap = user_value.overlap
        parser.SetSpliter(spliter=spliter, chuncksize=chunksize, overlap=overlap)

        remove_csv(user)
        recrate_csvs(user_path, user, parser)

    def addfiledata(self, dic, file_name, chunks, vectors, sim_score):
 
