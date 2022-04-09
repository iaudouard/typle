from helpers import *

def update_test():
    new_test = generate_text(10)
    with open('test.txt', 'w') as f:
        f.write(new_test)
    

update_test()