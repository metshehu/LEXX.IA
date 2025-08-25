from django.contrib.auth.models import User
from django.db import models


# Create your models here.
class History(models.Model):
    # The user who sent the question (sender)
    sender = models.CharField(max_length=255)

    # The question that was asked
    question = models.TextField()

    # The answer given to the question
    respons = models.TextField()


class Chunk(models.Model):
    # Link each chunk to its corresponding History record
    history = models.ForeignKey(History, on_delete=models.CASCADE, related_name="chunks")

    # The text content of the chunk
    chunk_text = models.TextField()

    def __str__(self):
        return f"Chunk {self.chunk_order} for History ID {self.history.id}"


class UserValues(models.Model):
    user = models.CharField(max_length=255)
    SPLITTER_CHOICES = [
        ("CharacterTextSplitter", "CharacterTextSplitter"),
        ("RecursiveCharacterTextSplitter", "RecursiveCharacterTextSplitter"),
        ("TokenTextSplitter", "TokenTextSplitter"),
        ("MarkdownHeaderTextSplitter", "MarkdownHeaderTextSplitter"),
    ]

    splitter = models.CharField(
        max_length=50,
        choices=SPLITTER_CHOICES,
        default="CharacterTextSplitter",
        help_text="Select the splitter",
    )
    chunksize = models.IntegerField(help_text="Enter the chunk size")
    overlap = models.IntegerField(help_text="Enter the overlap value")
    temp = models.FloatField(help_text="Set the temperature (0.0 to 1.0)")

    def __str__(self):
        return f"Splitter: {self.splitter}, Chunksize: {self.chunksize}, Overlap: {self.overlap}, Temp: {self.temp}"


# contracts/models.py


class ContractState(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    user_info = models.BooleanField(default=False)
    fields = models.TextField(blank=True, null=True)
    file = models.TextField(blank=True, null=True)
    updated_at = models.DateTimeField(auto_now=True)
