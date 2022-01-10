#Agnieszka Kurzajewska
# 244994
# 
cryptograms = []
letters_distribution = {
'a': 89, 'i': 82, 'o': 78, 'e': 77, 'z': 56, 'n': 55, 'r': 47, 'w': 47, 's': 43, 't': 40, 'c': 40, 'y': 38,
'k': 35, 'd': 33, 'p': 31, 'm': 28, 'u': 25, 'j': 23, 'l': 21, 'b': 15, 'g': 14, 'h': 11, 'f': 3, 'q': 1,
'v': 1, 'x': 1, ' ': 100, ',': 16, '.': 10, '-': 10, '"': 10, '!': 10, '?': 10, ':': 10, ';': 10, '(': 10,
')': 10
}


# zapisuje dane z pliku data.txt i zapisuje jako cahry w tablicy cryptograms
def get_data():

    with open('data.txt', 'r') as file:
        lines = file.read()

    for line in lines.splitlines():

        letters = []
        for l in  str(line).strip().split(" "):
            letters.append(chr(int(l, 2)))

        cryptograms.append(letters)
    
#znajduje najlepszy klucz
def get_key():
    longest_cryptogram = max(len(cryptogram) for cryptogram in cryptograms)
    return [get_best_key(get_sample_keys(i), i) for i in range(longest_cryptogram)]


#znajduje przykładowe klucze
def get_sample_keys(index):
    sample_keys = {}
    for cryptogram in cryptograms:
        for letter in letters_distribution.keys():
            possible_key = ord(get_letter(index, cryptogram)) ^ ord(letter)
            #print(crypt.get_chr(pos), "(", ord(crypt.get_chr(pos)), ")(",'{0:08b}'.format(ord(crypt.get_chr(pos))) ,") +", letter, "(", ord(letter), ")(",'{0:08b}'.format(ord(letter))  , ") = ", '{0:08b}'.format(int(possible_key)) )
            sample_keys[possible_key] = sample_keys.get(
                possible_key, 0) + letters_distribution[letter]

    return [k for k in sorted(sample_keys.keys(),
                                key=lambda k: sample_keys[k], reverse=True)]

#bierze z kryptogramu literkę o indeksie index 
def get_letter(index, cryptogram):
    if index < len(cryptogram):
        return cryptogram[index]
    else:
        return ' '

#sposrod kluczy wybiera najlepszy
def get_best_key(keys, pos):

    best_counter = 0
    for sample_key in keys:
        counter = 0
        for crypt in cryptograms:
            if (chr(ord(get_letter(pos, crypt)) ^ sample_key)) in letters_distribution.keys():
                counter += 1
        if counter > best_counter:
            best_counter = counter
            best_possible = sample_key

    return best_possible

def print_cryptogram(cryptogram, i):

    result = "\n\n\nKryptogram %d\n:"%(i+1)
    for i in range(0, len(cryptogram)):
        result += chr(ord(get_letter(i, cryptogram)) ^ key[i])
    print(result)


get_data()
key = get_key()

for i in range(len(cryptograms)):
    print_cryptogram(cryptograms[i], i)


