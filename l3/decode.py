def get_data():

    self.cryptograms = []
    with open('data.txt', 'r') as file:
        lines = file.read()

    for line in lines.splitlines():

        letters = []
        for l in  str(line).strip().split(" "):
            letters.append(chr(int(ch, 2)))

        cryptograms.append(letters)