import datetime

def generate_unique_filename(filename):
    current_time = datetime.datetime.now().strftime("%Y%m%d%H%M%S")
    unique_filename = current_time + '_' + filename
    return unique_filename