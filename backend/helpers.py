import requests


def fetch():
    url = "https://wordsapiv1.p.rapidapi.com/words/"

    querystring = {"random": "true",
                   "limit": "1"}

    headers = {
        'x-rapidapi-host': "wordsapiv1.p.rapidapi.com",
        'x-rapidapi-key': "f26c1160fcmsh20cda4a1422347bp1bd9abjsne7f900f5b855"
    }

    response = requests.request(
        "GET", url, headers=headers, params=querystring)

    word = response.json()

    return word

def fetch_word(freq):

    current_word = ''
    current_freq = 0

    while current_freq < freq:
        word = fetch()
        try:
            current_word = word['word']
            current_freq = word['frequency']
        except KeyError:
            pass

    return current_word

def generate_text(length):
    """
    Function to fetch words from the random words api to create a text for the test of the day.
    Takes in number of words to return inside a single string
    """
    text = ''

    for _ in range(length):
        new_word = fetch_word(3.3)
        print(new_word)
        text += new_word

        if _ != length - 1:
            text += ' '
    
    return text


def open_test():
    with open('test.txt', 'r') as f:
        return f.read()
